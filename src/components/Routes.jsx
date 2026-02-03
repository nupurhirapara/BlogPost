import React from "react";
import { createBrowserRouter } from "react-router-dom";
import HomePage from '../pages/HomePage';
import CreatePostPage from "../pages/CreatePostPage";
import LoginPage from '../pages/LoginPage'
import RootLayout from "../pages/RootLayout";
import PostDetail from "./PostDetail";
import AuthGuard from "../guard/AuthGuard";
import NotFound from "./NotFound";
import ExplorePosts from "../pages/ExplorePosts";

 const router=createBrowserRouter([
    
    {
        path:"Login",
        element:<LoginPage/>
    },
    {
        path:"/",
        element:<AuthGuard/>,
        children:[
        {
            path:"/",
            element:<HomePage/>
        },
        {
            path:"CreatePostPage",
            element:<CreatePostPage/>
        },
        {
            path:"/post/:postId",
            element:<PostDetail/>
        },
        {
            path:"*",
            element:<NotFound/>,
        },
        {
            path:"/ExplorePosts",
            element:<ExplorePosts/>,
        },
    ],
},

]);
export default router;
