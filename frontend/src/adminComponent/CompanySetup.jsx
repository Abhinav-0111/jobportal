import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import useGetCompanyById from "../hooks/useGetCompanyById";
import { useSelector } from "react-redux";

const CompanySetup = () => {
    const { singleCompany } = useSelector((state) => state.company);
    const [companyName, setcompanyName] = useState("");
    const [description, setdescription] = useState("");
    const [website, setwebsite] = useState("");
    const [location, setlocation] = useState("");
    const [logo, setlogo] = useState("");
    const [loading, setloading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useGetCompanyById(id);

    useEffect(() => {
        setcompanyName(singleCompany?.name || "");
        setwebsite(singleCompany?.website || "");
        setdescription(singleCompany?.description || "");
        setlocation(singleCompany?.location || "");
    }, [singleCompany]);

    const submitHandler = async () => {
        const formData = new FormData();
        formData.append("name", companyName);
        formData.append("description", description);
        formData.append("website", website);
        formData.append("location", location);
        if (logo) {
            formData.append("logo", logo);
        }
        try {
            setloading(true);
            const res = await axios.put(
                `http://localhost:8000/updatecompany/${id}`,
                formData
            );
            if (res.status === 200) {
                toast.success(res?.data?.Message);
                navigate("/admin/companies");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setloading(false);
        }
    };
    return (
        <>
            <div className="flex flex-col w-full h-[100vh]">
                <Navbar Option={true} />
                <div className="flex flex-col w-full mt-[130px] px-[320px]">
                    <div className="flex items-center">
                        <button
                            onClick={() => {
                                navigate("/admin/companies");
                            }}
                            className="btn bg-white"
                        >
                            <IoMdArrowBack size={20} />
                            Back
                        </button>
                        <h1 className="text-[18px] font-bold ml-4">
                            Company Setup
                        </h1>
                    </div>
                    <div className="grid grid-cols-2 w-full mt-8 gap-3">
                        <div className="flex flex-col">
                            <label className="font-semibold">
                                Company Name
                            </label>
                            <input
                                type="text"
                                value={companyName}
                                onChange={(e) => setcompanyName(e.target.value)}
                                className="border p-2 mt-1 rounded-md"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="font-semibold">Description</label>
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setdescription(e.target.value)}
                                className="border p-2 mt-1 rounded-md"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="font-semibold">Website</label>
                            <input
                                type="text"
                                value={website}
                                onChange={(e) => setwebsite(e.target.value)}
                                className="border p-2 mt-1 rounded-md"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="font-semibold">Location</label>
                            <input
                                type="text"
                                value={location}
                                onChange={(e) => setlocation(e.target.value)}
                                className="border p-2 mt-1 rounded-md"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="font-semibold">Logo</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setlogo(e.target.files[0])}
                                className="border p-2 mt-1 rounded-md"
                            />
                        </div>
                    </div>
                    <button
                        onClick={submitHandler}
                        className="btn mt-8 text-white bg-[#101120] hover:bg-[#101120e2]"
                    >
                        {loading ? (
                            <span className="loading loading-spinner loading-md"></span>
                        ) : (
                            "Update"
                        )}
                    </button>
                </div>
            </div>
        </>
    );
};
export default CompanySetup;
