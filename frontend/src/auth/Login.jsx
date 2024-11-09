import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authenticationLogin } from "../services/api";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/userSlice";

const Login = () => {
    const [role, setrole] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [loading, setloading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, []);

    const loginUser = async () => {
        try {
            if (!email || !password || !role) {
                toast.error("All field are required");
            }
            setloading(true);
            const res = await authenticationLogin({
                email,
                password,
                role,
            });
            if (res.status === 200) {
                setemail("");
                setpassword("");
                setrole("");
                toast.success(res?.data?.Message);
                dispatch(getUser(res?.data?.user));
                navigate("/");
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data);
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
                            Login
                        </span>
                        <div className="flex flex-col w-full">
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
                                    autoFocus
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
                            disabled={!email || !password || !role}
                            className="btn btn-active btn-neutral mt-6"
                            onClick={loginUser}
                        >
                            {loading ? (
                                <span className="loading loading-spinner loading-md"></span>
                            ) : (
                                "Login"
                            )}
                        </button>
                        <p className="mt-2">
                            Don't have an account?&nbsp;
                            <Link
                                to={"/signup"}
                                className="cursor-pointer text-blue-600"
                            >
                                Signup
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
