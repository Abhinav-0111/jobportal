import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllCompany } from "../redux/companySlice";

const useGetAllCompany = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const fetchAllCompany = async () => {
        try {
            const res = await axios.put(`http://localhost:8000/getcompany`, {
                id: user?._id,
            });
            if (res.status === 200) {
                dispatch(setAllCompany(res?.data));
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAllCompany();
    }, []);
};

export default useGetAllCompany;
