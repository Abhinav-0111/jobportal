import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../redux/jobSlice";

const JobSidebar = () => {
    const [selectedValue, setSelectedValue] = useState("");
    const dispatch = useDispatch();
    const filterData = [
        {
            filterType: "Location",
            array: [
                "Delhi NCR",
                "Chennai",
                "Gurugram",
                "Jaipur",
                "Mumbai",
                "Goa",
                "Rohtak",
                "Hissar",
                "Puna",
                "UP",
                "Tamil Nadu",
                "Noida",
            ],
        },
        // {
        //     filterType: "Industry",
        //     array: [
        //         "Frontend Developer",
        //         "Backend Developer",
        //         "Data Science",
        //         "FullStack Developer",
        //         "Nextjs Developer",
        //     ],
        // },
        // {
        //     filterType: "Salary",
        //     array: ["0-40k", "42k to 1 lakh", "1 lakh to 5 lakh"],
        // },
    ];
    useEffect(() => {
        dispatch(setSearchQuery(selectedValue));
    }, [selectedValue]);
    return (
        <>
            <div className="flex min-w-[260px] flex-col rounded-md bg-white p-3 h-fit">
                <span className="text-[18px] font-bold border-b pb-2">
                    Filter Jobs
                </span>
                <div className="flex flex-col">
                    {filterData.map((items, index) => {
                        return (
                            <>
                                <div
                                    key={index}
                                    className="flex flex-col font-semibold mt-2 mb-1"
                                >
                                    {items.filterType}
                                    {items.array.map((item, idx) => {
                                        const itemId = `id${index}-${idx}`;
                                        return (
                                            <>
                                                <div
                                                    key={index}
                                                    className="flex items-center text-gray-500 text-[15px] font-normal mb-[2px] mt-1"
                                                >
                                                    <input
                                                        type="radio"
                                                        className="mr-[5px] cursor-pointer"
                                                        id={itemId}
                                                        name={items.array}
                                                        value={item}
                                                        onClick={(e) => {
                                                            setSelectedValue(
                                                                e.target.value
                                                            );
                                                        }}
                                                    />
                                                    <label
                                                        htmlFor={itemId}
                                                        className="cursor-pointer"
                                                    >
                                                        {item}
                                                    </label>
                                                </div>
                                            </>
                                        );
                                    })}
                                </div>
                            </>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default JobSidebar;
