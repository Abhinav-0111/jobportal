import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllJobs } from "../redux/jobSlice";

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { searchQuery } = useSelector((state) => state.job);
    const fetchAllJobs = async () => {
        try {
            const res = await axios.get(
                `http://localhost:8000/getAllJobs?keyword=${searchQuery}`
            );
            if (res.status === 200) {
                dispatch(getAllJobs(res?.data));
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (user) {
            fetchAllJobs();
        }
    }, [searchQuery]);
};

export default useGetAllJobs;
