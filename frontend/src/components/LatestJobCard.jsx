import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const LatestCard = ({ item }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    return (
        <>
            <div
                onClick={() => {
                    navigate(`/description/${item?._id}`);
                }}
                className="flex rounded-md mb-4 shadow-xl w-[380px] flex-col cursor-pointer pt-6 pb-3 px-4"
            >
                <span className="font-semibold text-[17px]">
                    {item?.company?.name}
                </span>
                <span className="text-[14px] text-gray-500">India</span>
                <span className="font-bold mt-1 text-[17px]">
                    {item?.title}
                </span>
                <p className="mt-1 text-[14px] text-gray-500">
                    {item?.description}
                </p>
                <div className="flex w-full items-start rounded-full mt-3 gap-3">
                    <span className="py-[2px] px-3 text-[14px] text-blue-700 font-semibold border border-gray-200 rounded-full">
                        {item?.position} Position
                    </span>
                    <span className="py-[2px] px-3 text-[14px] text-red-600 font-semibold border border-gray-200 rounded-full">
                        {item?.jobType}
                    </span>
                    <span className="py-[2px] px-3 text-[14px] text-[#653BB8] font-semibold border border-gray-200 rounded-full">
                        {item?.salary} LPA
                    </span>
                </div>
            </div>
        </>
    );
};

export default LatestCard;
