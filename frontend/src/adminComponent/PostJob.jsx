import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PostJob = () => {
    const [title, settitle] = useState("");
    const [description, setdescription] = useState("");
    const [requirements, setrequirements] = useState("");
    const [salary, setsalary] = useState("");
    const [location, setlocation] = useState("");
    const [jobType, setjobType] = useState("");
    const [position, setposition] = useState(0);
    const [experience, setexperience] = useState("");
    const { allCompany } = useSelector((state) => state.company);
    const [companyId, setcompanyId] = useState("");
    const { user } = useSelector((state) => state.auth);
    const [loading, setloading] = useState(false);

    const navigate = useNavigate();

    const submitHandler = async () => {
        try {
            setloading(true);
            const res = await axios.post("http://localhost:8000/post", {
                id: user?._id,
                title,
                location,
                jobType,
                position,
                experience,
                companyId,
                salary,
                requirements,
                description,
            });
            if (res.status === 200) {
                toast.success(res?.data?.Message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setloading(false);
        }
    };

    return (
        <>
            <div className="flex w-screen h-[100vh] overflow-hidden flex-col">
                <Navbar Option={true} />
                <div className="flex w-full items-center justify-center">
                    <div className="flex flex-col w-[500px] border mt-[120px] p-4 rounded-md">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col">
                                <label className="font-semibold">Title</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => settitle(e.target.value)}
                                    className="border p-2 mt-1 rounded-md"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="font-semibold">
                                    Description
                                </label>
                                <input
                                    type="text"
                                    value={description}
                                    onChange={(e) =>
                                        setdescription(e.target.value)
                                    }
                                    className="border p-2 mt-1 rounded-md"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="font-semibold">
                                    Requirements
                                </label>
                                <input
                                    type="text"
                                    value={requirements}
                                    onChange={(e) =>
                                        setrequirements(e.target.value)
                                    }
                                    className="border p-2 mt-1 rounded-md"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="font-semibold">Salary</label>
                                <input
                                    type="text"
                                    value={salary}
                                    onChange={(e) => setsalary(e.target.value)}
                                    className="border p-2 mt-1 rounded-md"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="font-semibold">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    value={location}
                                    onChange={(e) =>
                                        setlocation(e.target.value)
                                    }
                                    className="border p-2 mt-1 rounded-md"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="font-semibold">
                                    Job Type
                                </label>
                                <input
                                    type="text"
                                    value={jobType}
                                    onChange={(e) => setjobType(e.target.value)}
                                    className="border p-2 mt-1 rounded-md"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="font-semibold">
                                    Experience Level
                                </label>
                                <input
                                    type="text"
                                    value={experience}
                                    onChange={(e) =>
                                        setexperience(e.target.value)
                                    }
                                    className="border p-2 mt-1 rounded-md"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="font-semibold">
                                    No of Position
                                </label>
                                <input
                                    type="number"
                                    value={position}
                                    onChange={(e) =>
                                        setposition(e.target.value)
                                    }
                                    className="border p-2 mt-1 rounded-md"
                                />
                            </div>
                            <div className="flex flex-col">
                                {allCompany?.length >= 0 && (
                                    <>
                                        <select
                                            onChange={(e) => {
                                                setcompanyId(e.target.value);
                                            }}
                                            className="border p-[10px] mt-2 cursor-pointer rounded-md"
                                        >
                                            <option
                                                value=""
                                                disabled
                                                selected
                                            >
                                                Select a Company
                                            </option>
                                            {allCompany?.map((item) => {
                                                return (
                                                    <>
                                                        <option
                                                            value={item?._id}
                                                            className="cursor-pointer"
                                                        >
                                                            {item?.name}
                                                        </option>
                                                    </>
                                                );
                                            })}
                                        </select>
                                    </>
                                )}
                            </div>
                        </div>
                        <button
                            onClick={submitHandler}
                            disabled={
                                !title ||
                                !description ||
                                !requirements ||
                                !salary ||
                                !jobType ||
                                !experience ||
                                !position ||
                                !companyId
                            }
                            className="btn w-full mt-5 bg-[#0D1426] text-white hover:bg-[#0d1426c6]"
                        >
                            {loading ? (
                                <div className="flex items-center gap-1">
                                    <span className="loading loading-spinner loading-md"></span>
                                    <h1>Please wait</h1>
                                </div>
                            ) : (
                                "Post your Job"
                            )}
                        </button>
                        {allCompany.length === 0 && (
                            <p className="w-full text-center font-semibold mt-1 text-red-600">
                                Please register a company first,before posting a
                                job
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default PostJob;
