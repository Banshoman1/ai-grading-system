# Installation Guide - AI-Assisted Grading System

## Prerequisites
- Node.js v16 or higher
- MySQL 5.7 or higher
- npm or yarn
- Git

## Step 1: Clone the Repository

```bash
git clone https://github.com/Banshoman1/ai-grading-system.git
cd ai-grading-system
```

## Step 2: Backend Setup

### 2.1 Navigate to Backend Directory
```bash
cd backend
```

### 2.2 Install Dependencies
```bash
npm install
```

### 2.3 Environment Configuration
```bash
cp .env.example .env
```

Edit `.env` with your MySQL credentials:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=ai_grading_system
JWT_SECRET=your_secret_key_here
PORT=5000
```

### 2.4 Start Backend Server
```bash
npm run dev
```

Server will run on `http://localhost:5000`

## Step 3: Database Setup

### 3.1 Create Database
```bash
mysql -u root -p < ../database/schema.sql
```

### 3.2 Seed Sample Data
```bash
mysql -u root -p ai_grading_system < ../database/seed.sql
```

## Step 4: Frontend Setup

### 4.1 Navigate to Frontend Directory
```bash
cd ../frontend
```

### 4.2 Install Dependencies
```bash
npm install
```

### 4.3 Start Development Server
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## Step 5: Access the Application

1. Open your browser and go to `http://localhost:5173`
2. Click "Get Started" or "Login"
3. Use demo credentials:
   - **Email:** lecturer@lcu.edu.ng
   - **Password:** demo123

## Development

### Frontend Development
```bash
cd frontend
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Backend Development
```bash
cd backend
npm run dev      # Start development server with auto-reload
npm run build    # Build TypeScript
npm start        # Start production server
```

## Troubleshooting

### Port Already in Use
```bash
# Change port in backend/src/server.ts or .env
# Change port in frontend/vite.config.ts
```

### Database Connection Error
- Verify MySQL is running
- Check credentials in .env
- Ensure database exists: `mysql -u root -p -e "SHOW DATABASES;"`

### Module Not Found
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Production Deployment

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy 'dist' folder
```

### Backend (Heroku/DigitalOcean)
```bash
cd backend
npm run build
# Deploy to platform
```

## Support

For issues, please refer to the README.md or contact Lead City University IT Department.
