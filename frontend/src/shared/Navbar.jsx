import React, { useContext, useState } from "react";
import { navbarOptions, navbarOptions2 } from "../services/contants";
import Avatar from "@mui/material/Avatar";
import { Popover } from "@mui/material";
import { FaRegUser } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ContextApi from "../context/contextApi";
import { getUser } from "../redux/userSlice";
import { getAllJobs, getOneJob, setSearchQuery } from "../redux/jobSlice";

const Navbar = ({ Option }) => {
    const [anchorEl, setAnchorEl] = useState(false);
    const { user } = useSelector((state) => state.auth);
    // const { handleCategories, categories } = useContext(ContextApi);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClick = () => {
        setAnchorEl(true);
    };

    const handleClose = () => {
        setAnchorEl(false);
    };

    // const linkHander = (name) => {
    //     if (name === "Home") {
    //         navigate("/");
    //     } else if (name === "Jobs") {
    //         navigate("/jobs");
    //     } else if (name === "Browse") {
    //         navigate("/browse");
    //     }
    // };

    const logoutHandler = () => {
        dispatch(getUser(null));
        dispatch(getAllJobs([]));
        dispatch(getOneJob([]));
        navigate("/");
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;
    return (
        <>
            <div className="flex fixed bg-white z-50 top-0 w-full items-center justify-between px-[120px] py-[18px]">
                <div className="flex">
                    <p
                        onClick={() => {
                            navigate("/");
                            dispatch(setSearchQuery(""));
                        }}
                        className="text-[26px] font-bold cursor-pointer"
                    >
                        Job<span className="text-red-600">Portal</span>
                    </p>
                </div>
                <div className="flex relative font-medium items-center gap-6">
                    {user && user?.role === "student" ? (
                        <>
                            {Option && (
                                <>
                                    {user && (
                                        <>
                                            <span>
                                                <Link
                                                    onClick={() => {
                                                        dispatch(
                                                            setSearchQuery("")
                                                        );
                                                    }}
                                                    to={"/"}
                                                >
                                                    Home
                                                </Link>
                                            </span>
                                            <span>
                                                <Link to={"/jobs"}>Jobs</Link>
                                            </span>
                                            <span>
                                                <Link to={"/browse"}>
                                                    Browse
                                                </Link>
                                            </span>
                                        </>
                                    )}
                                </>
                            )}
                        </>
                    ) : (
                        <>
                            {Option && (
                                <>
                                    {user && (
                                        <>
                                            <span>
                                                <Link to={"/admin/companies"}>
                                                    Companies
                                                </Link>
                                            </span>
                                            <span>
                                                <Link to={"/admin/jobs"}>
                                                    Jobs
                                                </Link>
                                            </span>
                                        </>
                                    )}
                                </>
                            )}
                        </>
                    )}
                    {!user ? (
                        <>
                            {Option && (
                                <div className="flex items-center ml-3 gap-3">
                                    <button
                                        className="btn px-8"
                                        onClick={() => {
                                            navigate("/login");
                                        }}
                                    >
                                        Login
                                    </button>
                                    <button
                                        className="btn bg-purple-600 hover:bg-purple-500 text-white"
                                        onClick={() => {
                                            navigate("/signup");
                                        }}
                                    >
                                        Signup
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            <div className="flex items-center">
                                <Avatar
                                    alt="Travis Howard"
                                    className="cursor-pointer"
                                    aria-describedby={id}
                                    variant="contained"
                                    onClick={handleClick}
                                    src={
                                        user?.profilePhoto
                                            ? user?.profilePhoto
                                            : "https://www.vcqru.com/NewContent/front-assets/img/user.png"
                                    }
                                />
                                <Popover
                                    id={id}
                                    open={open}
                                    anchorEl={anchorEl}
                                    onClose={handleClose}
                                    className="mt-[60px]"
                                    anchorOrigin={{
                                        // vertical: "bottom",
                                        horizontal: "right",
                                    }}
                                >
                                    <div className="flex flex-col w-80 p-2">
                                        <div className="flex w-full items-center rounded-lg p-2">
                                            <Avatar
                                                alt="Travis Howard"
                                                className="cursor-pointer"
                                                src={
                                                    user?.profilePhoto
                                                        ? user?.profilePhoto
                                                        : "https://www.vcqru.com/NewContent/front-assets/img/user.png"
                                                }
                                            />
                                            <div className="flex flex-col ml-3">
                                                <span className="font-semibold leading-4">
                                                    {user?.name}
                                                </span>
                                                <p className="text-gray-400">
                                                    {user?.bio
                                                        ? user?.bio
                                                        : "Add bio.."}
                                                </p>
                                            </div>
                                        </div>
                                        {user && user?.role === "student" && (
                                            <div
                                                onClick={() => {
                                                    navigate("/profile");
                                                }}
                                                className="flex w-full items-center cursor-pointer hover:bg-slate-100 rounded-lg px-2 py-3"
                                            >
                                                <FaRegUser
                                                    className="mr-2"
                                                    size={16}
                                                />
                                                View Profile
                                            </div>
                                        )}

                                        <div
                                            onClick={logoutHandler}
                                            className="flex w-full items-center cursor-pointer hover:bg-slate-100 rounded-lg px-2 py-3"
                                        >
                                            <MdLogout
                                                className="mr-2 ml-[2px]"
                                                size={19}
                                            />
                                            Logout
                                        </div>
                                    </div>
                                </Popover>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default Navbar;
