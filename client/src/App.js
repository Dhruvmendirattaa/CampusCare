import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useState, useEffect } from "react";

// Navbars & Footer
import Navbar from "./Components/navbar";
import TeacherNavbar from "./Components/TeacherNavbar";
import StudentNavbar from "./Components/StudentNavbar";
import Footer from "./Components/Footer";

// Pages
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
import Bubble from "./pages/Bubble";
import BubblePop from "./pages/Bubblepop";

// Dashboard inner components
import DearDiary from "./Components/DearDiary";
import MoodTracker from "./Components/MoodTracker";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";

// 🔹 ProtectedRoute with safe alerts
const ProtectedRoute = ({ children, allowedRole }) => {
  const { user, role } = useAuth();
  const location = useLocation();
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (!user || (allowedRole && role !== allowedRole)) {
      setShowMessage(true);
      const timer = setTimeout(() => setShowMessage(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [user, role, allowedRole]);

  if (!user) {
    return (
      <>
        {showMessage && (
          <div className="auth-warning">
            ⚠️ Please log in or sign up to access this feature.
          </div>
        )}
        <Navigate to="/login" replace state={{ from: location }} />
      </>
    );
  }

  if (allowedRole && role !== allowedRole) {
    return (
      <>
        {showMessage && (
          <div className="auth-warning">
            ❗ You don't have permission to view this page.
          </div>
        )}
        <Navigate to="/" replace />
      </>
    );
  }

  return children;
};

function AppContent() {
  const { role } = useAuth();
  const location = useLocation();

  // ✅ Hide StudentNavbar when a student visits /forms
  const hideStudentNavbar =
    role === "student" &&
    (location.pathname === "/Forms" ||
     location.pathname === "/bubble" ||
     location.pathname === "/bubblepop");


  return (
    <div className="app-container">
      {/* Conditionally render navbar */}
      {role === "teacher" ? (
        <TeacherNavbar />
      ) : role === "student" && !hideStudentNavbar ? (
        <StudentNavbar />
      ) : (
        role !== "student" &&
        role !== "teacher" && <Navbar />
      )}

      <div className="content">
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/counsellor-sessions" element={<CounsellorSessions />} />
          <Route path="/resource-hub" element={<ResourceHub />} />
          <Route path="/group-chat" element={<GroupChat />} />

          {/* Games */}
          <Route path="/bubble" element={<Bubble />} />
          <Route path="/bubblepop" element={<BubblePop />} />

          {/* 🔒 Forms page (Hide navbar for students) */}
          <Route
            path="/forms"
            element={
              <ProtectedRoute allowedRole="student">
                <Forms />
              </ProtectedRoute>
            }
          />

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
                <TeacherDashboard />
              </ProtectedRoute>
            }
          />

          {/* Student Protected Pages */}
          <Route
            path="/appointment"
            element={
              <ProtectedRoute allowedRole="student">
                <AppointmentPage />
              </ProtectedRoute>
            }
          />
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

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
