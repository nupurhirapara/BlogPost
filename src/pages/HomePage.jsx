import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';  
import { toast } from 'react-toastify';  
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import ConfirmationModal from "../components/ConfirmationModal";
import ExplorePosts from "./ExplorePosts";
import image from "../assets/react.svg"
import top_icon from "../assets/top-icon.png"
import ModeContext from "../context/ModeContext";



 function HomePage() {
    const allPostData = JSON.parse(localStorage.getItem("postData")) || [];
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const ctx=useContext(ModeContext)
  console.log(ctx,"context value");
    const navigate = useNavigate();  

    const scrollToSelection=(id)=>{
        const element=document.getElementById(id);
        if(element){
            element.scrollIntoView({behavior: 'smooth'});
        }
    };

    const handleDelete = () => {
        const updatedPostData = allPostData.filter((_, i) => i !== selectedIndex);
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

    const clickHandler=(id)=>{
        navigate(`/post/${id}`);
    };
     
    const handleEdit=(id)=>{
        console.log({id});
        
        navigate("/CreatePostPage",{state : {id}});
    };

    return (
        <>
        <div className={`home ${ctx.mode==="dark"? "nav-dark":"nav-light"}`}>
           <span id="top"></span>
            <h1 className="title">Created Posts</h1>
            <div className="card-container">
                {allPostData.length === 0 ? (
                    <p>No Posts Yet.</p>
                ) : (
                    allPostData.map((item, index) => (
                        <Card
                            key={index}
                            image={item.image}
                            title={item.title}
                            desc={item.body}
                            onDelete={() => openDeleteModal(index)}
                            onRedirect={()=>clickHandler(item.id)}
                            onEdit={()=>handleEdit(item.id)}
                        />
                    ))
                )}
            </div>
            <img src={top_icon} onClick={()=>{scrollToSelection('top')}} className="top-icon"></img>

            
            

            {showModal && (
                <ConfirmationModal
                    titlemodal="Delete Post?"
                    descmodal="Are you sure you want to delete this post?"
                    onClose={() => setShowModal(false)}
                    
                    onConfirm={handleDelete}
                    confirmBtnText="Delete"
                />
            )}
            </div>
        </>
    );
}

export default HomePage;