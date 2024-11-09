import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSingleCompany } from "../redux/companySlice";

const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch();
    const fetchSingleCompany = async () => {
        try {
            const res = await axios.get(
                `http://localhost:8000/getcompanybyid/${companyId}`
            );
            if (res.status === 200) {
                dispatch(setSingleCompany(res?.data));
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchSingleCompany();
    }, [companyId, dispatch]);
};

export default useGetCompanyById;
