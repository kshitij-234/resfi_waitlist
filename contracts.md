# ResFi.ai Landing Page - Frontend/Backend Integration Contracts

## Overview
This document defines the API contracts and integration plan between the frontend React application and FastAPI backend using Supabase as the database.

## Database Schema

### Table: `waitlist`
```sql
- id: bigint (primary key, auto-generated)
- email: text (not null, unique)
- first_name: text (not null)
- last_name: text (not null)
- debt: boolean (default false)
- credit: boolean (default false)
- savings: boolean (default false)
- automate: boolean (default false)
- created_at: timestamp with time zone (default now())
- updated_at: timestamp with time zone (default now())
```

## API Endpoints

### POST /api/waitlist
**Purpose**: Submit a new waitlist entry

**Request Body**:
```json
{
  "email": "user@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "debt": true,
  "credit": false,
  "savings": true,
  "automate": false
}
```

**Success Response (201 Created)**:
```json
{
  "success": true,
  "message": "Thank you for joining our waitlist!",
  "data": {
    "id": 1,
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "debt": true,
    "credit": false,
    "savings": true,
    "automate": false,
    "created_at": "2025-12-03T19:00:00Z",
    "updated_at": "2025-12-03T19:00:00Z"
  }
}
```

**Error Response (409 Conflict - Duplicate Email)**:
```json
{
  "success": false,
  "detail": "This email address is already on the waitlist"
}
```

**Error Response (422 Validation Error)**:
```json
{
  "success": false,
  "detail": "Validation error message"
}
```

### GET /api/waitlist
**Purpose**: Retrieve all waitlist entries (admin endpoint)

**Success Response (200 OK)**:
```json
[
  {
    "id": 1,
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "debt": true,
    "credit": false,
    "savings": true,
    "automate": false,
    "created_at": "2025-12-03T19:00:00Z",
    "updated_at": "2025-12-03T19:00:00Z"
  }
]
```

## Frontend Changes Required

### File: `/app/frontend/src/components/WaitlistForm.jsx`

**Current**: Uses `mockWaitlistData.submitToWaitlist()` from mock.js

**Changes Needed**:
1. Import axios for API calls
2. Replace mock API call with actual backend endpoint
3. Update the submit handler to call `POST /api/waitlist`
4. Handle backend error responses properly

**Code to Replace**:
```javascript
// Current mock call:
const response = await mockWaitlistData.submitToWaitlist({
  email: formData.email.toLowerCase(),
  first_name: formData.first_name,
  last_name: formData.last_name,
  ...formData.goals
});

// Replace with:
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const response = await axios.post(`${BACKEND_URL}/api/waitlist`, {
  email: formData.email.toLowerCase(),
  first_name: formData.first_name,
  last_name: formData.last_name,
  debt: formData.goals.debt,
  credit: formData.goals.credit,
  savings: formData.goals.savings,
  automate: formData.goals.automate
});
```

## Backend Implementation Plan

### 1. Install Supabase Python Client
```bash
pip install supabase==2.0.0
```

### 2. Add Environment Variables to `/app/backend/.env`
```
SUPABASE_URL=https://spdokfzvqifffnmalovc.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwZG9rZnp2cWlmZmZubWFsb3ZjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDc4Nzg5MiwiZXhwIjoyMDgwMzYzODkyfQ.vfrY7jShp-rjJ4Px-iz5MTlE_b0Vkz6U_bJgNUSJclk
```

### 3. Create Supabase Table
Execute SQL in Supabase dashboard to create the `waitlist` table with proper schema

### 4. Update `/app/backend/server.py`
- Initialize Supabase client
- Create Pydantic models for request/response
- Implement POST /api/waitlist endpoint
- Implement GET /api/waitlist endpoint
- Add proper error handling

### 5. Update requirements.txt
Add supabase package to requirements.txt

## Testing Checklist
- [ ] Supabase table created successfully
- [ ] Backend can connect to Supabase
- [ ] POST endpoint creates new waitlist entries
- [ ] Duplicate email detection works (409 error)
- [ ] GET endpoint retrieves all entries
- [ ] Frontend form submits to backend successfully
- [ ] Success toast shows after submission
- [ ] Error toasts show for validation errors
- [ ] Form resets after successful submission

## Notes
- All checkbox fields (debt, credit, savings, automate) should default to false if not provided
- Email should be stored in lowercase for consistency
- The mock.js file can remain for reference but won't be used after backend integration
