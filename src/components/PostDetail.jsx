import "./PostDetail.css"
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmationModal from "./ConfirmationModal";
import { toast } from "react-toastify";




const PostDetail = ()=>{
    const allPostData = JSON.parse(localStorage.getItem("postData")) || [];
    const loggedInUserData = JSON.parse(localStorage.getItem("loginData")) || {};
        const [selectedIndex, setSelectedIndex] = useState(null);
        const [showModal, setShowModal] = useState(false);

        const{postId}=useParams();
        const[currentPost,setCurrentPost]=useState({});

        const navigate = useNavigate();  
    
        const handleDelete = () => {
            
            const updatedPostData = allPostData.filter(post=>String(post.id)!==String(postId));
            console.log(updatedPostData, "updatedData");
    
            localStorage.setItem("postData", JSON.stringify(updatedPostData));
            setShowModal(false);
            toast.success("Post Deleted Successfully!");
    
            setTimeout(() => {
                navigate("/");  
            }, 2000);
        };
    
        const openDeleteModal = (index) => {
            console.log(index, "Index");
            setSelectedIndex(index);
            setShowModal(true);
    
            
        };
    
        
        useEffect(()=>{
          const filtered=allPostData.find(item=>String(item.id)===String(postId));

          console.log({allPostData,postId,filtered});

          if(filtered) setCurrentPost(filtered);
          
        },[postId,localStorage]);

        const handleEdit = () => {
          
          navigate("/CreatePostPage", { state: { id: currentPost.id } });
        };
  
  return (
    <>
    <div className="main-post-card">
  <div className="post-card">
    
    {/* Left Image */}
    <div className="post-card-image">
      <img
        src={currentPost.image}
        alt={currentPost.title}
        className="post-card-img"
      />
    </div>

    {/* Right Content */}
    <div className="post-card-content">
      <h1>{currentPost.title}</h1>
      <p>{currentPost.body}</p>

      {/* Buttons */}
      {loggedInUserData?.role==="Admin" && (
      <div className="post-card-buttons">
        <button className="btn" onClick={openDeleteModal}>Delete</button>
        <button className="btn1" onClick={handleEdit}>Edit</button>
      </div>
    )}
    </div>

  </div>
</div>


    {showModal && (
                <ConfirmationModal
                    titlemodal="Delete Post?"
                    descmodal="Are you sure you want to delete this post?"
                    onClose={() => setShowModal(false)}
                    onConfirm={handleDelete}
                    confirmBtnText="Delete"
                />
            )}
    </>
  );
};

export default PostDetail;
