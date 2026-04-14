import { RouterProvider } from "react-router-dom";
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "./store/store.js";

import Main from "./pages/auth/Main.jsx";
import Login ,{loginAccount} from "./pages/auth/Login.jsx";
import Register, {createAccountAction} from "./pages/auth/Register.jsx";
import ResetPassword from "./pages/auth/ResetPassword.jsx";
import ForgotPassword from "./pages/auth/ForgotPassword.jsx";

import User from "./pages/user/User.jsx";
import Home from "./pages/user/Home.jsx";
import Favorites from "./pages/user/Favorites.jsx";
import MyBooking from "./pages/user/MyBooking.jsx";
import ServiceDetails from "./pages/user/ServiceDetails.jsx";
import ViewProfile from "./pages/user/ViewProfile.jsx";
import BookService from "./pages/user/BookService.jsx";
import UserProfile from "./pages/user/UserProfile.jsx";
import EditUserProfile ,{editUserProfileAction} from "./pages/user/EditUserProfile.jsx";
import ReviewPage from "./pages/user/ReviewPage.jsx";
import userMiddleware from "./middleware/userMiddleware.js" 

import ServiceProvider from "./pages/provider/ServiceProvider.jsx";
import CreateService,{createServiceAction} from "./pages/provider/CreateService.jsx";
import MyService from "./pages/provider/MyService.jsx";
import EditMyService,{editServiceAction} from "./pages/provider/EditMyService.jsx";
import ProviderProfile from "./pages/provider/ProviderProfile.jsx";
import EditProviderProfile,{editProviderProfileAction} from "./pages/provider/EditProviderProfile.jsx";
import ServiceRequest from "./pages/provider/ServiceRequest.jsx";
import providerMiddleware from "./middleware/providerMiddleware.js"


import './index.css'
import App from './App.jsx'

const router = createBrowserRouter([
    {
      path: "/",
      Component: App,
      children: [
        { path: "" , Component: Main},
        { path: "login", Component: Login, action:loginAccount }, 
        { path: "register" , Component: Register , action:createAccountAction},
        { path: "forget-password" , Component: ForgotPassword},
        { path: "reset-password/:token" , Component: ResetPassword},
      ],
    },

    {
      path: "/user", Component: User, loader: userMiddleware,
      children: [
        {path: "", Component: Home},
        {path: "favorites", Component: Favorites},
        {path: "booking", Component: MyBooking},
        {path: "booking/review/:id", Component: ReviewPage},
        {path: "service/detail/:id", Component: ServiceDetails},
        {path: "provider/profile/:id", Component: ViewProfile},
        {path: "book/service/:id", Component: BookService},
        {path: "profile",Component: UserProfile,},
        {path: "profile/edit",Component: EditUserProfile, action: editUserProfileAction}
      ]
    },

    {
      path: "/provider", Component: ServiceProvider, loader: providerMiddleware,
      children: [
        {path: "", Component: MyService},
        {path: "create", Component: CreateService, action: createServiceAction},
        {path: "edit/:id",Component: EditMyService, action: editServiceAction},
        {path: "service/request", Component: ServiceRequest},
        {path: "profile",Component: ProviderProfile,},
        {path: "profile/edit",Component: EditProviderProfile, action: editProviderProfileAction}
      ]
    },
  ]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <Toaster position="top-right" />
    <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
