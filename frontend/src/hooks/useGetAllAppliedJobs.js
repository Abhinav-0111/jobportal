import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAppliedJobs } from "../redux/jobSlice";

const useGetAllAppliedJobs = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const res = await axios.post(
                    `http://localhost:8000/getApplyJob`,
                    {
                        id: user?._id,
                    }
                );
                if (res?.status === 200) {
                    dispatch(getAllAppliedJobs(res?.data?.Message));
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchAppliedJobs();
    }, []);
};

export default useGetAllAppliedJobs;
