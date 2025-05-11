import React, { useEffect } from "react";
import {useNavigate, useRoutes} from "react-router-dom";

import Login from "./components/authentication/Login"
import Signup from "./components/authentication/Signup";
import Dashboard from "./components/dashboard/Dashboard";
import Profile from "./components/user/Profile";
import AllUsers from "./components/user/Allusers";
import UpdateProfile from "./components/user/UpdateProfile";
import DeleteProfile from "./components/user/DeleteProfile";
import CreateRepo from "./components/repo/Createrepo"; 
import AllRepos from "./components/repo/Allrepo";
import CurrUserRepo from "./components/repo/Curruser";
import RepoById from "./components/repo/Repobyid";
import RepoByName from "./components/repo/Repobyname";
import UpdateRepo from "./components/repo/Updaterepo";
import DeleteRepo from "./components/repo/Deleterepo";



import {useAuth} from "./authContext";

const ProjectRoutes = ()=>{
    const {currentUser, setCurrentUser} = useAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        const userIdFromStorage = localStorage.getItem("userId");

        if(userIdFromStorage && !currentUser){
            setCurrentUser(userIdFromStorage);
        }

        if(!userIdFromStorage && !["/auth", "/signup"].includes(window.location.pathname)){
            navigate("/auth");
        }

        if(userIdFromStorage && window.location.pathname == "/auth"){
            navigate("/");
        }
    }, [currentUser, navigate, setCurrentUser]);

    let element = useRoutes([
        {
            path: "/",
            element: <Dashboard/>
        },
        {
            path: "/auth",
            element: <Login/>
        },
        {
            path: "/signup",
            element: <Signup/>
        },
        {
            path: "/profile",
            element: <Profile/>
        },
        {
            path: "/allUsers",
            element: <AllUsers />,
          },
          {
            path: "/updateProfile/:id",
            element: <UpdateProfile />,
          },
          {
            path: "/deleteProfile/:id",
            element: <DeleteProfile />,
          },
          {
            path: "/repo/create",  
            element: <CreateRepo />
         },
         {
            path: "/repo/all",  
            element: <AllRepos />
        },
        {
            path: "/repo/user/:userId",  
            element: <CurrUserRepo />
        },
        {
            path: "/repo/name/:name",  
            element: <RepoByName />
        },
        {
            path: "/repo/user/:userId",  
            element: <RepoById />
        },
        {
            path: "/repo/update/:id",  
            element: <UpdateRepo />
        },
        {
            path: "/repo/delete/:id",  
            element: <DeleteRepo />
        },
    ]);

    return element;
}

export default ProjectRoutes;