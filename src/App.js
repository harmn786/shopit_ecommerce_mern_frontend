import React from 'react';
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import {Toaster} from 'react-hot-toast';
import {BrowserRouter as Router,Routes} from "react-router-dom";
import './App.css'; // Assuming you have some global styles
import UserRoutes from "./components/routes/UserRoutes";
import AdminRoutes from './components/routes/AdminRoutes';
function App() {
  const userRoutes = UserRoutes()
  const adminRoutes = AdminRoutes()
  return (
    <Router>
    <div className="App">
      <Toaster position="top-center"/>
      <Header />
       <div className="container">
        <Routes>
         {userRoutes}
         {adminRoutes}
        </Routes>
     
      </div>
      <Footer />
    </div>
    </Router>
  );
}

export default App;
