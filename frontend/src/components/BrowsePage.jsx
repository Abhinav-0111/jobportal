import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import JobCard from "./JobCard";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../redux/jobSlice";
import useGetAllJobs from "../hooks/useGetAllJobs";
import { motion } from "framer-motion";

const BrowsePage = () => {
    const { allJobs } = useSelector((state) => state.job);
    const dispatch = useDispatch();
    useGetAllJobs();
    useEffect(() => {
        return () => {
            dispatch(setSearchQuery(""));
        };
    }, []);
    return (
        <>
            <Navbar
                Option={true}
                loginOption={true}
            />
            <div className="flex w-full h-[100vh] overflow-hidden bg-gray-200 flex-col px-[120px] pt-[100px]">
                <h1 className="font-bold text-[18px]">
                    Search Results ({allJobs.length})
                </h1>
                <div className="flex w-full h-full mt-[20px] px-[80px]">
                    <div className="grid w-full h-full overflow-y-auto rounded-md grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 overflow-x-hidden pb-[75px]">
                        {allJobs?.map((item, index) => {
                            return (
                                <>
                                    <motion.div
                                        key={item?._id}
                                        initial={{ opacity: 0, x: 100 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <JobCard item={item} />
                                    </motion.div>
                                </>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default BrowsePage;
