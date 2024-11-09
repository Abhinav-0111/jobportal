import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { useNavigate } from "react-router-dom";
import useGetAllCompany from "../hooks/useGetAllCompany";
import { useDispatch, useSelector } from "react-redux";
import { setSearchCompanyByText } from "../redux/companySlice";
import JobList from "./JobList";
import useGetAllAdminJobs from "../hooks/useGetAllAdminJobs";

const AdminCompany = () => {
    const { allCompany, searchCompanyByText } = useSelector(
        (state) => state.company
    );
    // const { allAdminJobs, searchTextByJob } = useSelector((state) => state.job);

    const [filterCompany, setFilterCompany] = useState(allCompany);
    const [input, setinput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useGetAllCompany();

    useEffect(() => {
        const filteredCompany =
            allCompany.length >= 0 &&
            allCompany.filter((item) => {
                if (!searchCompanyByText) {
                    return true;
                }
                return item?.name
                    ?.toLowerCase()
                    .includes(searchCompanyByText.toLowerCase());
            });
        setFilterCompany(filteredCompany);
        dispatch(setSearchCompanyByText(input));
    }, [input, allCompany, searchCompanyByText]);

    return (
        <>
            <div className="flex relative flex-col w-full h-[100vh] overflow-hidden">
                <Navbar Option={true} />
                <div className="flex w-full flex-col mt-[110px] px-[200px] h-full overflow-y-auto">
                    <div className="flex items-center w-full justify-between">
                        <input
                            type="text"
                            placeholder="Filter by name"
                            className="border rounded-md p-2"
                            onChange={(e) => {
                                setinput(e.target.value);
                            }}
                        />
                        <button
                            onClick={() => {
                                navigate("/admin/companies/create");
                            }}
                            className="btn bg-[#101120] text-white hover:bg-[#1e1f39]"
                        >
                            New Company
                        </button>
                    </div>
                    <div className="flex relative items-center justify-between mt-[28px] border-b pb-3 text-gray-500 font-semibold px-2">
                        <span>Logo</span>
                        <span>Name</span>
                        <span>Date</span>
                        <span>Action</span>
                    </div>
                    {filterCompany.length <= 0 ? (
                        <span className="w-full items-center text-center py-3 border-b">
                            You haven't registered any company yet.
                        </span>
                    ) : (
                        filterCompany.map((item) => {
                            return (
                                <>
                                    <JobList
                                        item={item}
                                        key={item?._id}
                                    />
                                </>
                            );
                        })
                    )}
                    {filterCompany.length <= 0 ? (
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

export default AdminCompany;
