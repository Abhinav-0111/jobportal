import React, { useContext, useState } from "react";
import Dialog from "@mui/material/Dialog";
import ContextApi from "../context/contextApi";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { getUser } from "../redux/userSlice";

const EditProfile = () => {
    const { open, setOpen } = useContext(ContextApi);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [name, setname] = useState(user?.name);
    const [email, setemail] = useState(user?.email);
    const [phoneNumber, setphoneNumber] = useState(user?.phoneNumber);
    const [bio, setbio] = useState(user?.bio || "Add bio");
    const [file, setfile] = useState("");
    const [skills, setskills] = useState(user?.skills || "Add skills");
    const [profilePhoto, setprofilePhoto] = useState("");
    const [loading, setloading] = useState(false);
    const disable =
        user?.name === name &&
        user?.email === email &&
        user?.phoneNumber === phoneNumber &&
        user?.bio === bio &&
        profilePhoto === "" &&
        file === "" &&
        user?.skills === skills;

    const handleClose = () => {
        setOpen(false);
        setbio(user?.bio || "Add bio");
        setname(user?.name);
        setemail(user?.email);
        setphoneNumber(user?.phoneNumber);
        setfile(user?.resume || "");
        setskills(user?.skills);
        setprofilePhoto("");
    };

    const handleChange = (e) => {
        const file = e.target.files[0];
        const resu = e.target.files[0];
        if (file) {
            setprofilePhoto(file);
        }
        if (resu) {
            setfile(resu);
        }
    };
    const submitHandler = async () => {
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("skills", skills);
            formData.append("bio", bio);
            formData.append("file", file);
            formData.append("phoneNumber", phoneNumber);
            formData.append("email", email);
            formData.append("loginUserId", user?._id);
            setloading(true);
            const res = await axios.post(
                `http://localhost:8000/profile/edit`,
                formData
            );
            if (res.status === 200) {
                dispatch(getUser(res?.data?.user));
                toast.success(res?.data.Message);
                setbio(res?.data?.user?.bio || "Add bio");
                setname(res?.data?.user?.name);
                setemail(res?.data?.user?.email);
                setphoneNumber(res?.data?.user?.phoneNumber);
                setfile("");
                setskills(res?.data?.user?.skills);
                setprofilePhoto("");
                setOpen(false);
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
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div className="flex w-[480px] bg-white p-5 flex-col">
                    <div className="flex items-center justify-between">
                        <span className="font-semibold text-[17px]">
                            Update Profile
                        </span>
                        <span
                            onClick={() => {
                                setOpen(false);
                            }}
                            className="p-1 rounded-md cursor-pointer hover:bg-gray-100 border"
                        >
                            <IoClose size={18} />
                        </span>
                    </div>
                    <div className="flex w-full flex-col gap-2 pt-6 px-8">
                        <div className="flex flex-col">
                            <label className="text-black text-[15px] font-semibold">
                                Name
                            </label>
                            <input
                                type="text"
                                placeholder={name}
                                onChange={(e) => {
                                    setname(e.target.value);
                                }}
                                className="w-full border outline-none px-2 py-1 mt-1 rounded-md"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-black text-[15px] font-semibold">
                                Email
                            </label>
                            <input
                                type="text"
                                placeholder={email}
                                onChange={(e) => {
                                    setemail(e.target.value);
                                }}
                                className="w-full border outline-none px-2 py-1 mt-1 rounded-md"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-black text-[15px] font-semibold">
                                Number
                            </label>
                            <input
                                type="number"
                                placeholder={phoneNumber}
                                onChange={(e) => {
                                    setphoneNumber(e.target.value);
                                }}
                                className="w-full border outline-none px-2 py-1 mt-1 rounded-md"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-black text-[15px] font-semibold">
                                Bio
                            </label>
                            <input
                                type="type"
                                placeholder={bio}
                                onChange={(e) => {
                                    setbio(e.target.value);
                                }}
                                className="w-full border outline-none px-2 py-1 mt-1 rounded-md"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-black text-[15px] font-semibold">
                                Skills
                            </label>
                            <input
                                type="type"
                                placeholder={skills}
                                onChange={(e) => {
                                    setskills(e.target.value);
                                }}
                                className="w-full border outline-none px-2 py-1 mt-1 rounded-md"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-black text-[15px] font-semibold">
                                Resume
                            </label>
                            <input
                                type="file"
                                onChange={handleChange}
                                className="w-full border outline-none px-2 py-1 mt-1 rounded-md"
                            />
                        </div>
                        <div className="flex w-full justify-end items-end mt-3">
                            {disable ? (
                                <button
                                    disabled
                                    className="bg-[#7d80a4] cursor-not-allowed text-white py-1 px-4 rounded-md"
                                >
                                    Update
                                </button>
                            ) : (
                                <button
                                    onClick={submitHandler}
                                    className="bg-[#101120] flex items-center text-white py-1 px-4 rounded-md"
                                >
                                    {loading ? (
                                        <span className="flex items-center loading loading-spinner loading-md"></span>
                                    ) : (
                                        "Update"
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </Dialog>
        </>
    );
};

export default EditProfile;
