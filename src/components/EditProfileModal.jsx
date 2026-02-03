import React, { useEffect, useState } from 'react';
import './EditProfileModal.css';

const EditProfileModal = ({ onClose, onSave, userId }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: "",        
        phone: "",
        role: "",
        otp: ""
    });

    useEffect(() => {
        if (userId) {
            fetchUserById();
        }
    }, [userId]);

    const fetchUserById = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(
                `https://696b4a94624d7ddccaa0b731.mockapi.io/users/${userId}`
            );

            if (!response.ok) throw new Error("Invalid Request");

            const data = await response.json();
            
           
            setFormData({
                name: data?.name || "",
                phone: data?.phone || "",
                role: data?.role || "",
                otp: data?.otp || ""
            });
              
        } catch (error) {
            console.error("Fetch User Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

   
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "phone" && !/^\d*$/.test(value)) return;

        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        const payload = {
          name: formData.name,
          phone: formData.phone
        };
      
        await fetch(
          `https://696b4a94624d7ddccaa0b731.mockapi.io/users/${userId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
          }
        );
      
        
        const storedUser = JSON.parse(localStorage.getItem("loginData")) || {};
      
        const updatedUser = {
          ...storedUser,
          ...payload
        };
      
        localStorage.setItem("loginData", JSON.stringify(updatedUser));
      
        onSave(updatedUser);
        onClose();
    };

    return (
        <div className='modal-backdrop'>
            <div className='modal'>
                <h2>Edit Profile</h2>
                <form className="modal-form" onSubmit={(e) => e.preventDefault()}>
                    <div className="input-group">
                        <input 
                            type="text" 
                            name="name" 
                            className="textbox-login" 
                            placeholder="Full Name" 
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-group">
                        <input
                            type="tel"
                            className="textbox-login"
                            name="phone"
                            maxLength="10"
                            pattern="[0-9]{10}"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-group">
                        <select 
                            name="role"
                            className="textbox-login" 
                            value={formData.role} 
                            disabled 
                        >
                            <option value="Admin">Admin</option>
                            <option value="User">User</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <input 
                            type="text" 
                            className="textbox-login" 
                            placeholder="OTP" 
                            value={formData.otp} 
                            disabled 
                        />
                    </div>

                    <div className='EditProfilemodal-actions'>
                        <button type="button" className='btn btn-cancel' onClick={onClose}>Cancel</button>
                        <button
                          type="button"
                          className="btn1 btn-save"
                          onClick={handleSave}
                          disabled={isLoading}
                        >
                          Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfileModal;
