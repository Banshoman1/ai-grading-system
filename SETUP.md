# AI-Assisted Grading System - Setup Instructions

## Quick Start Guide

### 1. Prerequisites Installation

#### Windows
- Download Node.js from https://nodejs.org/ (LTS version)
- Download MySQL from https://dev.mysql.com/downloads/mysql/
- Download Git from https://git-scm.com/

#### macOS
```bash
brew install node mysql git
```

#### Linux
```bash
sudo apt-get install nodejs mysql-server git
```

### 2. Database Setup

#### Start MySQL Service
```bash
# Windows
net start MySQL80

# macOS
mysql.server start

# Linux
sudo service mysql start
```

#### Create Database
```bash
mysql -u root -p
```

Then run the schema file:
```bash
mysql -u root -p < database/schema.sql
mysql -u root -p ai_grading_system < database/seed.sql
```

### 3. Backend Configuration

```bash
cd backend
cp .env.example .env
```

Edit `.env`:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=ai_grading_system
DB_PORT=3306
JWT_SECRET=your_super_secret_key
PORT=5000
CORS_ORIGIN=http://localhost:5173
```

### 4. Start Services

**Terminal 1 - Backend:**
```bash
cd backend
npm install
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

### 5. Access Application

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000/api
- **Demo Login:** lecturer@lcu.edu.ng / demo123

## Features to Test

1. **Login** - Use demo credentials
2. **Dashboard** - View statistics
3. **Student Management** - Add/Edit/Delete students
4. **Course Management** - Manage courses
5. **Upload Scripts** - Submit answers for grading
6. **AI Grading** - View AI-generated grades
7. **Results** - View and export results
8. **Analytics** - View performance charts
9. **Reports** - Generate reports
10. **Settings** - Manage preferences

## Folder Structure

```
ai-grading-system/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── services/
│   │   ├── utils/
│   │   └── server.ts
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.ts
├── database/
│   ├── schema.sql
│   └── seed.sql
└── README.md
```

## Common Issues & Solutions

### Issue: CORS Error
**Solution:** Check CORS_ORIGIN in backend .env matches frontend URL

### Issue: Database Connection Error
**Solution:** 
- Ensure MySQL is running
- Check credentials in .env
- Verify database exists

### Issue: Port Already in Use
**Solution:** Change PORT in .env or kill the process using that port

### Issue: Module Not Found
**Solution:** 
```bash
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

1. Customize the system for your needs
2. Add more AI grading algorithms
3. Implement PDF export functionality
4. Deploy to production
5. Set up automated backups

## Support

For detailed information, refer to:
- `README.md` - Project overview
- `INSTALLATION.md` - Detailed installation
- Backend API documentation in comments

---

**Developer:** Adewale Gbolahan Okikiola  
**Matric Number:** LCU/UG/22/23017  
**Department:** Software Engineering  
**Institution:** Lead City University, Ibadan, Nigeria
