import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllCompany } from "../redux/companySlice";
import { getAllAdminJobs } from "../redux/jobSlice";

const useGetAllAdminJobs = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const fetchAllAdminJobs = async () => {
        try {
            const res = await axios.put(`http://localhost:8000/getAdminJob`, {
                id: user?._id,
            });
            if (res.status === 200) {
                dispatch(getAllAdminJobs(res?.data?.jobs));
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAllAdminJobs();
    }, []);
};

export default useGetAllAdminJobs;
