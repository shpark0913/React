import React from "react";
import NavBar from "./components/views/NavBar/NavBar";
import Footer from "./components/views/Footer/Footer";

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"

import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage"
// import NavBar from "./components/views/NavBar/NavBar"
// import Footer from "./components/views/Footer/Footer"

function App() {
  return (
    <Router>
      <NavBar></NavBar>
      <div>
        <Routes>
          <Route exact path="/" element={<LandingPage />}></Route>
          <Route exact path="/login" element={<LoginPage />}></Route>
          <Route exact path="/register" element={<RegisterPage />}></Route>
        </Routes>
      </div>
      <Footer></Footer>
    </Router>
  );
}

export default App;
