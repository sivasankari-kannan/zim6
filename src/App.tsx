import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { MemberProvider } from './context/MemberContext';
import { Toaster } from 'react-hot-toast';

// Layout Components
import Sidebar from './components/layout/Sidebar';
import AdminLayout from './pages/admin/AdminLayout';
import CustomerLayout from './pages/customer/CustomerLayout';

// Client Pages
import LandingPage from './pages/LandingPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import DashboardPage from './pages/DashboardPage';
import MembersPage from './pages/MembersPage';
import AddMemberPage from './pages/AddMemberPage';
import MemberDetailsPage from './pages/MemberDetailsPage';
import AddTrainerPage from './pages/AddTrainerPage';
import TrainerDetailsPage from './pages/TrainerDetailsPage';
import MembershipsPage from './pages/MembershipsPage';
import CreatePlanPage from './pages/CreatePlanPage';
import AttendancePage from './pages/AttendancePage';
import DueDatesPage from './pages/DueDatesPage';

// Admin Pages
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import GymOwnersPage from './pages/admin/GymOwnersPage';
import AddGymOwnerPage from './pages/admin/AddGymOwnerPage';

// Customer Pages
import CustomerDashboardPage from './pages/customer/CustomerDashboardPage';
import CustomerProfilePage from './pages/customer/CustomerProfilePage';
import CustomerAttendancePage from './pages/customer/CustomerAttendancePage';

// Protected Route Component for Gym Owners
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // Redirect based on user role
  if (isAuthenticated) {
    if (user?.role === 'admin' && !window.location.pathname.startsWith('/admin')) {
      return <Navigate to="/admin" replace />;
    }
    if (user?.role === 'customer' && !window.location.pathname.startsWith('/customer')) {
      return <Navigate to="/customer\" replace />;
    }
    if (user?.role === 'client' && window.location.pathname.startsWith('/customer')) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return isAuthenticated ? (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  ) : (
    <Navigate to="/signin" replace />
  );
};

function App() {
  return (
    <AuthProvider>
      <MemberProvider>
        <BrowserRouter>
          <Routes>
            {/* Dynamic Landing Page */}
            <Route path="/" element={<LandingPage />} />

            {/* Public Auth Routes */}
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboardPage />} />
              <Route path="gym-owners" element={<GymOwnersPage />} />
              <Route path="gym-owners/new" element={<AddGymOwnerPage />} />
            </Route>

            {/* Customer Routes */}
            <Route path="/customer" element={<CustomerLayout />}>
              <Route index element={<CustomerDashboardPage />} />
              <Route path="profile" element={<CustomerProfilePage />} />
              <Route path="attendance" element={<CustomerAttendancePage />} />
            </Route>

            {/* Gym Owner Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/members"
              element={
                <ProtectedRoute>
                  <MembersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/members/new"
              element={
                <ProtectedRoute>
                  <AddMemberPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/members/:id"
              element={
                <ProtectedRoute>
                  <MemberDetailsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/trainers/new"
              element={
                <ProtectedRoute>
                  <AddTrainerPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/trainers/:id"
              element={
                <ProtectedRoute>
                  <TrainerDetailsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/memberships"
              element={
                <ProtectedRoute>
                  <MembershipsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/memberships/new"
              element={
                <ProtectedRoute>
                  <CreatePlanPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/attendance"
              element={
                <ProtectedRoute>
                  <AttendancePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/due-dates"
              element={
                <ProtectedRoute>
                  <DueDatesPage />
                </ProtectedRoute>
              }
            />

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/\" replace />} />
          </Routes>
        </BrowserRouter>

        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#fff',
              color: '#333',
            },
            duration: 3000,
          }}
        />
      </MemberProvider>
    </AuthProvider>
  );
}

export default App;