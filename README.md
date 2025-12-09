# ResFi - AI-Native Automated Banking Landing Page

A futuristic landing page with liquid glass morphism design for ResFi's waitlist signup.

## Features

- 🎨 Futuristic liquid glass design with dark theme
- 📱 Fully responsive (desktop, tablet, mobile)
- 🎯 Mobile-optimized collapsible cards
- 💾 Supabase backend integration
- ✨ Smooth animations and transitions
- 🔒 Secure environment variable management

## Tech Stack

- **Frontend**: React 19 with Tailwind CSS
- **Backend**: FastAPI (Python)
- **Database**: Supabase (PostgreSQL)
- **UI Components**: Shadcn/ui with Radix UI
- **Icons**: Lucide React

## Setup Instructions

### Prerequisites

- Node.js 18+ and Yarn
- Python 3.11+
- Supabase account (free tier works)

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Create virtual environment:
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create `.env` file from example:
   ```bash
   cp .env.example .env
   ```

5. Update `.env` with your Supabase credentials:
   - Go to https://supabase.com/dashboard
   - Create a new project or use existing one
   - Go to Project Settings → API
   - Copy your `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`

6. Create Supabase table:
   - Go to SQL Editor in Supabase dashboard
   - Run the SQL from `/supabase_setup.sql`

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Create `.env` file from example:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your backend URL (default is `http://localhost:8001`)

### Running the Application

1. Start the backend (from `/backend` directory):
   ```bash
   uvicorn server:app --reload --host 0.0.0.0 --port 8001
   ```

2. Start the frontend (from `/frontend` directory):
   ```bash
   yarn start
   ```

3. Open browser to `http://localhost:3000`

## Database Schema

The waitlist table structure:

```sql
- id: bigserial (auto-generated)
- email: text (unique, required)
- first_name: text (required)
- first_name: text (required)
- refinance: boolean (default false)
- new_loan: boolean (default false)
- hysa: boolean (default false)
- automation: boolean (default false)
- created_at: timestamptz (auto-generated)
- updated_at: timestamptz (auto-updated)
```

## Environment Variables

### Backend (`/backend/.env`)

- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY`: Service role key from Supabase
- `MONGO_URL`: MongoDB connection (optional, for status checks only)
- `DB_NAME`: MongoDB database name (optional)
- `CORS_ORIGINS`: CORS allowed origins (use `*` for development)

### Frontend (`/frontend/.env`)

- `REACT_APP_BACKEND_URL`: Backend API URL

## Security Notes

⚠️ **IMPORTANT**: Never commit `.env` files to version control!

- `.env` files are already in `.gitignore`
- Use `.env.example` files as templates
- Keep your Supabase service role key private
- For production, use your hosting platform's environment variable management

## API Endpoints

### POST `/api/waitlist`
Submit a new waitlist entry

**Request Body:**
```json
{
  "email": "user@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "refinance": true,
  "new_loan": false,
  "hysa": true,
  "automation": false
}
```

### GET `/api/waitlist?limit=50&offset=0`
Retrieve waitlist entries (admin endpoint)

## Design System

The landing page uses a futuristic liquid glass morphism design:

- **Dark theme**: Navy/black background (#0A0E1A)
- **Glass cards**: Translucent with backdrop blur
- **Blue accents**: #60A5FA (primary), #3B82F6 (strong)
- **Animations**: Smooth cubic-bezier transitions
- **Responsive**: Mobile-first with collapsible cards

## Deployment

The application is production-ready. Ensure:

1. ✅ All environment variables are configured
2. ✅ Supabase table is created
3. ✅ CORS is configured for your production domain
4. ✅ `.env` files are not committed to git

## License

Proprietary - ResFi © 2025

## Contact

asheet@resfi.ai
