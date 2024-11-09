import React from "react";
import { FaRegBookmark } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const JobCard = ({ item }) => {
    const navigate = useNavigate();
    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    };

    return (
        <>
            <div className="flex flex-col shadow-lg border cursor-pointer bg-white p-4 h-fit w-[335px] rounded-md ">
                <div className="flex items-center w-full justify-between">
                    <h1>
                        {daysAgoFunction(item?.createdAt) === 0
                            ? "Today"
                            : `${daysAgoFunction(item?.createdAt)} days ago`}
                    </h1>
                    <div className="flex items-center bg-gray-100 hover:bg-gray-200 justify-center overflow-hidden rounded-full h-9 w-9">
                        <FaRegBookmark />
                    </div>
                </div>
                <div className="flex items-center mt-1">
                    <img
                        src={
                            item?.company?.logo
                                ? item?.company?.logo
                                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNkl44gUwSE-ZEWnqtQ--KTtlOolptop2CZg&s"
                        }
                        alt="logo"
                        className="h-[46px] w-[46px] object-cover"
                    />
                    <div className="flex flex-col ml-2">
                        <h1 className="font-semibold">{item?.company?.name}</h1>
                        <span className="text-[14px] text-gray-500">India</span>
                    </div>
                </div>
                <span className="font-bold text-[16px] mt-2">
                    {item?.title}
                </span>
                <h1 className="text-[14px] text-gray-500 mt-2">
                    {item?.description.slice(0, 40)}...
                </h1>
                <div className="flex w-full items-start rounded-full mt-3 gap-3">
                    <span className="py-[2px] px-3 text-[14px] text-blue-700 font-semibold border border-gray-200 rounded-full">
                        {item?.position} Positions
                    </span>
                    <span className="py-[2px] px-3 text-[14px] text-red-600 font-semibold border border-gray-200 rounded-full">
                        {item?.jobType}
                    </span>
                    <span className="py-[2px] px-3 text-[14px] text-[#653BB8] font-semibold border border-gray-200 rounded-full">
                        {item?.salary} LPA
                    </span>
                </div>
                <div className="flex items-center mt-4">
                    <button
                        onClick={() => {
                            navigate(`/description/${item?._id}`);
                        }}
                        className="py-2 px-3 font-semibold hover:bg-gray-100 border bg-white rounded-md"
                    >
                        Details
                    </button>
                    <button className="py-2 px-3 font-semibold border bg-[#9333EA] hover:bg-[#7016B7] rounded-md text-white ml-3">
                        Save For Later
                    </button>
                </div>
            </div>
        </>
    );
};

export default JobCard;
