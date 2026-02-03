import React, { useContext, useState } from "react";
import "./Navbar.css";
import icon from "../assets/icon3.png";
import { NavLink, useNavigate } from "react-router-dom";
import ConfirmationModal from "./ConfirmationModal";
import EditProfileModal from "./EditProfileModal"; // Create this file next
import { toast, ToastContainer } from "react-toastify";
import ModeContext from "../context/ModeContext";

const Navbar = () => {
  const loggedInUserData = JSON.parse(localStorage.getItem("loginData")) || {};
  const navigate = useNavigate();
  const ctx=useContext(ModeContext)
  console.log(ctx,"context value");
  
  
  // States for two different modals
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("loginData");
    setShowLogoutModal(false);
    toast.success("Logout Successfully!");
    setTimeout(() => navigate("/Login"), 2000);
  };

  const handleSaveProfile = (data) => {
    console.log("Updated Data:", data);
    setShowEditModal(false);
    toast.info("Profile update logic goes here!");
  };

  return (
    <>
      <ToastContainer />
      <div className={`container ${ctx.mode=="dark"? "nav-dark":"nav-light"}`}> 
        <h1 className="logo">BlogPost</h1>

        <div className="menubar">
          <NavLink to="/" className={({ isActive }) => isActive ? "menu active" : "menu"}>Home</NavLink>
          
          {loggedInUserData?.role === "Admin" && (
            <NavLink to="/CreatePostPage" className={({ isActive }) => isActive ? "menu active" : "menu"}>New Post</NavLink>
          )}
          
          <NavLink to="/ExplorePosts" className={({ isActive }) => isActive ? "menu active" : "menu"}>Explore Post</NavLink>

          <p className="menu" onClick={() => setShowLogoutModal(true)}>Logout</p>
        </div>

        <div className="theme">
         
          <img src={icon} className="theme-icon" alt="theme" />
          <span onClick={ctx.toggleMode}>{ctx.mode === "dark" ? "Light" : "Dark"}</span>


          
          
          <div className="admin" onClick={() => setShowEditModal(true)} style={{cursor: 'pointer'}}>
            {loggedInUserData?.role === "Admin" ? "A" : "U"}
          </div>
        </div>
      </div>

      {/* --- MODALS --- */}

      {/* Logout Modal */}
      {showLogoutModal && (
        <ConfirmationModal
          titlemodal="Logout?"
          descmodal="You are about to log out, are you sure?"
          onClose={() => setShowLogoutModal(false)}
          onConfirm={handleLogout}
          confirmBtnText="Logout"
        />
      )}

      {/* Edit Profile Modal */}
      {showEditModal && (
        <EditProfileModal
          onClose={() => setShowEditModal(false)} 
          onSave={handleSaveProfile}
          userId={loggedInUserData?.id}
        />
      )}
    </>
  );
};

export default Navbar;