import { createSlice } from "@reduxjs/toolkit";

const comapnySlice = createSlice({
    name: "company",
    initialState: {
        singleCompany: null,
        allCompany: [],
        searchCompanyByText: "",
    },
    reducers: {
        setSingleCompany: (state, action) => {
            state.singleCompany = action.payload;
        },
        setAllCompany: (state, action) => {
            state.allCompany = action.payload;
        },
        setSearchCompanyByText: (state, action) => {
            state.searchCompanyByText = action.payload;
        },
    },
});
export const { setSingleCompany, setAllCompany, setSearchCompanyByText } =
    comapnySlice.actions;
export default comapnySlice.reducer;
