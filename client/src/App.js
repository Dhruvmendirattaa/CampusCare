// // // import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// // // import Navbar from "./Components/navbar";
// // // import Footer from "./Components/Footer";
// // // import Home from "./pages/Home";
// // // import Login from "./pages/login";
// // // import Signup from "./pages/signup"; // <-- Signup import kiya
// // // import CounsellorSessions from "./pages/CounsellorSessions";
// // // import Dashboard from "./pages/Dashboard";
// // // import Forms from "./pages/Forms"; 


// // // function App() {
// // //   return (
// // //     <Router>
// // //       <div className="app-container">
// // //         <Navbar />
// // //         <div className="content">
// // //           <Routes>
// // //             <Route path="/" element={<Home />} />
// // //             <Route path="/login" element={<Login />} />
// // //             <Route path="/counsellor-sessions" element={<CounsellorSessions/>}/>
// // //             <Route path="/dashboard" element={<Dashboard/>}/>
// // //             <Route path="/signup" element={<Signup/>}/>
// // //             <Route path="/Forms" element={<Forms />} /> 
            
            
            
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
// // import DearDiary from "./Components/DearDiary";
// // import MoodTracker from "./Components/MoodTracker";
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
// import Footer from "./Components/Footer";
// import Home from "./pages/Home";
// import Login from "./pages/login";
// import Signup from "./pages/signup";
// import CounsellorSessions from "./pages/CounsellorSessions";
// import Dashboard from "./pages/Dashboard";
// import AppointmentPage from "./pages/appointmentBooking";
// import ResourceHub from "./pages/resourceHub";
// import Forms from "./pages/Forms"; 
// import DearDiary from "./Components/DearDiary";
// import MoodTracker from "./Components/MoodTracker";
// // agar react-icons use karna ho toh neeche wali line hata do
// import "@fortawesome/fontawesome-free/css/all.min.css";

// function App() {
//   return (
//     <Router>
//       <div className="app-container">
//         <Navbar />
//         <div className="content">
//           <Routes>
//             {/* Main Pages */}
//             <Route path="/" element={<Home />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/signup" element={<Signup />} />
//             <Route path="/counsellor-sessions" element={<CounsellorSessions />} />
//             <Route path="/appointment" element={<AppointmentPage />} />
//             <Route path="/resource-hub" element={<ResourceHub />} />
//             <Route path="/forms" element={<Forms />} /> 

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


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/navbar";
import TeacherNavbar from "./Components/TeacherNavbar";
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
import TeacherLogin from "./pages/TeacherLogin";

// ...



import DearDiary from "./Components/DearDiary";
import MoodTracker from "./Components/MoodTracker";

import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  const role = localStorage.getItem("role"); 
  return (
    <Router>
      <div className="app-container">
        {role === "teacher" ? <TeacherNavbar /> : <Navbar />}
        <div className="content">
          <Routes>
            {/* Main Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/teacher-login" element={<TeacherLogin/>}/>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/counsellor-sessions" element={<CounsellorSessions />} />
            <Route path="/appointment" element={<AppointmentPage />} />
            <Route path="/resource-hub" element={<ResourceHub />} />
            <Route path="/forms" element={<Forms />} /> 
            <Route path="/group-chat" element={<GroupChat />} />

            {/* Dashboard + Sub Pages */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/dear-diary" element={<DearDiary />} />
            <Route path="/dashboard/mood-tracker" element={<MoodTracker />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
