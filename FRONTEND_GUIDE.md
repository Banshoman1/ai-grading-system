# Frontend Setup Guide

## Environment Variables

Create a `.env` file in the `frontend` directory (optional, defaults are provided):

```env
VITE_APP_API_URL=http://localhost:5000/api
```

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Dashboard Card.tsx        # Reusable dashboard card
│   │   ├── Header.tsx                # Page header with user info
│   │   ├── ProtectedRoute.tsx        # Route protection wrapper
│   │   ├── Sidebar.tsx               # Main navigation sidebar
│   │   ├── LoadingSpinner.tsx        # Loading indicator
│   │   └── Toast.tsx                 # Notification system
│   ├── pages/
│   │   ├── HomePage.tsx              # Landing page
│   │   ├── AboutPage.tsx             # About page
│   │   ├── LoginPage.tsx             # Login page
│   │   ├── DashboardPage.tsx         # Main dashboard
│   │   ├── StudentManagementPage.tsx # Student CRUD
│   │   ├── CourseManagementPage.tsx  # Course CRUD
│   │   ├── UploadScriptsPage.tsx     # Upload answers
│   │   ├── GradingPage.tsx           # View grades
│   │   ├── ResultsPage.tsx           # Results table
│   │   ├── AnalyticsPage.tsx         # Charts & stats
│   │   ├── ReportsPage.tsx           # Report generation
│   │   └── SettingsPage.tsx          # Settings
│   ├── hooks/
│   │   ├── useAuth.ts                # Authentication logic
│   │   └── useDarkMode.ts            # Dark mode toggle
│   ├── services/
│   │   └── api.ts                    # API client
│   ├── types/
│   │   └── index.ts                  # TypeScript interfaces
│   ├── utils/
│   │   └── formatting.ts             # Helper functions
│   ├── App.tsx                       # Main app component
│   ├── main.tsx                      # Entry point
│   └── index.css                     # Global styles
├── public/                           # Static assets
├── index.html                        # HTML template
├── vite.config.ts                    # Vite configuration
├── tailwind.config.js                # Tailwind CSS config
├── tsconfig.json                     # TypeScript config
└── package.json                      # Dependencies
```

## Key Components

### API Service (`src/services/api.ts`)
Centralized API communication with automatic token management.

**Usage:**
```typescript
import api from './services/api';

// Login
const { token, lecturer } = await api.login(email, password);

// Get students
const students = await api.getStudents();

// Add student
const newStudent = await api.addStudent(studentData);

// Grade answer
const result = await api.submitForGrading(gradingData);
```

### Authentication Hook (`src/hooks/useAuth.ts`)
Provides authentication state and methods throughout the app.

**Usage:**
```typescript
import { useAuth } from './hooks/useAuth';

const { lecturer, token, login, logout, isAuthenticated } = useAuth();
```

### Dark Mode Hook (`src/hooks/useDarkMode.ts`)
Manages dark mode state with localStorage persistence.

**Usage:**
```typescript
import { useDarkMode } from './hooks/useDarkMode';

const { isDark, toggle } = useDarkMode();
```

## Styling

### Tailwind CSS
Utility-first CSS framework for rapid UI development.

**Color Scheme:**
- Primary: `#003366` (university blue)
- Gold: `#D4AF37` (accent)
- White: `#FFFFFF`

**Example:**
```tsx
<button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-700">
  Click me
</button>
```

### Dark Mode
Automatically toggles between light and dark themes.

**Usage:**
```tsx
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
  Content
</div>
```

## State Management

### Context API
Used for global authentication state.

```typescript
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// In App.tsx
<AuthContext.Provider value={authState}>
  {/* App content */}
</AuthContext.Provider>
```

### Local State
React hooks for component-level state management.

```typescript
const [students, setStudents] = useState<Student[]>([]);
const [loading, setLoading] = useState(true);
```

## Routing

### Route Structure
```typescript
/                    // Home page
/about              // About page
/login              // Login page
/dashboard          // Protected: Main dashboard
/students           // Protected: Student management
/courses            // Protected: Course management
/upload             // Protected: Upload scripts
/grading            // Protected: View grades
/results            // Protected: View results
/analytics          // Protected: Analytics
/reports            // Protected: Reports
/settings           // Protected: Settings
```

### Protected Routes
```typescript
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  }
/>
```

## Forms

### Form Handling
```typescript
const [formData, setFormData] = useState({ ... });

const handleChange = (field: string, value: string) => {
  setFormData({ ...formData, [field]: value });
};

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  await api.addStudent(formData);
  toast.success('Student added!');
};
```

## Notifications

### Toast Notifications
```typescript
import toast from 'react-hot-toast';

toast.success('Success message');
toast.error('Error message');
toast.loading('Loading...');
```

## Charts

### Recharts
```typescript
import { BarChart, Bar, LineChart, Line, PieChart, Pie } from 'recharts';

<ResponsiveContainer width="100%" height={300}>
  <BarChart data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Bar dataKey="value" fill="#003366" />
  </BarChart>
</ResponsiveContainer>
```

## Performance Optimization

### Code Splitting
Pages are automatically code-split by React Router.

### Lazy Loading
```typescript
const Page = lazy(() => import('./pages/DashboardPage'));

<Suspense fallback={<LoadingSpinner />}>
  <Page />
</Suspense>
```

### Memoization
```typescript
const MemoizedComponent = React.memo(Component);
```

## Deployment

### Build for Production
```bash
npm run build
```

### Preview Build
```bash
npm run preview
```

### Deploy Platforms
- **Vercel:** Optimal for Vite projects
- **Netlify:** Excellent serverless functions
- **GitHub Pages:** Free static hosting

---

**Last Updated:** June 16, 2024