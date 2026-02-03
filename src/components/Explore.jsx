import { useState, useEffect, useContext } from "react";
import "./Explore.css";
import { IoSearchSharp } from "react-icons/io5";
import Card from "./Card";
import Pagination from "./Pagination";
import ConfirmationModal from "./ConfirmationModal";
import ModeContext from "../context/ModeContext";

const Explore = () => {
  const [postdata, setPostdata] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterPost, setFilterPost] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [showForm, setShowForm] = useState(false);
  const [postId, setPostId] = useState();
   const [showModal, setShowModal] = useState(false);
   const loggedInUserData = JSON.parse(localStorage.getItem("loginData")) || {};
   const ctx=useContext(ModeContext)
     console.log(ctx,"context value");
     
   
  const [explorePostFormData, setExlorePostFormData] = useState({
    title: "",
    body: ""
  });
  const [errors, setErrors] = useState({});

  // 1.  GET DATA FUNCTION
  const getCreatePostData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://696b4a94624d7ddccaa0b731.mockapi.io/createPostData",
        { method: "GET" } 
      );

      if (!response.ok) throw new Error("Invalid Request");

      const data = await response.json();
      const reversedData = [...data].reverse();
      
      setPostdata(reversedData);
      setFilterPost(reversedData); 
      setIsLoading(false);
    } catch (error) {
      console.error("Get API Error:", error.message);
      setIsLoading(false);
    }
  };

  
  useEffect(() => {
    getCreatePostData();
  }, []);

  const createPost = async () => {
    try {
      const response = await fetch(
        "https://696b4a94624d7ddccaa0b731.mockapi.io/createPostData",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: explorePostFormData.title,
            body: explorePostFormData.body,
            image: `https://picsum.photos/seed/${Date.now()}/600/400`
          })
        }
      );

      if (!response.ok) throw new Error("Invalid Request");

      const newPost = await response.json();

      setPostdata([newPost, ...postdata]);
      setFilterPost([newPost, ...filterPost]);

      alert("Post Added Successfully");
      setExlorePostFormData({ title: "", body: "" });
      setShowForm(false);
    } catch (error) {
      console.error("Submit Error:", error.message);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    setCurrentPage(1);
    const result = postdata.filter(
      (item) =>
        item.title.toLowerCase().includes(value.toLowerCase()) ||
        item.body.toLowerCase().includes(value.toLowerCase())
    );
    setFilterPost(result);
  };

  const handleChange = (field, value) => {
    setErrors((prev) => ({ ...prev, [field]: "" }));
    setExlorePostFormData({ ...explorePostFormData, [field]: value });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    
    const newErrors = {};
    if (!explorePostFormData.title.trim()) newErrors.title = "Title is required";
    if (!explorePostFormData.body.trim()) newErrors.body = "Body is required";
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    try {
      setIsLoading(true);
   
      const url = postId
        ? `https://696b4a94624d7ddccaa0b731.mockapi.io/createPostData/${postId}`
        : `https://696b4a94624d7ddccaa0b731.mockapi.io/createPostData`;
  
      const response = await fetch(url, {
        method: postId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: explorePostFormData.title,
          body: explorePostFormData.body,
        
          image: postId ? undefined : `https://picsum.photos/seed/${Date.now()}/600/400`,
        }),
      });
  
      if (!response.ok) throw new Error("Request failed");
  
      const updatedPost = await response.json();
       alert(postId ? "Post Updated Successfully" : "Post Created Successfully");
      
       
  
      getCreatePostData();
      setShowForm(false);
      setPostId(null);
      setExlorePostFormData({ title: "", body: "" });
    } catch (error) {
      console.error("Submit Error:", error.message);
      alert("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  const postDataGetById = async (id) => {
    try {
      setIsLoading(true);
      setPostId(id);
      const response = await fetch(
        `https://696b4a94624d7ddccaa0b731.mockapi.io/createPostData/${id}`,
        { method: "GET" }
      );
      
      if (!response.ok) {
        throw new Error("Failed to fetch post by ID");
      }
      
      const data = await response.json();
  
   
      setExlorePostFormData({
        title: data.title || "",
        body: data.body || "",
      });
  
      setShowForm(true);
    } catch (error) {
      console.error("GET BY ID API Error:", error.message);
    } finally {
      setIsLoading(false);
    }
  };



  
  //  DELETE 
  const openDeleteModal = (id) => {
    setPostId(id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://696b4a94624d7ddccaa0b731.mockapi.io/createPostData/${postId}`,
        { method: "DELETE" }
      );
      if (response.ok) {
        alert("Post Deleted Successfully");
        getCreatePostData();
      }
    } catch (error) {
      console.error("Delete Error:", error.message);
    } finally {
      setShowModal(false);
      setPostId(null);
      setIsLoading(false);
    }
  };

  const startIndex = (currentPage - 1) * postsPerPage;
  const totalPage = Math.ceil(filterPost.length / postsPerPage);

  return (
    <div className={`explore-page ${ctx.mode==="dark"? "nav-dark":"nav-light"}`}>
      <div className="explore-header">
        <h1>Explore Posts</h1>
        <div className="search-box">
          <IoSearchSharp className="search-icon" />
          <input
            type="text"
            placeholder="Search Post..."
            value={search}
            onChange={handleSearch}
          />
        </div>
      </div>

      {!showForm && loggedInUserData?.role==="Admin" && (
        <button
          type="button"
          className="createform"
          onClick={() => setShowForm(true)}
        >
          Create Form
        </button>
      )}

      {showForm && (
        <form className="explore-add" onSubmit={handleSubmit}>
          <div className="explore-adddata">
            <input
              type="text"
              name="title"
              placeholder="Enter Title"
              className="explore-input"
              value={explorePostFormData.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
            {errors.title && <span className="error-text">{errors.title}</span>}

            <textarea
              name="body"
              placeholder="Enter Body"
              className="explore-input"
              value={explorePostFormData.body}
              onChange={(e) => handleChange("body", e.target.value)}
            />
            {errors.body && <span className="error-text">{errors.body}</span>}
          </div>

          <div className="btn-explore">
             <button type="submit" className="btn btn1-explore">{postId ? "Update" : "Submit" }</button>
            <button
              type="button"
              className="btn btn2-explore"
              onClick={() => {
                setShowForm(false);
                setErrors({});
                setExlorePostFormData({ title: "", body: "" });
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="explore-container">
        {isLoading ? (
          <div className="loading-state">
            <h1>Loading....</h1>
          </div>
        ) : filterPost.length > 0 ? (
          filterPost
            .slice(startIndex, startIndex + postsPerPage)
            .map((item) => (
              <Card
                key={item.id}
                title={item.title}
                desc={item.body}
                image={item.image}
                id={item.id}
                from="explore"
                onDelete={()=>openDeleteModal(item?.id)}
                onEdit={()=>postDataGetById(item.id)}
              />
            ))
        ) : (
          <div className="no-post">
            <p>No matching posts found "{search}"</p>
          </div>
        )}
      </div>

      {filterPost.length > 0 && !isLoading && (
        <Pagination
          currentPage={currentPage}
          totalPage={totalPage}
          onPrev={() => setCurrentPage(currentPage - 1)}
          onNext={() => setCurrentPage(currentPage + 1)}
          postsPerPage={postsPerPage}
          setPostsPerPage={setPostsPerPage}
        />
      )}
      {showModal && (
                <ConfirmationModal
                    titlemodal="Delete Post?"
                    descmodal="Are you sure you want to delete this post?"
                    onClose={() => {setShowModal(false); setPostId(null)}}
                    onConfirm={handleDelete}
                    confirmBtnText="Delete"
                />
            )}
    </div>



  );
};

export default Explore;