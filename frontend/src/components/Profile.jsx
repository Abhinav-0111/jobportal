import React, { useContext } from "react";
import Navbar from "../shared/Navbar";
import { MdEdit, MdMailOutline } from "react-icons/md";
import { LuContact2 } from "react-icons/lu";
import ContextApi from "../context/contextApi";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";
import PhotoEditDiglogue from "./PhotoEditDiglogue";
import useGetAllAppliedJobs from "../hooks/useGetAllAppliedJobs";

const Profile = () => {
    const { allAppliedJobs } = useSelector((state) => state.job);
    const { setOpen, setOpen2 } = useContext(ContextApi);
    const { user } = useSelector((state) => state.auth);
    useGetAllAppliedJobs();
    return (
        <>
            <Navbar
                Option={true}
                loginOption={true}
            />
            <div className="flex flex-col w-full h-full overflow-y-auto items-center justify-center mt-[38px] pb-[40px]">
                <div className="flex flex-col w-[70%] mt-8">
                    <div className="flex flex-col w-full border mt-8 rounded-lg p-6 overflow-x-hidden gap-2">
                        <div className="flex w-full items-center justify-between">
                            <div className="flex items-center">
                                <div className="flex relative">
                                    <div className="flex items-center justify-center overflow-hidden h-[80px] w-[80px] rounded-full">
                                        <img
                                            alt="img"
                                            src={
                                                user?.profilePhoto
                                                    ? user?.profilePhoto
                                                    : "https://www.vcqru.com/NewContent/front-assets/img/user.png"
                                            }
                                        />
                                        <div
                                            onClick={() => {
                                                setOpen2(true);
                                            }}
                                            className="flex absolute items-center justify-center bg-blue-600 rounded-full h-7 w-7 overflow-hidden text-white cursor-pointer bottom-0 right-0 z-50"
                                        >
                                            <span className="font-bold">+</span>
                                        </div>
                                        <PhotoEditDiglogue />
                                    </div>
                                </div>
                                <div className="flex flex-col ml-2 w-fit truncate">
                                    <h1 className="font-semibold leading-4">
                                        {user?.name}
                                    </h1>
                                    <p className="text-gray-500 w-full truncate">
                                        {user?.bio || "Add bio..."}
                                    </p>
                                </div>
                            </div>
                            <div
                                onClick={() => {
                                    setOpen(true);
                                }}
                                className="flex items-center justify-center border p-2 cursor-pointer rounded-md hover:bg-gray-100"
                            >
                                <MdEdit size={20} />
                            </div>
                        </div>
                        <div className="flex items-center mt-3">
                            <MdMailOutline
                                size={18}
                                className="text-gray-500"
                            />
                            <span className="ml-2 text-gray-500">
                                {user?.email}
                            </span>
                        </div>
                        <div className="flex items-center">
                            <LuContact2
                                size={18}
                                className="text-gray-500"
                            />
                            <span className="ml-2 text-gray-500">
                                {user?.phoneNumber}
                            </span>
                        </div>
                        <div className="flex flex-col mt-2">
                            <p className="font-semibold">Skills</p>
                            <div className="flex w-full overflow-x-auto gap-2 mt-2">
                                {user?.skills.length === 0
                                    ? "Add Skills"
                                    : user?.skills.map((item, index) => {
                                          return (
                                              <>
                                                  <div
                                                      key={index}
                                                      className="flex items-center rounded-full px-3 bg-black text-white"
                                                  >
                                                      {item}
                                                  </div>
                                              </>
                                          );
                                      })}
                            </div>
                        </div>
                        <div className="flex flex-col font-semibold mt-2">
                            <p>Resume</p>
                            {user?.resumeOriginalName ? (
                                <a
                                    target="_blank"
                                    href={user?.resume}
                                    className="flex text-blue-500 font-normal cursor-pointer"
                                >
                                    {user?.resumeOriginalName}
                                </a>
                            ) : (
                                <span className="flex text-blue-500 font-normal">
                                    Add resume...
                                </span>
                            )}
                        </div>
                    </div>
                    <span className="text-[18px] font-bold mt-7 mb-2">
                        Applied Jobs
                    </span>
                    <div className="flex w-full border flex-col items-center rounded-lg">
                        <div className="flex items-start justify-between font-semibold w-full p-3 border-b">
                            <span>Date</span>
                            <span>Job Role</span>
                            <span>Company</span>
                            <span>Status</span>
                        </div>
                        {allAppliedJobs.length === 0 ? (
                            <span className="text-[20] font-semibold p-2">
                                Can't find ant job
                            </span>
                        ) : (
                            allAppliedJobs?.map((item, index) => {
                                return (
                                    <>
                                        <div
                                            key={index}
                                            className="flex items-start justify-between  w-full p-3 border-b hover:bg-gray-100"
                                        >
                                            <span className="w-[300px] truncate">
                                                {item?.createdAt.split("T")[0]}
                                            </span>
                                            <span className="w-[320px] truncate">
                                                {item?.job?.title}
                                            </span>
                                            <span className="w-[300px] truncate text-start">
                                                {item?.job?.company?.name}
                                            </span>
                                            <span className="w-fit truncate">
                                                <div
                                                    className={`flex items-center rounded-full px-3 bg-gray-400 cursor-pointer ${
                                                        item?.status ===
                                                        "rejected"
                                                            ? "bg-red-400"
                                                            : "bg-gray-400"
                                                    } text-white`}
                                                >
                                                    {item?.status}
                                                </div>
                                            </span>
                                        </div>
                                    </>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
            <EditProfile />
        </>
    );
};

export default Profile;
