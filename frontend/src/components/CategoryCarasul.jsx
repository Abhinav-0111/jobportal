import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "../styles.css";
// import required modules
import { Pagination } from "swiper/modules";
import { category } from "../services/contants";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchQuery } from "../redux/jobSlice";

const CategoryCarasul = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const serachJobHandler = (query) => {
        dispatch(setSearchQuery(query));
        navigate("/browse");
    };
    return (
        <>
            <div className="flex w-full justify-center">
                <div className="flex w-[40%] h-[125px]">
                    <Swiper
                        slidesPerView={3}
                        spaceBetween={30}
                        loop={true}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Pagination]}
                        className="mySwiper"
                    >
                        {category.map((item, index) => {
                            return (
                                <>
                                    <SwiperSlide>
                                        <div
                                            key={index}
                                            onClick={() => {
                                                serachJobHandler(item);
                                            }}
                                            className="flex p-2 items-center justify-center cursor-pointer border border-gray-200 rounded-full text-[16px] font-semibold"
                                        >
                                            {item}
                                        </div>
                                    </SwiperSlide>
                                </>
                            );
                        })}
                    </Swiper>
                </div>
            </div>
        </>
    );
};

export default CategoryCarasul;
