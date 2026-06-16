import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext, useAuthState } from './hooks/useAuth';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import Toast from './components/Toast';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import StudentManagementPage from './pages/StudentManagementPage';
import CourseManagementPage from './pages/CourseManagementPage';
import UploadScriptsPage from './pages/UploadScriptsPage';
import GradingPage from './pages/GradingPage';
import ResultsPage from './pages/ResultsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const authState = useAuthState();

  return (
    <AuthContext.Provider value={authState}>
      <Router>
        <Toast />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
                  <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} onLogout={authState.logout} />
                  <div className="flex-1 flex flex-col overflow-hidden">
                    <Header lecturer={authState.lecturer} />
                    <main className="flex-1 overflow-auto p-6 md:p-8 lg:translate-x-0">
                      <DashboardPage />
                    </main>
                  </div>
                </div>
              </ProtectedRoute>
            }
          />

          <Route
            path="/students"
            element={
              <ProtectedRoute>
                <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
                  <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} onLogout={authState.logout} />
                  <div className="flex-1 flex flex-col overflow-hidden">
                    <Header lecturer={authState.lecturer} />
                    <main className="flex-1 overflow-auto p-6 md:p-8">
                      <StudentManagementPage />
                    </main>
                  </div>
                </div>
              </ProtectedRoute>
            }
          />

          <Route
            path="/courses"
            element={
              <ProtectedRoute>
                <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
                  <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} onLogout={authState.logout} />
                  <div className="flex-1 flex flex-col overflow-hidden">
                    <Header lecturer={authState.lecturer} />
                    <main className="flex-1 overflow-auto p-6 md:p-8">
                      <CourseManagementPage />
                    </main>
                  </div>
                </div>
              </ProtectedRoute>
            }
          />

          <Route
            path="/upload"
            element={
              <ProtectedRoute>
                <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
                  <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} onLogout={authState.logout} />
                  <div className="flex-1 flex flex-col overflow-hidden">
                    <Header lecturer={authState.lecturer} />
                    <main className="flex-1 overflow-auto p-6 md:p-8">
                      <UploadScriptsPage />
                    </main>
                  </div>
                </div>
              </ProtectedRoute>
            }
          />

          <Route
            path="/grading"
            element={
              <ProtectedRoute>
                <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
                  <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} onLogout={authState.logout} />
                  <div className="flex-1 flex flex-col overflow-hidden">
                    <Header lecturer={authState.lecturer} />
                    <main className="flex-1 overflow-auto p-6 md:p-8">
                      <GradingPage />
                    </main>
                  </div>
                </div>
              </ProtectedRoute>
            }
          />

          <Route
            path="/results"
            element={
              <ProtectedRoute>
                <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
                  <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} onLogout={authState.logout} />
                  <div className="flex-1 flex flex-col overflow-hidden">
                    <Header lecturer={authState.lecturer} />
                    <main className="flex-1 overflow-auto p-6 md:p-8">
                      <ResultsPage />
                    </main>
                  </div>
                </div>
              </ProtectedRoute>
            }
          />

          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
                  <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} onLogout={authState.logout} />
                  <div className="flex-1 flex flex-col overflow-hidden">
                    <Header lecturer={authState.lecturer} />
                    <main className="flex-1 overflow-auto p-6 md:p-8">
                      <AnalyticsPage />
                    </main>
                  </div>
                </div>
              </ProtectedRoute>
            }
          />

          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
                  <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} onLogout={authState.logout} />
                  <div className="flex-1 flex flex-col overflow-hidden">
                    <Header lecturer={authState.lecturer} />
                    <main className="flex-1 overflow-auto p-6 md:p-8">
                      <ReportsPage />
                    </main>
                  </div>
                </div>
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
                  <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} onLogout={authState.logout} />
                  <div className="flex-1 flex flex-col overflow-hidden">
                    <Header lecturer={authState.lecturer} />
                    <main className="flex-1 overflow-auto p-6 md:p-8">
                      <SettingsPage />
                    </main>
                  </div>
                </div>
              </ProtectedRoute>
            }
          />

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;