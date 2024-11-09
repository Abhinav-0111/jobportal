import React, { useState } from "react";
import ContextApi from "./contextApi";
import { useSelector } from "react-redux";

const ContextState = (props) => {
    const [categories, setcategories] = useState("Home");
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);

    const handleCategories = (item) => {
        setcategories(item);
    };
    return (
        <>
            <ContextApi.Provider
                value={{
                    open,
                    setOpen,
                    handleCategories,
                    categories,
                    open2,
                    setOpen2,
                }}
            >
                {props.children}
            </ContextApi.Provider>
        </>
    );
};

export default ContextState;
