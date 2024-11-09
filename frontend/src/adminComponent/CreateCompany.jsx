import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setSingleCompany } from "../redux/companySlice";

const CreateCompany = () => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const [companyName, setcompanyName] = useState("");
    const dispatch = useDispatch();

    const registerNewComapny = async () => {
        try {
            const res = await axios.post(
                `http://localhost:8000/registercompany`,
                { id: user?._id, companyName }
            );
            if (res.status === 200) {
                toast.success(res?.data?.Message);
                dispatch(setSingleCompany(res?.data?.company));
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <div className="flex flex-col w-full h-[100vh] overflow-hidden">
                <Navbar Option={true} />
                <div className="flex flex-col mt-[120px] px-[320px]">
                    <h1 className="text-[25px] font-bold">Your Company Name</h1>
                    <p className="text-gray-500 text-[15px]">
                        What would you like to give your company name? you can
                        change this later.
                    </p>
                    <div className="flex flex-col mt-[35px] font-semibold">
                        <label>Company Name</label>
                        <input
                            type="text"
                            onChange={(e) => {
                                setcompanyName(e.target.value);
                            }}
                            placeholder="Google,Microsoft,Meta,Apple etc..."
                            className="border w-full py-2 px-3 rounded-md mt-1"
                        />
                    </div>
                    <div className="flex items-center mt-[25px] gap-4">
                        <button
                            onClick={() => {
                                navigate("/admin/companies");
                            }}
                            className="btn bg-white border"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={registerNewComapny}
                            className="btn bg-[#101120] text-white hover:bg-[#0e0f1ec7]"
                        >
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateCompany;
