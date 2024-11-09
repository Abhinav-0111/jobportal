import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const JobList = ({ item }) => {
    const navigate = useNavigate();
    const [open, setopen] = useState(false);
    const handleClick = () => {
        setopen(true);
    };

    const handleClose = () => {
        setopen(false);
    };

    return (
        <>
            <div className="flex relative items-center justify-between border-b p-2 text-gray-500 font-semibold px-2">
                <img
                    src={
                        item?.logo
                            ? item?.logo
                            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNkl44gUwSE-ZEWnqtQ--KTtlOolptop2CZg&s"
                    }
                    className="w-10 h-10"
                />
                <span>{item?.name}</span>
                <span>{item?.createdAt.split("T")[0]}</span>
                <div className="flex items-center relative">
                    <IoEllipsisHorizontal
                        size={22}
                        className="cursor-pointer"
                        onClick={handleClick}
                    />
                    <Dialog
                        open={open}
                        onClose={handleClose}
                    >
                        <div className="flex w-[280px] items-center justify-center py-2 px-4 bg-white">
                            <button
                                onClick={() => {
                                    navigate(`/admin/companies/${item?._id}`);
                                }}
                                className="btn w-full bg-[#101120] hover:bg-[#1e1f39]  text-white"
                            >
                                Edit
                            </button>
                        </div>
                    </Dialog>
                </div>
            </div>
        </>
    );
};

export default JobList;
