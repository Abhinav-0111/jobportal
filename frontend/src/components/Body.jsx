import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import Login from "../auth/Login";
import Signup from "../auth/Signup";
import JobPage from "./JobPage";
import BrowsePage from "./BrowsePage";
import Profile from "./Profile";
import Description from "./Description";
import ProtectedRoute from "../services/protectedRoute";
import AdminJob from "../adminComponent/AdminJob";
import AdminCompany from "../adminComponent/AdminCompany";
import CreateCompany from "../adminComponent/CreateCompany";
import CompanySetup from "../adminComponent/CompanySetup";
import PostJob from "../adminComponent/PostJob";
import Applicants from "../adminComponent/Applicants";
import ProtectedRouteAdmin from "../adminComponent/ProtectedRouteAdim";

const Body = () => {
    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/signup",
            element: <Signup />,
        },
        {
            path: "/jobs",
            element: (
                <ProtectedRoute>
                    <JobPage />
                </ProtectedRoute>
            ),
        },
        {
            path: "/browse",
            element: (
                <ProtectedRoute>
                    <BrowsePage />
                </ProtectedRoute>
            ),
        },
        {
            path: "/profile",
            element: (
                <ProtectedRoute>
                    <Profile />
                </ProtectedRoute>
            ),
        },
        {
            path: "/description/:id",
            element: (
                <ProtectedRoute>
                    <Description />
                </ProtectedRoute>
            ),
        },
        {
            path: "/admin/jobs",
            element: (
                <ProtectedRouteAdmin>
                    <AdminJob />
                </ProtectedRouteAdmin>
            ),
        },
        {
            path: "/admin/companies",
            element: (
                <ProtectedRouteAdmin>
                    <AdminCompany />
                </ProtectedRouteAdmin>
            ),
        },
        {
            path: "/admin/companies/create",
            element: (
                <ProtectedRouteAdmin>
                    <CreateCompany />
                </ProtectedRouteAdmin>
            ),
        },
        {
            path: "/admin/companies/:id",
            element: (
                <ProtectedRouteAdmin>
                    <CompanySetup />
                </ProtectedRouteAdmin>
            ),
        },
        {
            path: "/admin/job/create",
            element: (
                <ProtectedRouteAdmin>
                    <PostJob />
                </ProtectedRouteAdmin>
            ),
        },
        {
            path: "/admin/job/:id/applicants",
            element: (
                <ProtectedRouteAdmin>
                    <Applicants />
                </ProtectedRouteAdmin>
            ),
        },
    ]);
    return (
        <>
            <RouterProvider router={appRouter} />
        </>
    );
};

export default Body;
