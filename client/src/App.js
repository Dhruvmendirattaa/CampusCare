import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/navbar";
import Footer from "./Components/Footer";
import Home from "./pages/Home";
import Login from "./pages/login";
import CounsellorSessions from "./pages/CounsellorSessions";
import Dashboard from "./pages/Dashboard";
import Forms from "./pages/Forms"; 


function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/counsellor-sessions" element={<CounsellorSessions/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/Forms" element={<Forms />} /> 
            
            
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
