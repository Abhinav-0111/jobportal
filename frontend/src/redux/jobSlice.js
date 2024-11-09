import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs: [],
        oneJob: [],
        allAdminJobs: [],
        searchTextByJob: "",
        allAppliedJobs: [],
        searchQuery: "",
    },
    reducers: {
        getAllJobs: (state, action) => {
            state.allJobs = action.payload;
        },
        getOneJob: (state, action) => {
            state.oneJob = action.payload;
        },
        getAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload;
        },
        setTextByJob: (state, action) => {
            state.searchTextByJob = action.payload;
        },
        getAllAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload;
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
    },
});

export const {
    getAllJobs,
    getOneJob,
    getAllAdminJobs,
    setTextByJob,
    getAllAppliedJobs,
    setSearchQuery,
} = jobSlice.actions;
export default jobSlice.reducer;
