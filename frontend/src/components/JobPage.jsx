import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import JobSidebar from "./JobSidebar";
import JobCard from "./JobCard";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const JobPage = () => {
    const { allJobs, searchQuery } = useSelector((state) => state.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);
    useEffect(() => {
        if (searchQuery) {
            const filteredJob = allJobs?.filter((job) => {
                return job?.location
                    .toLowerCase()
                    .includes(searchQuery?.toLowerCase());
            });
            setFilterJobs(filteredJob);
        } else {
            setFilterJobs(allJobs);
        }
    }, [allJobs, searchQuery]);
    return (
        <>
            <Navbar
                Option={true}
                loginOption={true}
            />
            <div className="flex w-full h-[100vh] overflow-hidden bg-gray-200 px-[100px] pt-[100px] pb-4">
                <JobSidebar />
                <div className="grid w-full h-full overflow-y-auto rounded-md grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 ml-5 ">
                    {filterJobs.length <= 0 ? (
                        <span className=" flex p-3 items-center justify-center text-[18px] font-semibold bg-white w-fit h-fit rounded-full">
                            No job Available
                        </span>
                    ) : (
                        filterJobs.map((item) => {
                            return (
                                <>
                                    <motion.div
                                        key={item._id}
                                        initial={{ opacity: 0, x: 100 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <JobCard item={item} />
                                    </motion.div>
                                </>
                            );
                        })
                    )}
                </div>
            </div>
        </>
    );
};

export default JobPage;
