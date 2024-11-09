import { Popover, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { toast } from "react-toastify";

const ApplicantTable = ({ item }) => {
    const [open, setopen] = useState(false);
    // const [status, setstatus] = useState("");

    const shortlistingStatus = ["Accepted", "Rejected"];

    const handleClick = () => {
        setopen(true);
    };
    const handleClose = () => {
        setopen(false);
    };
    const statusHandler = async (status) => {
        try {
            const res = await axios.put(
                `http://localhost:8000/updateStatus/${item?._id}`,
                { status }
            );
            console.log(res);
            if (res.status === 200) {
                toast.success(res?.data?.Message);
                handleClose();
            }
        } catch (error) {
            console.log(error);
        }
    };
    const id = open ? "simple-popover" : undefined;
    return (
        <>
            <div className="flex items-center justify-between mt-1 px-2  py-2 text-gray-500 font-semibold">
                <h1>{item?.applicant?.name}</h1>
                <h1>{item?.applicant?.email}</h1>
                <h1>{item?.applicant?.phoneNumber}</h1>
                {item?.applicant?.resume ? (
                    <h1 className="text-blue-500">
                        <a href={item?.applicant?.resume}>
                            {item?.applicant?.resumeOriginalName}
                        </a>
                    </h1>
                ) : (
                    <h1>NA</h1>
                )}

                <h1>{item?.applicant?.createdAt.split("T")[0]}</h1>
                <IoEllipsisHorizontal
                    size={22}
                    className="relative cursor-pointer"
                    aria-describedby={id}
                    variant="contained"
                    onClick={handleClick}
                />
                <Popover
                    id={id}
                    open={open}
                    // anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    className="mt-[210px]"
                >
                    <div className="flex flex-col w-[200px]">
                        {shortlistingStatus?.map((item, index) => {
                            return (
                                <>
                                    <span
                                        key={index}
                                        onClick={() => {
                                            statusHandler(item);
                                        }}
                                        className="flex w-full items-center justify-center py-3 cursor-pointer hover:bg-gray-100"
                                    >
                                        {item}
                                    </span>
                                </>
                            );
                        })}
                    </div>
                </Popover>
            </div>
        </>
    );
};

export default ApplicantTable;
