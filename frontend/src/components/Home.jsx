import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import HeroSection from "./HeroSection";
import CategoryCarasul from "./CategoryCarasul";
import LatestJob from "./LatestJob";
import Footer from "./Footer";
import useGetAllJobs from "../hooks/useGetAllJobs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchQuery } from "../redux/jobSlice";

const Home = () => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (user?.role === "recruiter") {
            navigate("/admin/companies");
        }
    }, []);
    useGetAllJobs();
    return (
        <>
            <div className="flex flex-col w-full h-[100vh] overflow-x-hidden">
                <Navbar
                    Option={true}
                    loginOption={true}
                />
                <HeroSection />
                <CategoryCarasul />
                <LatestJob />
                <Footer />
            </div>
        </>
    );
};

export default Home;
