// // // // import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// // // // import Navbar from "./Components/navbar";
// // // // import Footer from "./Components/Footer";
// // // // import Home from "./pages/Home";
// // // // import Login from "./pages/login";
// // // // import Signup from "./pages/signup"; // <-- Signup import kiya
// // // // import CounsellorSessions from "./pages/CounsellorSessions";
// // // // import Dashboard from "./pages/Dashboard";
// // // // import Forms from "./pages/Forms"; 


// // // // function App() {
// // // //   return (
// // // //     <Router>
// // // //       <div className="app-container">
// // // //         <Navbar />
// // // //         <div className="content">
// // // //           <Routes>
// // // //             <Route path="/" element={<Home />} />
// // // //             <Route path="/login" element={<Login />} />
// // // //             <Route path="/counsellor-sessions" element={<CounsellorSessions/>}/>
// // // //             <Route path="/dashboard" element={<Dashboard/>}/>
// // // //             <Route path="/signup" element={<Signup/>}/>
// // // //             <Route path="/Forms" element={<Forms />} /> 



// // // //           </Routes>
// // // //         </div>
// // // //         <Footer />
// // // //       </div>
// // // //     </Router>
// // // //   );
// // // // }

// // // // export default App;
// // // import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// // // import Navbar from "./Components/navbar";
// // // import Footer from "./Components/Footer";
// // // import Home from "./pages/Home";
// // // import Login from "./pages/login";
// // // import Signup from "./pages/signup";
// // // import CounsellorSessions from "./pages/CounsellorSessions";
// // // import Dashboard from "./pages/Dashboard";
// // // import AppointmentPage from "./pages/appointmentBooking"; 
// // // import ResourceHub from "./pages/resourceHub"; 
// // // import DearDiary from "./Components/DearDiary";
// // // import MoodTracker from "./Components/MoodTracker";
// // // import "@fortawesome/fontawesome-free/css/all.min.css";

// // // function App() {
// // //   return (
// // //     <Router>
// // //       <div className="app-container">
// // //         <Navbar />
// // //         <div className="content">
// // //           <Routes>
// // //             {/* Main Pages */}
// // //             <Route path="/" element={<Home />} />
// // //             <Route path="/login" element={<Login />} />
// // //             <Route path="/signup" element={<Signup />} />
// // //             <Route path="/counsellor-sessions" element={<CounsellorSessions />} />
// // //             <Route path="/appointment" element={<AppointmentPage />} />
// // //             <Route path="/resource-hub" element={<ResourceHub />} />

// // //             {/* Dashboard + Sub Pages */}
// // //             <Route path="/dashboard" element={<Dashboard />} />
// // //             <Route path="/dashboard/dear-diary" element={<DearDiary />} />
// // //             <Route path="/dashboard/mood-tracker" element={<MoodTracker />} />
// // //           </Routes>
// // //         </div>
// // //         <Footer />
// // //       </div>
// // //     </Router>
// // //   );
// // // }

// // // export default App;

// // import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// // import Navbar from "./Components/navbar";
// // import Footer from "./Components/Footer";
// // import Home from "./pages/Home";
// // import Login from "./pages/login";
// // import Signup from "./pages/signup";
// // import CounsellorSessions from "./pages/CounsellorSessions";
// // import Dashboard from "./pages/Dashboard";
// // import AppointmentPage from "./pages/appointmentBooking";
// // import ResourceHub from "./pages/resourceHub";
// // import Forms from "./pages/Forms"; 
// // import DearDiary from "./Components/DearDiary";
// // import MoodTracker from "./Components/MoodTracker";
// // // agar react-icons use karna ho toh neeche wali line hata do
// // import "@fortawesome/fontawesome-free/css/all.min.css";

// // function App() {
// //   return (
// //     <Router>
// //       <div className="app-container">
// //         <Navbar />
// //         <div className="content">
// //           <Routes>
// //             {/* Main Pages */}
// //             <Route path="/" element={<Home />} />
// //             <Route path="/login" element={<Login />} />
// //             <Route path="/signup" element={<Signup />} />
// //             <Route path="/counsellor-sessions" element={<CounsellorSessions />} />
// //             <Route path="/appointment" element={<AppointmentPage />} />
// //             <Route path="/resource-hub" element={<ResourceHub />} />
// //             <Route path="/forms" element={<Forms />} /> 

// //             {/* Dashboard + Sub Pages */}
// //             <Route path="/dashboard" element={<Dashboard />} />
// //             <Route path="/dashboard/dear-diary" element={<DearDiary />} />
// //             <Route path="/dashboard/mood-tracker" element={<MoodTracker />} />
// //           </Routes>
// //         </div>
// //         <Footer />
// //       </div>
// //     </Router>
// //   );
// // }

// // export default App;


// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./Components/navbar";
// import TeacherNavbar from "./Components/TeacherNavbar";
// import Footer from "./Components/Footer";
// import Home from "./pages/Home";
// import Login from "./pages/login";
// import Signup from "./pages/signup";
// import CounsellorSessions from "./pages/CounsellorSessions";
// import Dashboard from "./pages/Dashboard";
// import AppointmentPage from "./pages/appointmentBooking";
// import ResourceHub from "./pages/resourceHub";
// import Forms from "./pages/Forms";
// import GroupChat from "./pages/groupchat";
// import TeacherLogin from "./pages/TeacherLogin";

// // ...



// import DearDiary from "./Components/DearDiary";
// import MoodTracker from "./Components/MoodTracker";

// import "@fortawesome/fontawesome-free/css/all.min.css";

// function App() {
//   const role = localStorage.getItem("role"); 
//   return (
//     <Router>
//       <div className="app-container">
//         {role === "teacher" ? <TeacherNavbar /> : <Navbar />}
//         <div className="content">
//           <Routes>
//             {/* Main Pages */}
//             <Route path="/" element={<Home />} />
//             <Route path="/teacher-login" element={<TeacherLogin/>}/>
//             <Route path="/login" element={<Login />} />
//             <Route path="/signup" element={<Signup />} />
//             <Route path="/counsellor-sessions" element={<CounsellorSessions />} />
//             <Route path="/appointment" element={<AppointmentPage />} />
//             <Route path="/resource-hub" element={<ResourceHub />} />
//             <Route path="/forms" element={<Forms />} /> 
//             <Route path="/group-chat" element={<GroupChat />} />

//             {/* Dashboard + Sub Pages */}
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/dashboard/dear-diary" element={<DearDiary />} />
//             <Route path="/dashboard/mood-tracker" element={<MoodTracker />} />
//           </Routes>
//         </div>
//         <Footer />
//       </div>
//     </Router>
//   );
// }

// // export default App;

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./Components/navbar";
// import TeacherNavbar from "./Components/TeacherNavbar";
// import StudentNavbar from "./Components/StudentNavbar";  // ✅ Add this import
// import Footer from "./Components/Footer";
// import Home from "./pages/Home";
// import Login from "./pages/login";
// import Signup from "./pages/signup";
// import CounsellorSessions from "./pages/CounsellorSessions";
// import Dashboard from "./pages/Dashboard";
// import AppointmentPage from "./pages/appointmentBooking";
// import ResourceHub from "./pages/resourceHub";
// import Forms from "./pages/Forms";
// import GroupChat from "./pages/groupchat";
// import TeacherLogin from "./pages/TeacherLogin";
// import TeacherHome from "./pages/TeacherHome";

// // Components inside Dashboard
// import DearDiary from "./Components/DearDiary";
// import MoodTracker from "./Components/MoodTracker";

// import "@fortawesome/fontawesome-free/css/all.min.css";

// function App() {  
// const role = localStorage.getItem("role"); 
//   return (
//     <Router>
//       <div className="app-container">



//         {/* ✅ Navbar role-based */}
//         {role === "teacher" 
//           ? <TeacherNavbar /> 
//           : role === "student" 
//             ? <StudentNavbar /> 
//             : <Navbar />}

//         <div className="content">
//           <Routes>
//             {/* Main Pages */}
//             <Route path="/" element={<Home />} />
//             <Route path="/teacher-login" element={<TeacherLogin />} />
//             <Route path="/teacher-home" element={<TeacherHome />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/signup" element={<Signup />} />
//             <Route path="/counsellor-sessions" element={<CounsellorSessions />} />
//             <Route path="/appointment" element={<AppointmentPage />} />
//             <Route path="/resource-hub" element={<ResourceHub />} />
//             <Route path="/forms" element={<Forms />} /> 
//             <Route path="/group-chat" element={<GroupChat />} />

//             {/* Dashboard + Sub Pages */}
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/dashboard/dear-diary" element={<DearDiary />} />
//             <Route path="/dashboard/mood-tracker" element={<MoodTracker />} />
//           </Routes>
//         </div>
//         <Footer />
//       </div>
//     </Router>
//   );
// }

// export default App;

// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Navbar from "./Components/navbar";
// import TeacherNavbar from "./Components/TeacherNavbar";
// import StudentNavbar from "./Components/StudentNavbar";
// import Footer from "./Components/Footer";

// import Home from "./pages/Home";
// import Login from "./pages/login";
// import Signup from "./pages/signup";
// import CounsellorSessions from "./pages/CounsellorSessions";
// import Dashboard from "./pages/Dashboard";
// import AppointmentPage from "./pages/appointmentBooking";
// import ResourceHub from "./pages/resourceHub";
// import Forms from "./pages/Forms";
// import GroupChat from "./pages/groupchat";
// import TeacherHome from "./pages/TeacherHome";

// // Components inside Dashboard
// import DearDiary from "./Components/DearDiary";
// import MoodTracker from "./Components/MoodTracker";

// import "@fortawesome/fontawesome-free/css/all.min.css";

// function App() {
//   const role = localStorage.getItem("role");
//   const token = localStorage.getItem("token");

//   // Protected Route component
//   const ProtectedRoute = ({ children, allowedRole }) => {
//     if (!token) return <Navigate to="/login" replace />;
//     if (allowedRole && role !== allowedRole) return <Navigate to="/" replace />;
//     return children;
//   };

//   return (
//     <Router>
//       <div className="app-container">
//         {/* Conditionally render navbar */}
//         {role === "teacher" ? (
//           <TeacherNavbar />
//         ) : role === "student" ? (
//           <StudentNavbar />
//         ) : (
//           <Navbar />
//         )}

//         <div className="content">
//           <Routes>
//             {/* Public Pages */}
//             <Route path="/" element={<Home />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/signup" element={<Signup />} />
//             <Route path="/counsellor-sessions" element={<CounsellorSessions />} />
//             <Route path="/appointment" element={<AppointmentPage />} />
//             <Route path="/resource-hub" element={<ResourceHub />} />
//             <Route path="/forms" element={<Forms />} />
//             <Route path="/group-chat" element={<GroupChat />} />

//             {/* Teacher Protected Pages */}
//             <Route
//               path="/teacher-home"
//               element={
//                 <ProtectedRoute allowedRole="teacher">
//                   <TeacherHome />
//                 </ProtectedRoute>
//               }
//             />

//             {/* Student Protected Pages */}
//             <Route
//               path="/dashboard"
//               element={
//                 <ProtectedRoute allowedRole="student">
//                   <Dashboard />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/dashboard/dear-diary"
//               element={
//                 <ProtectedRoute allowedRole="student">
//                   <DearDiary />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/dashboard/mood-tracker"
//               element={
//                 <ProtectedRoute allowedRole="student">
//                   <MoodTracker />
//                 </ProtectedRoute>
//               }
//             />

//             {/* Catch all */}
//             <Route path="*" element={<Navigate to="/" replace />} />
//           </Routes>
//         </div>

//         <Footer />
//       </div>
//     </Router>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";  // ✅ use context
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

// Components inside Dashboard
import DearDiary from "./Components/DearDiary";
import MoodTracker from "./Components/MoodTracker";

import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  const { user, role } = useAuth();   // ✅ directly from context

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
