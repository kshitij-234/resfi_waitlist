from fastapi import FastAPI, APIRouter, HTTPException, status
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr, field_validator
from typing import List, Optional
import uuid
from datetime import datetime, timezone
from supabase import create_client, Client


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection (kept for compatibility)
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Supabase connection
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Create the main app without a prefix
app = FastAPI(
    title="ResFi.ai API",
    description="API for ResFi.ai waitlist management",
    version="1.0.0"
)

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Waitlist Models
class WaitlistFormRequest(BaseModel):
    """Request model for waitlist form submissions."""
    email: EmailStr
    first_name: str = Field(..., min_length=1, max_length=100)
    last_name: str = Field(..., min_length=1, max_length=100)
    refinance: bool = Field(default=False)
    new_loan: bool = Field(default=False)
    hysa: bool = Field(default=False)
    automation: bool = Field(default=False)

    @field_validator('email')
    @classmethod
    def email_to_lowercase(cls, v: str) -> str:
        return v.lower()

class WaitlistEntryResponse(BaseModel):
    """Response model for waitlist entries."""
    id: int
    email: str
    first_name: str
    last_name: str
    refinance: bool
    new_loan: bool
    hysa: bool
    automation: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class WaitlistSubmissionResponse(BaseModel):
    """Response model for form submission success."""
    success: bool = True
    message: str = "Thank you for joining our waitlist!"
    data: WaitlistEntryResponse

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# Waitlist Endpoints
@api_router.post(
    "/waitlist",
    response_model=WaitlistSubmissionResponse,
    status_code=status.HTTP_201_CREATED,
    tags=["Waitlist"]
)
async def submit_waitlist_form(
    form_data: WaitlistFormRequest
) -> WaitlistSubmissionResponse:
    """
    Submit a new entry to the waitlist.
    
    This endpoint accepts user information including email, name, and 
    goal selections, then stores the data in Supabase.
    """
    try:
        # Prepare data for insertion
        insert_data = {
            "email": form_data.email,
            "first_name": form_data.first_name,
            "last_name": form_data.last_name,
            "debt": form_data.debt,
            "loan": form_data.loan,
            "savings": form_data.savings,
            "automate": form_data.automate,
        }

        # Insert into Supabase
        response = supabase.table("waitlist").insert(insert_data).execute()

        # Extract the inserted record from response
        if response.data:
            inserted_record = response.data[0]
            entry_response = WaitlistEntryResponse(**inserted_record)
            
            logger.info(f"Successfully added {form_data.email} to waitlist")
            
            return WaitlistSubmissionResponse(
                success=True,
                message="Thank you for joining our waitlist!",
                data=entry_response
            )
        else:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to create waitlist entry"
            )

    except Exception as e:
        logger.error(f"Error submitting waitlist form: {str(e)}")
        
        # Check for unique constraint violation (duplicate email)
        if "duplicate" in str(e).lower() or "unique" in str(e).lower():
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="This email address is already on the waitlist"
            )
        
        # Generic error handling for other database errors
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred while processing your request. Please try again later."
        )

@api_router.get(
    "/waitlist",
    response_model=List[WaitlistEntryResponse],
    tags=["Waitlist"]
)
async def get_all_waitlist_entries() -> List[WaitlistEntryResponse]:
    """
    Retrieve all waitlist entries (admin endpoint).
    
    Note: In production, this should require authentication.
    """
    try:
        response = supabase.table("waitlist").select("*").execute()
        
        if response.data:
            entries = [WaitlistEntryResponse(**record) for record in response.data]
            return entries
        else:
            return []

    except Exception as e:
        logger.error(f"Error retrieving waitlist data: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve waitlist data"
        )

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()