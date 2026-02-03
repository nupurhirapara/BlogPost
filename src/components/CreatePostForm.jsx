import React, { useContext, useEffect, useState } from "react";
import "./CreatePostForm.css";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';
import Lottie from 'react-lottie';
import loader from "../assets/Insider-loading.gif"; 
import ModeContext from "../context/ModeContext";


function CreatePostForm() {
  const[createPostFormData,setCreatePostFormData]=useState({
    title: "",
    body:"",
    image:""
  });
  const[errors,setErrors]=useState({});
  const navigate = useNavigate();
  const location=useLocation();
  console.log(location,"Location Value");
  const ctx=useContext(ModeContext)
  console.log(ctx,"context value");
  
  const [loading, setLoading] = useState(false);

  const editPostId=location.state?.id || null;

  console.log(editPostId);
  
  

  const handleChange=(field,value)=>{
    console.log({field,value});
    //clear error msg when value is entered
    setErrors((e)=>({...e,[field]: "" })); //clear errors
    //store form value in state
    setCreatePostFormData({...createPostFormData, [field] : value});
  };
 
  console.log("Post Data::",createPostFormData);
  console.log("editPostId::",editPostId);

  useEffect(()=>{
    if(!editPostId)return;
    const posts=JSON.parse(localStorage.getItem("postData"))||[];
    const postToEdit=posts.find((p)=>p.id===editPostId);
    console.log(postToEdit,"Post Data")
    if(postToEdit){
      setCreatePostFormData({
        title:postToEdit.title,
        body:postToEdit.body,
        image:postToEdit.image,

      });
    }
  },[editPostId]);

  const handleImageChange=(file)=>{
    if(!file) return;
    console.log({file});

    //file upload validation
    const allowedTypes=["image/jpeg","image/jpg","image/png","image/webp","image/avif"];
    if(!allowedTypes.includes(file.type)){
      setErrors((e)=>({
        ...e,
        image:"Only JPG, JPEG, PNG, WEBP, AVIF images are allowed",
      }));
      return;
    }

    const reader = new FileReader();
    reader.onloadend=()=>{
      setCreatePostFormData({...createPostFormData,image:reader.result});
      setErrors((e)=>({ ...e,image:""}));
    };
    reader.readAsDataURL(file);
  };
  console.log(createPostFormData.image);

const handleSubmit = (e) => {
  e.preventDefault();

  // 1. Validation Logic
  const newErrors = {};
  if (!createPostFormData.title.trim()) newErrors.title = "Title is required";
  if (!createPostFormData.body.trim()) newErrors.body = "Body is required";
  if (!createPostFormData.image.trim()) newErrors.image = "Image is required";

  setErrors(newErrors);

  // Stop if validation fails
  if (Object.keys(newErrors).length > 0) return;

  setLoading(true);

  // 2. Get existing data AFTER validation
  const existingPosts = JSON.parse(localStorage.getItem("postData")) || [];

  if (editPostId) {
    // 3. EDIT MODE: Update existing post
    const updatedPosts = existingPosts.map((p) =>
      p.id === editPostId ? { ...p, ...createPostFormData } : p
    );
    localStorage.setItem("postData", JSON.stringify(updatedPosts));
    toast.success("Post Updated Successfully!");
  } else {
    // 4. CREATE MODE: Add new post with unique ID
    const newPost = { id: uuidv4(), ...createPostFormData };
    const updatedPosts = [...existingPosts, newPost];
    localStorage.setItem("postData", JSON.stringify(updatedPosts));
    toast.success("Post Added Successfully!");
  }
  setTimeout(() => {
    setLoading(false);
    navigate("/");
  }, 1500);
  

}; 


 

 

  return (
    <>
    <div className={`home ${ctx.mode==="dark"? "nav-dark":"nav-light"}`}> 
      <h1 className="title-post">{editPostId? "Edit Post" : "Let's Create New Post"}</h1>

      {loading && (
  <div className="loader-overlay">
    <img src={loader} alt="Loading..." className="loader-img" />
  </div>
)}


      <form onSubmit={handleSubmit}>
      <div className="container-post">
        <input
          type="text"
          placeholder="Enter Title"
          className="textbox-post"
          value={createPostFormData.title}
          onChange={(e)=> handleChange("title",e.target.value)}
        />
        {errors.title && <span className="error">{errors.title}</span>}

        <textarea
          placeholder="Enter Description"
          className="textbox-area"
          value={createPostFormData.body}
          onChange={(e)=> handleChange("body",e.target.value)}
        />
        {errors.body && <span className="error">{errors.body}</span>}
       

        <input
          type="file"
          className="textbox-post"
          placeholder="Enter Image"
          accept="image/jpeg,image/png,image/png,image/webp,image/avif"
          onChange={(e)=> handleImageChange(e.target.files[0])}
        />
         {errors.image && <span className="error">{errors.image}</span>}

         {createPostFormData.image && (
          <img  src={createPostFormData.image}
          alt="Preview"
          />
         )}

         <div className="btn-post">
  {/* Only show the Cancel button if editPostId exists */}
  {editPostId && (
    <button  type="button"  className="cancel-btn"  onClick={() => navigate("/")} >Cancel </button>
  )}

  <button type="submit" className="update-btn"> {editPostId ? "Update Post" : "Add Post"}</button>
        </div>

      </div>
      </form>
       </div> 
    </>
  );
}

export default CreatePostForm;
