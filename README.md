# 📋 Attendance Management System

A daily attendance tracking system that records employee check-ins and check-outs for the present day.

### Deploys
- FE - https://attendence-tracking-fe.vercel.app/
- BE - https://attendence-tracking-be.vercel.app/



## 🐳 Installation - Docker Setup

### Run with Docker Compose (Recommended)
```bash
# Clone the repository
git clone <repository-url>
cd <repository-name>

# Run the entire application
docker-compose up --build
```

```
bash# Frontend only
cd FE
docker build -t attendance-frontend .
docker run -p 3000:3000 attendance-frontend

# Backend only  
cd BE
docker build -t attendance-backend .
docker run -p 5000:5000 attendance-backend
```

### 📦 Installation Locally
Prerequisites

Node.js version 22
Yarn package manager

```
git clone https://github.com/Shaivaan/Attendence-Tracking-MonoRep.git

# Frontend Setup (React)
- cd /FE
- yarn
- yarn run dev


# Environment Variables:
- Create a .env file in the FE directory:
- env : VITE_API_BASEURL=https://attendence-tracking-be.vercel.app/
```


# Backend Setup (Node.js)
```
- cd /BE
- yarn
- yarn run dev

#Environment Variables:
- Create a .env file in the BE directory:
- env: MONGODB_UR=your_mongodb_connection_string
- NODE_ENV=development
- PORT=3000

```

## 🎯 Features

### Dashboard Overview
The main dashboard displays three key metrics:
- **Total Check-ins** - Count of employees who checked in today
- **Total Check-outs** - Count of employees who checked out today  
- **Total Attendees** - Number of employees currently present

### History Records
Complete attendance history showing:
- All employees who have checked in and out
- Timestamp for each entry
- Photo verification for each record

### Check In/Out Form
Employee attendance form requiring:
- **Name** (mandatory field)
- **Email** (mandatory field)
- **Photo** (mandatory - webcam only)

*Note: Camera must be turned on for photo capture*

## 🧪 Testing Guidelines

### Validation Tests
Test the following scenarios to ensure proper form validation:

**Required Field Testing:**
- Submit form without entering name
- Submit form without entering email  
- Submit form without capturing photo

**Camera Access Testing:**
- Camera access is always required for photo capture
- Form cannot be submitted without webcam photo

**Email Validation Testing:**
- Enter invalid email formats
- Verify form prevents submission with invalid emails

**Expected Result:** Form should be unable to submit in all above test cases.

## 🙏 Credits
**Libraries & Tools:**
- **Error Boundary** - Error handling
- **ShadCN** - UI Components (Button, Sonner, Textfield)
- **Lucide** - Icon library
- **CSS Scan** - Styling tools
- **Tailwind** - CSS framework
- **Zustand** - State management
- **Moment** - Date and time utilities
- **React-webcam** - Camera integration
- **Axios** - HTTP requests
- **Formik** - Form management
- **Yup** - Schema validation

**Development Assistance (Prompts):**
- React library for webcam integration
- Webcam code face detection implementation
- File upload using Multer
- Mongoose database queries
- Code refactoring and custom hooks
- Vercel deployment for backend and frontend with vercel.json
- And more development guidance

