import React from "react";
import LatestCard from "./LatestJobCard";
import { useSelector } from "react-redux";

const LatestJob = () => {
    const { allJobs } = useSelector((state) => state.job);

    return (
        <>
            <div className="flex w-full px-[120px] mt-[65px] flex-col pb-[35px]">
                <div className="flex w-full items-start">
                    <h1 className="text-[35px] font-bold text-[#653BB8]">
                        Latest and Top&nbsp;
                        <span className="text-black">Job Openings</span>
                    </h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 mt-4 pb-5">
                    {allJobs?.length <= 0 ? (
                        <span className=" flex p-3 items-center justify-center text-[18px] font-semibold bg-gray-200 rounded-full">
                            No job Available
                        </span>
                    ) : (
                        allJobs?.slice(0, 6).map((item) => {
                            return (
                                <>
                                    <LatestCard
                                        item={item}
                                        key={item?._id}
                                    />
                                </>
                            );
                        })
                    )}
                </div>
            </div>
        </>
    );
};

export default LatestJob;
