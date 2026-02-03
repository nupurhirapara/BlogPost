import "./Login.css";
import React, { useState } from "react";
import loginimg from '../assets/login.jpg'
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import OtpInput from 'react-otp-input';




const Login = () => {
  
  
  const[phone,setPhone]=useState("");
    const[otp,setOtp]=useState("");
    const[role,setRole]=useState("");
    const[generateOtp,setGenerateOtp]=useState("");

    const [submittedData,setSubmittedData] = useState([]);
    const navigate=useNavigate()
    const random=Math.floor(1000 + Math.random() * 9000);

    const[phoneValidation,setPhoneValidation]=useState("");
    const[otpValidation,setOtpValidation]=useState("");
    const[roleValidation,setRoleValidation]=useState("");

    const [isLoading, setIsLoading] = useState(true);

  const handlePhoneChange=(event)=>{
    console.log(event.target.value);
    setPhone(event.target.value);
}
const handleOtpChange=(event)=>{
  setOtp(random.toString());
  setGenerateOtp(random.toString());
  alert("One Time Password:"+random);
    console.log(event.target.value);
    
}
const selectRoleValue = (e) => {
  console.log(e.target.value);   
  setRole(e.target.value);
};


const handleSubmit = async (event) => {
 
    event.preventDefault();
    if(generateOtp != otp)
    {
      toast.error("Invalid OTP");
      return;
    }
     if(!phone){
        setPhoneValidation("Phone no. is required");
    }
    
     if(!role){
        setRoleValidation("Role is required");
    }

     if(!otp){
        setOtpValidation("OTP is required");
    }

    if( !phone ||  !role || !otp ){
    
        return;
      
    }

    const formData = { phone, role, otp };
    
    
    
      try {
        // First, GET all users to see if they exist
        const res = await fetch('https://696b4a94624d7ddccaa0b731.mockapi.io/users');
        const users = await res.json();
        
        const existingUser = users.find(u => u.phone === phone && u.role === role);
    
        if (existingUser) {
          toast.success("Login Successful");
          localStorage.setItem("loginData", JSON.stringify(existingUser));
          navigate("/");
        } else {
          // ONLY POST if the user doesn't exist
          const saveRes = await fetch('https://696b4a94624d7ddccaa0b731.mockapi.io/users', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phone, role })
          });
          const newUser = await saveRes.json();
          toast.success("Account Created & Logged In");
          localStorage.setItem("loginData", JSON.stringify(newUser));
          navigate("/");
        }
      } catch (err) {
        toast.error("Server Error");
      }
    };

  return (
    <>
    
<div className="main">
<ToastContainer/>
  <div className="container-img">
   
      <img src={loginimg} className="login-img"></img>
  </div>
  <div className="container-login">
      <h2 className="title-login">Hello Again,</h2>
      <h3 className="subtitle-login">Welcome Back, Let's Get Started !!</h3>     
  
    <form onSubmit={handleSubmit}>
        <input type="tel"
          placeholder="Mobile Number"
          className="textbox-login" onChange={handlePhoneChange} value={phone}
         minLength={10} maxLength={10}
        />
        {phoneValidation && (<p className="error">{phoneValidation}</p>)}

        <select className="textbox-login" value={role} onChange={selectRoleValue}>
        <option value="">Select a Role</option>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
        </select>
         {roleValidation && (<p className="error">{roleValidation}</p>)}

        <button type="button" className="btn-login" onClick={handleOtpChange}>Generate OTP</button>
         

        <div className="otp-container-wrapper">
                        <label>Enter 4-Digit OTP</label>
                        <OtpInput
                            value={otp}
                            onChange={setOtp} // Receives value directly, not event
                            numInputs={4}
                            renderSeparator={<span className="otp-separator">-</span>}
                            renderInput={(props) => <input {...props} className="otp-input-field" />}
                            shouldAutoFocus={true}
                        />
                    </div>
                    {otpValidation && <p className="error">{otpValidation}</p>}
        <button  type="submit" className="btn-login1">Login</button>

        </form>
      </div>
 
</div>
      
    </>
  );
}

export default Login;
