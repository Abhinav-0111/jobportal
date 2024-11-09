import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import ApplicantTable from "./ApplicantTable";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "../redux/applicationSlice";

const Applicants = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { applicants } = useSelector((state) => state.application);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:8000/applicants/${id}`
                );

                if (res.status === 200) {
                    dispatch(setAllApplicants(res?.data?.job));
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchAllApplicants();
    }, []);
    return (
        <>
            <div className="flex flex-col w-full h-[100vh] overflow-hidden">
                <Navbar Option={true} />
                <div className="flex flex-col w-full mt-[80px] px-[120px]">
                    <h1 className="text-[20px] font-bold">
                        Applicants ({applicants?.applications?.length})
                    </h1>
                    <div className="flex items-center justify-between mt-5 px-2 border-b py-2 text-gray-500 font-semibold">
                        <h1>FullName</h1>
                        <h1>Email</h1>
                        <h1>Contact</h1>
                        <h1>Resume</h1>
                        <h1>Date</h1>
                        <h1>Action</h1>
                    </div>
                    {applicants?.applications.map((item) => {
                        return (
                            <>
                                <ApplicantTable
                                    key={item?._id}
                                    item={item}
                                />
                            </>
                        );
                    })}

                    <div className="flex w-full pb-2 items-center justify-center text-[14px] font-semibold text-gray-400 mt-4">
                        {applicants?.applications?.length === 0
                            ? "Not find any applicant"
                            : " A list of your recent applied user"}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Applicants;
