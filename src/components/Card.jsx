import React from "react";
import "./Card.css";


const Card = ({ onDelete, image, title, desc,onRedirect,onEdit }) => {
  const loggedInUserData = JSON.parse(localStorage.getItem("loginData")) || {};
  return (
    <div className="card" >
      {/* Image Header */}
      <div className="card-image" onClick={onRedirect}>
        <img src={image} alt={title} className="card-img" />
      </div>

      {/* Content */}
      <div className="card-content">
        <h1>{title}</h1>
        <p>{desc.length > 90 ?  desc.substring(0,90)+ "..." : desc}</p>
      </div>

      {/* Buttons */}
      {loggedInUserData?.role==="Admin" && (
      <div className="button">
        
        <button className="btn" onClick={onDelete}>Delete</button>
        <button className="btn1" onClick={onEdit}>Edit</button> 
      </div>
    )}
    </div>
  );
};

export default Card;
