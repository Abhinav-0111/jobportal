import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getOneJob } from "../redux/jobSlice";
import { toast } from "react-toastify";

const Description = () => {
    const { id } = useParams();
    const { oneJob } = useSelector((state) => state.job);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const isIntiallyApplied =
        oneJob?.applications?.some((item) => item?.applicant === user?._id) ||
        false;
    const [isApplied, setisApplied] = useState(isIntiallyApplied);

    const applyJobHandle = async () => {
        try {
            const res = await axios.put(
                `http://localhost:8000/jobApply/${id}`,
                { id: user?._id }
            );
            if (res.status === 200) {
                setisApplied(true);
                const updateOneJob = {
                    ...oneJob,
                    applications: [
                        ...oneJob.applications,
                        { applicant: user?._id },
                    ],
                };
                dispatch(getOneJob(updateOneJob));
                toast.success(res?.data?.Message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (user) {
            const fetchOneJob = async () => {
                try {
                    const res = await axios.post(
                        `http://localhost:8000/getJobById/${id}`
                    );
                    if (res.status === 200) {
                        dispatch(getOneJob(res?.data));
                        setisApplied(
                            res.data.applications.some(
                                (application) =>
                                    application.applicant === user?._id
                            )
                        );
                    }
                } catch (error) {
                    console.log(error);
                }
            };
            fetchOneJob();
        }
    }, [id, dispatch, user?._id]);
    console.log(oneJob);
    return (
        <>
            <Navbar
                Option={true}
                loginOption={true}
            />
            <div className="flex w-full h-[100vh] bg-gray-200 px-[120px]">
                <div className="flex flex-col border w-full p-5 mt-[100px] h-fit bg-white rounded-md">
                    <div className="flex w-full items-center justify-between border-b pb-4">
                        <div className="flex flex-col gap-3">
                            <span className="text-[20px] font-bold">
                                {oneJob?.title}
                            </span>
                            <div className="flex items-center gap-2">
                                <span className="py-[2px] px-3 text-[13px] text-blue-700 font-semibold border border-gray-200 rounded-full">
                                    {oneJob?.position} Positions
                                </span>
                                <span className="py-[2px] px-3 text-[13px] text-red-600 font-semibold border border-gray-200 rounded-full">
                                    {oneJob?.jobType}
                                </span>
                                <span className="py-[2px] px-3 text-[13px] text-[#653BB8] font-semibold border border-gray-200 rounded-full">
                                    {oneJob?.salary} LPA
                                </span>
                            </div>
                            <span className="text-gray-600 font-semibold">
                                Job Description
                            </span>
                        </div>
                        <div className="flex">
                            <button
                                disabled={isApplied}
                                onClick={isApplied ? null : applyJobHandle}
                                className={`btn ${
                                    isApplied
                                        ? "cursor-not-allowed"
                                        : "cursor-pointer"
                                } bg-[#A855F7] hover:bg-[#9333EA] text-white`}
                            >
                                {isApplied ? "Already Applied" : "Apply Now"}
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 mt-3">
                        <div className="flex items-center">
                            <h1 className="font-bold mr-2">Role:</h1>
                            <span className="text-gray-500">
                                {oneJob?.title}
                            </span>
                        </div>
                        <div className="flex items-center">
                            <h1 className="font-bold mr-2">Location:</h1>
                            <span className="text-gray-500">
                                {oneJob?.location}
                            </span>
                        </div>
                        <div className="flex items-center">
                            <h1 className="font-bold mr-2">Description:</h1>
                            <span className="text-gray-500">
                                {oneJob?.description}
                            </span>
                        </div>
                        <div className="flex items-center">
                            <h1 className="font-bold mr-2">Experience:</h1>
                            <span className="text-gray-500">
                                {oneJob?.experienceLevel} year
                            </span>
                        </div>
                        <div className="flex items-center">
                            <h1 className="font-bold mr-2">Salary:</h1>
                            <span className="text-gray-500">
                                {oneJob?.salary} LPA
                            </span>
                        </div>
                        <div className="flex items-center">
                            <h1 className="font-bold mr-2">
                                Total Applicants:
                            </h1>
                            <span className="text-gray-500">
                                {oneJob?.applications?.length}
                            </span>
                        </div>
                        <div className="flex items-center">
                            <h1 className="font-bold mr-2">Posted Date:</h1>
                            <span className="text-gray-500">
                                {oneJob?.createdAt?.split("T")[0]}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Description;
