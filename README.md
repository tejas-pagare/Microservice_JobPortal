# Job Portal

A full-stack job portal application built with microservices architecture, featuring job listings, company management, user profiles, subscription payments, AI-powered career guidance, and resume analysis.

## 🚀 Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **Radix UI** - Accessible UI components
- **Axios** - HTTP client
- **React Hot Toast** - Notifications

### Backend Services
- **Node.js** with **Express 5** - API framework
- **TypeScript** - Type safety
- **PostgreSQL** (Neon Serverless) - Database
- **Redis** - Caching
- **Kafka** - Message queue for microservices communication
- **JWT** - Authentication
- **Cloudinary** - Image/file storage
- **Razorpay** - Payment gateway
- **Google Gemini AI** - AI-powered features
- **Nodemailer** - Email services

## 📁 Project Structure

```
job-portal/
├── frontend/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/             # App router pages
│   │   ├── components/      # Reusable UI components
│   │   ├── context/         # React context providers
│   │   └── lib/             # Utility functions
│   └── public/              # Static assets
│
└── services/                 # Backend microservices
    ├── auth/                # Authentication service
    ├── job/                 # Job & company management service
    ├── payment/             # Subscription payment service
    ├── user/                # User profile service
    └── utils/               # Shared utilities (Cloudinary, AI, Email)
```

## 🔧 Microservices

### Auth Service
Handles user authentication and authorization.

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/register` | POST | Register new user (with profile picture upload) |
| `/api/auth/login` | POST | User login |
| `/api/auth/forgot` | POST | Forgot password |
| `/api/auth/reset/:token` | POST | Reset password |

### Job Service
Manages jobs and companies.

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/job/company/new` | POST | Create new company |
| `/api/job/company/:companyId` | DELETE | Delete company |
| `/api/job/company/all` | GET | Get all companies (authenticated) |
| `/api/job/company/:id` | GET | Get company details |
| `/api/job/new` | POST | Create new job |
| `/api/job/:jobId` | PUT | Update job |
| `/api/job/all` | GET | Get all active jobs |
| `/api/job/:jobId` | GET | Get single job |
| `/api/job/application/:jobId` | GET | Get all applications for a job |
| `/api/job/application/update/:id` | PUT | Update application status |

### User Service
Manages user profiles and job applications.

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/user/me` | GET | Get current user profile |
| `/api/user/:userId` | GET | Get user profile by ID |
| `/api/user/update/profile` | PUT | Update user profile |
| `/api/user/update/pic` | PUT | Update profile picture |
| `/api/user/update/resume` | PUT | Update resume |
| `/api/user/skill/add` | POST | Add skill to user |
| `/api/user/skill/delete` | PUT | Remove skill from user |
| `/api/user/apply/job` | POST | Apply for a job |
| `/api/user/application/all` | GET | Get all user applications |

### Payment Service
Handles subscription payments via Razorpay.

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/payment/checkout` | POST | Initiate payment checkout |
| `/api/payment/verify` | POST | Verify payment signature |

### Utils Service
Provides shared utilities for other services.

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/upload` | POST | Upload files to Cloudinary |
| `/api/career` | POST | AI-powered career guidance |
| `/api/resume` | POST | AI-powered resume analysis |

## 🛠️ Installation

### Prerequisites
- Node.js 18+
- npm or yarn
- PostgreSQL database (or Neon account)
- Redis instance
- Kafka cluster
- Cloudinary account
- Razorpay account
- Google AI API key

### Environment Variables

Create `.env` files in each service directory:

**Auth Service:**
```env
PORT=5001
DATABASE_URL=your_postgres_connection_string
JWT_SECRET=your_jwt_secret
REDIS_URL=your_redis_url
```

**Job Service:**
```env
PORT=5002
DATABASE_URL=your_postgres_connection_string
JWT_SECRET=your_jwt_secret
```

**User Service:**
```env
PORT=5003
DATABASE_URL=your_postgres_connection_string
JWT_SECRET=your_jwt_secret
```

**Payment Service:**
```env
PORT=5004
DATABASE_URL=your_postgres_connection_string
JWT_SECRET=your_jwt_secret
Razorpay_Key=your_razorpay_key
Razorpay_Secret=your_razorpay_secret
```

**Utils Service:**
```env
PORT=5005
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
API_KEY_GEMINI=your_google_ai_api_key
```

**Frontend:**
```env
NEXT_PUBLIC_API_URL=your_backend_url
NEXT_PUBLIC_RAZORPAY_KEY=your_razorpay_key
```

### Running the Services

1. **Install dependencies for each service:**

```bash
# Frontend
cd frontend && npm install

# Auth Service
cd services/auth && npm install

# Job Service
cd services/job && npm install

# User Service
cd services/user && npm install

# Payment Service
cd services/payment && npm install

# Utils Service
cd services/utils && npm install
```

2. **Build and run each service:**

```bash
# Development mode
npm run dev

# Production mode
npm run build
npm start
```

3. **Run the frontend:**

```bash
cd frontend
npm run dev
```

## 🐳 Docker

Each service includes a Dockerfile for containerization.

```bash
# Build a service
docker build -t job-portal-auth ./services/auth

# Run a service
docker run -p 5001:5001 job-portal-auth
```

## ✨ Features

- **User Authentication** - Register, login, password reset with email
- **Job Listings** - Browse and search active job postings
- **Company Profiles** - Create and manage company pages
- **Job Applications** - Apply to jobs and track application status
- **User Profiles** - Manage profile, skills, resume, and profile picture
- **Subscription System** - Premium features with Razorpay payment
- **AI Career Guide** - Get personalized career path suggestions based on skills
- **AI Resume Analyzer** - Analyze and improve your resume with AI
- **Dark/Light Mode** - Theme toggle support
- **Responsive Design** - Mobile-friendly UI

## 📄 License

ISC

## 👤 Author

Tejas Pagare
