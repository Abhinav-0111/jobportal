import { Dialog } from "@mui/material";
import React, { useContext, useState } from "react";
import ContextApi from "../context/contextApi";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/userSlice";
import { toast } from "react-toastify";

const PhotoEditDiglogue = () => {
    const { open2, setOpen2 } = useContext(ContextApi);
    const [profilePhoto, setprofilePhoto] = useState("");
    const [loading, setloading] = useState(false);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const profilePhotoChangeHandle = async () => {
        const formData = new FormData();
        formData.append("profilePhoto", profilePhoto);
        formData.append("loginUserId", user?._id);
        try {
            setloading(true);
            const res = await axios.post(
                "http://localhost:8000/profilePhoto/edit",
                formData
            );
            if (res.status === 200) {
                dispatch(getUser(res?.data?.user));
                toast.success(res?.data.Message);
                setprofilePhoto("");
                setOpen2(false);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setloading(false);
        }
    };
    return (
        <>
            <Dialog
                open={open2}
                onClose={() => {
                    setOpen2(false);
                }}
            >
                <div className="flex flex-col w-[400px] overflow-hidden p-5">
                    <div className="flex text-[17px] font-semibold">
                        Update Profile Photo
                    </div>
                    <div className="flex w-full p-5">
                        <input
                            type="file"
                            className="w-full"
                            onChange={(e) => {
                                setprofilePhoto(e.target.files[0]);
                            }}
                        />
                    </div>
                    <div className="flex w-full">
                        <button
                            onClick={profilePhotoChangeHandle}
                            className="btn w-full bg-[#101120] flex items-center text-white py-1 px-4 rounded-md hover:bg-[#101120cf]"
                        >
                            {loading ? (
                                <span className="flex items-center loading loading-spinner loading-md"></span>
                            ) : (
                                "Update"
                            )}
                        </button>
                    </div>
                </div>
            </Dialog>
        </>
    );
};

export default PhotoEditDiglogue;
