import React, { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
    const [query, setquery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const serachJobHandler = () => {
        dispatch(setSearchQuery(query));
        navigate("/browse");
    };

    return (
        <>
            <div className="flex w-full items-center flex-col gap-5 py-10 mt-[70px]">
                <span className="text-red-600 py-2 px-4 font-semibold bg-gray-100 rounded-full">
                    No.1 job Hunt Website
                </span>
                <h1 className="text-[40px] font-bold text-center leading-[43px]">
                    Search, Apply &<br /> Get Your
                    <span className="text-[#653BB8]">&nbsp;Dream Jobs</span>
                </h1>
                <p className="w-[600px] text-center">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Ducimus, unde! Quibusdam molestias eius cumque ipsam fugiat?
                    Corporis, autem sunt.
                </p>
                <div className="flex items-center shadow-lg rounded-full overflow-hidden w-[600px] border border-gray-200 pl-3 gap-4 mx-auto">
                    <input
                        placeholder="Find your dream jobs"
                        type="text"
                        onChange={(e) => {
                            setquery(e.target.value);
                        }}
                        className="w-full outline-none border-none"
                    />
                    <button
                        onClick={serachJobHandler}
                        className="bg-[#653BB8] p-3 px-4"
                    >
                        <IoSearchSharp
                            size={20}
                            color="white"
                        />
                    </button>
                </div>
            </div>
        </>
    );
};

export default HeroSection;
