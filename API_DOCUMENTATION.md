# API Documentation - AI-Assisted Grading System

## Base URL
```
http://localhost:5000/api
```

## Authentication
All endpoints (except login) require JWT token in Authorization header:
```
Authorization: Bearer <token>
```

---

## Authentication Endpoints

### Login
**POST** `/auth/login`

**Request Body:**
```json
{
  "email": "lecturer@lcu.edu.ng",
  "password": "demo123"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "lecturer": {
    "id": 1,
    "email": "lecturer@lcu.edu.ng",
    "firstName": "John",
    "lastName": "Doe",
    "department": "Software Engineering"
  }
}
```

### Logout
**POST** `/auth/logout`

**Response (200):**
```json
{
  "message": "Logged out successfully"
}
```

---

## Student Endpoints

### Get All Students
**GET** `/students`

**Response (200):**
```json
{
  "data": [
    {
      "id": 1,
      "matricNumber": "LCU/UG/22/23001",
      "firstName": "Adewale",
      "lastName": "Okikiola",
      "department": "Software Engineering",
      "level": "200",
      "email": "adewale.okikiola@lcu.edu.ng",
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

### Add Student
**POST** `/students`

**Request Body:**
```json
{
  "matricNumber": "LCU/UG/22/23020",
  "firstName": "John",
  "lastName": "Akinlade",
  "department": "Software Engineering",
  "level": "200",
  "email": "john.akinlade@lcu.edu.ng"
}
```

**Response (201):**
```json
{
  "data": {
    "id": 4,
    "matricNumber": "LCU/UG/22/23020",
    "firstName": "John",
    "lastName": "Akinlade",
    "department": "Software Engineering",
    "level": "200",
    "email": "john.akinlade@lcu.edu.ng",
    "createdAt": "2024-06-16T12:00:00Z",
    "updatedAt": "2024-06-16T12:00:00Z"
  }
}
```

### Get Student
**GET** `/students/:id`

**Response (200):** Same as single student object above

### Update Student
**PUT** `/students/:id`

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Akinlade",
  "email": "john.new@lcu.edu.ng"
}
```

**Response (200):** Updated student object

### Delete Student
**DELETE** `/students/:id`

**Response (200):**
```json
{
  "message": "Student deleted successfully"
}
```

---

## Course Endpoints

### Get All Courses
**GET** `/courses`

**Response (200):**
```json
{
  "data": [
    {
      "id": 1,
      "courseCode": "CSC201",
      "courseTitle": "Data Structures",
      "semester": 1,
      "lecturerId": 1,
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

### Add Course
**POST** `/courses`

**Request Body:**
```json
{
  "courseCode": "CSC206",
  "courseTitle": "Web Security",
  "semester": 2
}
```

**Response (201):** Created course object

### Update Course
**PUT** `/courses/:id`

**Request Body:**
```json
{
  "courseTitle": "Advanced Web Security",
  "semester": 2
}
```

**Response (200):** Updated course object

### Delete Course
**DELETE** `/courses/:id`

**Response (200):**
```json
{
  "message": "Course deleted successfully"
}
```

---

## Grading Endpoints

### Submit for Grading
**POST** `/grade/submit`

**Request Body:**
```json
{
  "courseId": 1,
  "studentId": 1,
  "question": "What is a binary tree?",
  "modelAnswer": "A binary tree is a hierarchical data structure where each node has at most two children: left and right. Binary trees are fundamental in computer science and are used in many applications including expression parsing and indexing.",
  "studentAnswer": "A binary tree is a tree where each node has two children called left and right. It's used for sorting and searching data."
}
```

**Response (201):**
```json
{
  "message": "Answer graded successfully",
  "data": {
    "id": 1,
    "courseId": 1,
    "studentId": 1,
    "question": "What is a binary tree?",
    "score": 78,
    "grade": "C",
    "feedback": "Good attempt. The student grasped the main concepts but missed some important details. More detailed explanations and examples would improve the response.",
    "similarityScore": 78,
    "performanceLevel": "Good",
    "createdAt": "2024-06-16T12:00:00Z"
  }
}
```

### Get Results
**GET** `/grade/results`

**Query Parameters:**
- `courseId` (optional): Filter by course
- `studentId` (optional): Filter by student

**Response (200):**
```json
{
  "data": [
    {
      "id": 1,
      "courseId": 1,
      "studentId": 1,
      "question": "What is a binary tree?",
      "score": 78,
      "grade": "C",
      "feedback": "...",
      "similarityScore": 78,
      "performanceLevel": "Good",
      "createdAt": "2024-06-16T12:00:00Z"
    }
  ]
}
```

### Get Result Details
**GET** `/grade/results/:id`

**Response (200):** Single result object

---

## Analytics Endpoints

### Get Dashboard Statistics
**GET** `/analytics/dashboard`

**Response (200):**
```json
{
  "data": {
    "totalStudents": 156,
    "totalCourses": 8,
    "totalExams": 24,
    "averagePerformance": 76.5,
    "passRate": 85,
    "failRate": 15
  }
}
```

### Get Grade Distribution
**GET** `/analytics/grades`

**Response (200):**
```json
{
  "data": [
    { "grade": "A", "count": 34 },
    { "grade": "B", "count": 56 },
    { "grade": "C", "count": 42 },
    { "grade": "D", "count": 16 },
    { "grade": "F", "count": 8 }
  ]
}
```

### Get Student Performance
**GET** `/analytics/performance`

**Response (200):**
```json
{
  "data": [
    { "course": "Data Structures", "averageScore": 78 },
    { "course": "Web Development", "averageScore": 82 },
    { "course": "Database Mgmt", "averageScore": 75 },
    { "course": "OOP", "averageScore": 88 },
    { "course": "Software Testing", "averageScore": 71 }
  ]
}
```

### Get Pass/Fail Statistics
**GET** `/analytics/passfail`

**Response (200):**
```json
{
  "data": [
    { "name": "Pass", "value": 132, "percentage": 85 },
    { "name": "Fail", "value": 24, "percentage": 15 }
  ]
}
```

---

## Error Responses

### Unauthorized (401)
```json
{
  "message": "Invalid token" or "No token provided"
}
```

### Bad Request (400)
```json
{
  "message": "Required fields missing"
}
```

### Not Found (404)
```json
{
  "message": "Student not found" or "Course not found"
}
```

### Server Error (500)
```json
{
  "message": "Internal server error"
}
```

---

## Testing with cURL

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "lecturer@lcu.edu.ng",
    "password": "demo123"
  }'
```

### Get Students
```bash
curl -X GET http://localhost:5000/api/students \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Add Student
```bash
curl -X POST http://localhost:5000/api/students \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "matricNumber": "LCU/UG/22/23099",
    "firstName": "Test",
    "lastName": "Student",
    "department": "Software Engineering",
    "level": "200",
    "email": "test@lcu.edu.ng"
  }'
```

### Submit for Grading
```bash
curl -X POST http://localhost:5000/api/grade/submit \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "courseId": 1,
    "studentId": 1,
    "question": "What is OOP?",
    "modelAnswer": "Object-oriented programming is a programming paradigm based on objects which contain data and methods. OOP concepts include encapsulation, inheritance, and polymorphism.",
    "studentAnswer": "OOP is a programming approach using objects and classes. It helps organize code."
  }'
```

---

## Grading Algorithm Details

### Scoring Methods

1. **Keyword Matching (30% weight)**
   - Extracts important keywords from model answer
   - Counts how many appear in student answer
   - Percentage = (matched keywords / total keywords) × 100

2. **Cosine Similarity (50% weight)**
   - Measures semantic similarity between answers
   - Uses set-based comparison
   - Returns similarity as percentage

3. **Length Similarity (20% weight)**
   - Compares answer length to model answer
   - Ensures students provide adequate detail
   - Penalizes very short or very long answers

### Final Score Calculation
```
Final Score = (Cosine × 0.5) + (Keywords × 0.3) + (Length × 0.2)
```

### Grading Scale
| Score Range | Grade | Performance Level |
|---|---|---|
| 90-100 | A | Excellent |
| 80-89 | B | Very Good |
| 70-79 | C | Good |
| 60-69 | D | Fair |
| 0-59 | F | Poor |

---

## Rate Limiting
Not currently implemented. Consider adding in production.

## Pagination
Not currently implemented. Consider adding for large datasets.

## Versioning
Current API Version: 1.0.0

---

**Last Updated:** June 16, 2024
**Developer:** Adewale Gbolahan Okikiola
**Matric:** LCU/UG/22/23017