import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // ✅ use context instead of localStorage
import Navbar from "./Components/navbar";
import TeacherNavbar from "./Components/TeacherNavbar";
import StudentNavbar from "./Components/StudentNavbar";
import Footer from "./Components/Footer";

import Home from "./pages/Home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import CounsellorSessions from "./pages/CounsellorSessions";
import Dashboard from "./pages/Dashboard";
import AppointmentPage from "./pages/appointmentBooking";
import ResourceHub from "./pages/resourceHub";
import Forms from "./pages/Forms";
import GroupChat from "./pages/groupchat";
import TeacherHome from "./pages/TeacherHome";
import TeacherDashboard from "./pages/teacherdashboard";
// Components inside Dashboard
import DearDiary from "./Components/DearDiary";
import MoodTracker from "./Components/MoodTracker";

import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  // 🔹 Get auth state from context
  const { user, role } = useAuth();

  // Protected Route component
  const ProtectedRoute = ({ children, allowedRole }) => {
    if (!user) return <Navigate to="/login" replace />;
    if (allowedRole && role !== allowedRole) return <Navigate to="/" replace />;
    return children;
  };

  return (
    <Router>
      <div className="app-container">
        {/* Conditionally render navbar */}
        {role === "teacher" ? (
          <TeacherNavbar />
        ) : role === "student" ? (
          <StudentNavbar />
        ) : (
          <Navbar />
        )}

        <div className="content">
          <Routes>
            {/* Public Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/counsellor-sessions" element={<CounsellorSessions />} />
            <Route path="/appointment" element={<AppointmentPage />} />
            <Route path="/resource-hub" element={<ResourceHub />} />
            <Route path="/forms" element={<Forms />} />
            <Route path="/group-chat" element={<GroupChat />} />

            {/* Teacher Protected Pages */}
            <Route
              path="/teacher-home"
              element={
                <ProtectedRoute allowedRole="teacher">
                  <TeacherHome />
                </ProtectedRoute>
              }

            />

            <Route
              path="/teacherdashboard"
              element={
                <ProtectedRoute allowedRole="teacher">
                  <TeacherDashboard/>
                </ProtectedRoute>
              }
            />

            {/* Student Protected Pages */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute allowedRole="student">
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/dear-diary"
              element={
                <ProtectedRoute allowedRole="student">
                  <DearDiary />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/mood-tracker"
              element={
                <ProtectedRoute allowedRole="student">
                  <MoodTracker />
                </ProtectedRoute>
              }
            />

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
