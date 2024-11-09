import React from "react";
import { FaFacebookSquare } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";

const Footer = () => {
    return (
        <>
            <div className="flex w-full border border-gray-200 items-center justify-between px-[70px] py-[30px]">
                <div className="flex flex-col">
                    <h1 className="text-[20px] font-bold">Job Hunt</h1>
                    <span className="text-[14px] text-gray-500">
                        2024 Your Company. All rights reserved.
                    </span>
                </div>
                <div className="flex gap-4">
                    <FaFacebookSquare
                        size={30}
                        className="cursor-pointer"
                    />
                    <FaTwitter
                        size={30}
                        className="cursor-pointer"
                    />
                    <FaLinkedin
                        size={30}
                        className="cursor-pointer"
                    />
                </div>
            </div>
        </>
    );
};

export default Footer;
