import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authenticationSignup } from "../services/api";
import { useSelector } from "react-redux";

const Signup = () => {
    const [role, setrole] = useState("");
    const [password, setpassword] = useState("");
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [phoneNumber, setphoneNumber] = useState("");
    const [loading, setloading] = useState(false);
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, []);

    const signUpUser = async () => {
        try {
            if (!role || !name || !password || !email || !phoneNumber) {
                toast.error("All fields are required");
            }
            setloading(true);
            const res = await authenticationSignup({
                name,
                email,
                role,
                password,
                phoneNumber,
            });
            if (res.status === 200) {
                setname("");
                setrole("");
                setemail("");
                setpassword("");
                setphoneNumber("");
                toast.success(res?.data?.Message);
                navigate("/login");
            }
        } catch (error) {
            toast.error(error?.response?.data?.Message);
            console.log(error);
        } finally {
            setloading(false);
        }
    };

    return (
        <>
            <div className="flex flex-col w-full h-screen overflow-hidden">
                <Navbar />
                <div className="flex w-full h-full overflow-hidden items-center justify-center">
                    <div className="flex flex-col p-3 w-[500px] border border-gray-300 rounded-md">
                        <span className="text-[20px] font-bold mb-6">
                            Sign Up
                        </span>
                        <div className="flex flex-col w-full">
                            <div className="flex flex-col mb-3">
                                <label className="font-semibold text-[15px]">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e) => {
                                        setname(e.target.value);
                                    }}
                                    autoFocus
                                    className="w-full outline-none border border-gray-300 p-2 rounded-md"
                                />
                            </div>
                            <div className="flex flex-col mb-3">
                                <label className="font-semibold text-[15px]">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => {
                                        setemail(e.target.value);
                                    }}
                                    className="w-full outline-none border border-gray-300 p-2 rounded-md"
                                />
                            </div>
                            <div className="flex flex-col mb-3">
                                <label className="font-semibold text-[15px]">
                                    Phone Number
                                </label>
                                <input
                                    type="number"
                                    placeholder="Phone Number"
                                    value={phoneNumber}
                                    onChange={(e) => {
                                        setphoneNumber(e.target.value);
                                    }}
                                    className="w-full outline-none border border-gray-300 p-2 rounded-md"
                                />
                            </div>
                            <div className="flex flex-col mb-3">
                                <label className="font-semibold text-[15px]">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => {
                                        setpassword(e.target.value);
                                    }}
                                    className="w-full outline-none border border-gray-300 p-2 rounded-md"
                                />
                            </div>
                            <div className="flex w-full items-center gap-8 mt-4">
                                <div
                                    className="flex items-center gap-2 cursor-pointer
                            "
                                >
                                    <input
                                        type="radio"
                                        name="role"
                                        value="student"
                                        checked={role === "student"}
                                        id="student"
                                        onChange={(e) => {
                                            setrole(e.target.value);
                                        }}
                                        className="cursor-pointer"
                                    />
                                    <label
                                        for="student"
                                        className="cursor-pointer font-semibold text-[15px]"
                                    >
                                        Student
                                    </label>
                                </div>
                                <div className="flex gap-2 items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="recruiter"
                                        checked={role === "recruiter"}
                                        id="recruiter"
                                        onChange={(e) => {
                                            setrole(e.target.value);
                                        }}
                                        className="cursor-pointer"
                                    />
                                    <label
                                        for="recruiter"
                                        className="font-semibold text-[15px] cursor-pointer"
                                    >
                                        Recruiter
                                    </label>
                                </div>
                            </div>
                        </div>
                        <button
                            disabled={
                                !name ||
                                !email ||
                                !password ||
                                !role ||
                                !phoneNumber
                            }
                            onClick={signUpUser}
                            className="btn btn-active btn-neutral mt-6"
                        >
                            {loading ? (
                                <span className="loading loading-spinner loading-md"></span>
                            ) : (
                                "Signup"
                            )}
                        </button>
                        <p className="mt-2">
                            Already have an account?&nbsp;
                            <Link
                                to={"/login"}
                                className="cursor-pointer text-blue-600"
                            >
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;
