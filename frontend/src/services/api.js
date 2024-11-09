import axios from "axios";
import { toast } from "react-toastify";

const URL = "http://localhost:8000";
export const authenticationSignup = async (file) => {
    try {
        return await axios.post(`${URL}/signup`, file);
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.Message);
        return error.response;
    }
};

export const authenticationLogin = async (file) => {
    try {
        return await axios.post(`${URL}/login`, file);
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.Message);
        return error.response;
    }
};
