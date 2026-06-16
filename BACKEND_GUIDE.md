# Backend Development Guide

## Backend Architecture

### Directory Structure
```
backend/
├── src/
│   ├── config/
│   │   └── database.ts              # MySQL connection pool
│   ├── controllers/
│   │   ├── authController.ts        # Authentication logic
│   │   ├── studentController.ts     # Student CRUD
│   │   ├── courseController.ts      # Course CRUD
│   │   ├── gradingController.ts     # Grading logic
│   │   └── analyticsController.ts   # Analytics data
│   ├── routes/
│   │   ├── auth.ts                  # Auth routes
│   │   ├── students.ts              # Student routes
│   │   ├── courses.ts               # Course routes
│   │   ├── grading.ts               # Grading routes
│   │   └── analytics.ts             # Analytics routes
│   ├── middleware/
│   │   └── auth.ts                  # JWT verification
│   ├── types/
│   │   └── index.ts                 # TypeScript interfaces
│   ├── utils/
│   │   └── grading.ts               # AI grading algorithm
│   └── server.ts                    # Express app setup
├── .env                             # Environment variables
├── package.json                     # Dependencies
└── tsconfig.json                    # TypeScript config
```

## Database Connection

### Connection Pool (`src/config/database.ts`)
```typescript
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
```

### Usage
```typescript
const connection = await pool.getConnection();
const [rows] = await connection.query('SELECT * FROM students');
connection.release();
```

## Authentication

### JWT Middleware (`src/middleware/auth.ts`)
```typescript
export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'No token' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.lecturer = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
```

### Login Flow
```typescript
1. Verify email/password
2. Generate JWT token
3. Return token and user data
4. Client stores token in localStorage
5. Include token in subsequent requests
```

## Controllers

### Auth Controller
```typescript
export const login = async (req, res) => {
  const { email, password } = req.body;
  
  // Validate credentials
  const isValid = await bcrypt.compare(password, hashedPassword);
  
  if (!isValid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  
  // Generate token
  const token = jwt.sign(
    { id, email, role: 'lecturer' },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );
  
  res.json({ token, lecturer });
};
```

### Student Controller
```typescript
export const addStudent = async (req, res) => {
  const { matricNumber, firstName, lastName, department, level, email } = req.body;
  
  // Validate required fields
  if (!matricNumber || !firstName || !lastName) {
    return res.status(400).json({ message: 'Required fields missing' });
  }
  
  // Add to database
  const result = await pool.query(
    'INSERT INTO students (matricNumber, firstName, lastName, ...) VALUES (?, ?, ?, ...)',
    [matricNumber, firstName, lastName, ...]
  );
  
  res.status(201).json({ data: newStudent });
};
```

## AI Grading Algorithm

### Grading Calculation (`src/utils/grading.ts`)

```typescript
export function gradeAnswer(modelAnswer: string, studentAnswer: string): GradingResult {
  // 1. Calculate cosine similarity (50% weight)
  const similarity = cosineSimilarity(modelAnswer, studentAnswer);
  
  // 2. Calculate keyword matching (30% weight)
  const keywords = keywordMatching(modelAnswer, studentAnswer);
  
  // 3. Calculate length similarity (20% weight)
  const length = lengthSimilarity(modelAnswer, studentAnswer);
  
  // 4. Weighted average
  const score = similarity * 0.5 + keywords * 0.3 + length * 0.2;
  
  // 5. Determine grade
  const grade = getGrade(score);
  
  // 6. Generate feedback
  const feedback = generateFeedback(score, grade);
  
  return { score, grade, feedback, similarityScore, performanceLevel };
}
```

### Algorithm Details

**Cosine Similarity:**
```typescript
function cosineSimilarity(str1: string, str2: string): number {
  const words1 = str1.toLowerCase().split(/\s+/);
  const words2 = str2.toLowerCase().split(/\s+/);
  
  const set1 = new Set(words1);
  const set2 = new Set(words2);
  
  const intersection = new Set([...set1].filter(x => set2.has(x)));
  const union = new Set([...set1, ...set2]);
  
  return union.size > 0 ? (intersection.size / union.size) * 100 : 0;
}
```

**Keyword Matching:**
```typescript
function keywordMatching(modelAnswer: string, studentAnswer: string): number {
  const modelKeywords = modelAnswer.toLowerCase().split(/\s+/);
  const studentText = studentAnswer.toLowerCase();
  
  let matchedCount = 0;
  const importantKeywords = modelKeywords.filter(word => word.length > 4);
  
  importantKeywords.forEach(keyword => {
    if (studentText.includes(keyword)) {
      matchedCount++;
    }
  });
  
  return (matchedCount / importantKeywords.length) * 100;
}
```

## Routes

### Route Setup (`src/server.ts`)
```typescript
import authRoutes from './routes/auth';
import studentRoutes from './routes/students';
import courseRoutes from './routes/courses';
import gradingRoutes from './routes/grading';
import analyticsRoutes from './routes/analytics';

app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/grade', gradingRoutes);
app.use('/api/analytics', analyticsRoutes);
```

### Protected Routes
```typescript
router.use(authMiddleware); // All routes below require auth

router.get('/', getStudents);
router.post('/', addStudent);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);
```

## Error Handling

### Global Error Middleware
```typescript
app.use((err: any, req: Request, res: Response) => {
  console.error('Error:', err);
  
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});
```

## Environment Variables

### `.env` Configuration
```env
# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=ai_grading_system
DB_PORT=3306

# JWT
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=24h

# Server
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

## Development

### Running Development Server
```bash
npm run dev
```

### Building TypeScript
```bash
npm run build
```

### Running Tests
```bash
npm test
```

## Deployment

### Production Build
```bash
npm run build
npm start
```

### Environment for Production
```env
NODE_ENV=production
DB_HOST=prod-db-host
DB_USER=prod_user
DB_PASSWORD=secure_password
JWT_SECRET=very_secure_secret_key
```

## Security Best Practices

1. **Always validate input** - Use validators before processing
2. **Hash passwords** - Use bcrypt for password hashing
3. **Secure JWT** - Use strong secret keys
4. **HTTPS** - Use HTTPS in production
5. **Rate limiting** - Implement rate limiting on APIs
6. **CORS** - Configure CORS properly
7. **SQL Injection** - Use prepared statements

## Performance

1. **Connection Pooling** - Reuse database connections
2. **Caching** - Cache frequently accessed data
3. **Pagination** - Implement pagination for large datasets
4. **Indexing** - Add database indexes on frequently queried columns
5. **Compression** - Use gzip compression for responses

---

**Last Updated:** June 16, 2024