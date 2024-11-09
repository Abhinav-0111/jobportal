import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AdminJobTable from "./AdminJobTable";
import useGetAllAdminJobs from "../hooks/useGetAllAdminJobs";
import { setTextByJob } from "../redux/jobSlice";

const AdminJobs = () => {
    useGetAllAdminJobs();
    const { allAdminJobs, searchTextByJob } = useSelector((state) => state.job);
    const [filterJob, setFilterJob] = useState(allAdminJobs);
    const [input, setinput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const filteredJob =
            allAdminJobs.length >= 0 &&
            allAdminJobs.filter((item) => {
                if (!searchTextByJob) {
                    return true;
                }
                return item?.company?.name
                    ?.toLowerCase()
                    .includes(searchTextByJob.toLowerCase());
            });
        setFilterJob(filteredJob);
        dispatch(setTextByJob(input));
    }, [input, allAdminJobs, searchTextByJob]);

    return (
        <>
            <div className="flex relative flex-col w-full h-[100vh] overflow-hidden">
                <Navbar Option={true} />
                <div className="flex w-full flex-col mt-[110px] px-[200px] h-full overflow-y-auto">
                    <div className="flex items-center w-full justify-between">
                        <input
                            type="text"
                            placeholder="Filter by name, role"
                            className="border rounded-md p-2"
                            onChange={(e) => {
                                setinput(e.target.value);
                            }}
                        />
                        <button
                            onClick={() => {
                                navigate("/admin/job/create");
                            }}
                            className="btn bg-[#101120] text-white hover:bg-[#1e1f39]"
                        >
                            New Jobs
                        </button>
                    </div>
                    <div className="flex relative items-center justify-between mt-[28px] border-b pb-3 text-gray-500 font-semibold px-2">
                        <span>Logo</span>
                        <span>Name</span>
                        <span>Date</span>
                        <span>Action</span>
                    </div>
                    {filterJob?.length <= 0 ? (
                        <span className="w-full items-center text-center py-3 border-b">
                            You haven't registered any job yet.
                        </span>
                    ) : (
                        filterJob?.map((item) => {
                            return (
                                <>
                                    <AdminJobTable
                                        item={item}
                                        key={item?._id}
                                    />
                                </>
                            );
                        })
                    )}
                    {filterJob?.length <= 0 ? (
                        ""
                    ) : (
                        <div className="flex w-full items-center justify-center mt-5">
                            <h1 className="text-gray-500 text-[14px]">
                                A list of your recent registerd companies
                            </h1>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default AdminJobs;
