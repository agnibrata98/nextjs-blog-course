import { testimonialProps } from "@/typeScript/cms.interface";
import axiosInstance from "../axios/axios";
import { endpoints } from "../endPoints/endPoints";

export const allTestimonialsAPICall = async () => {
    const res = await axiosInstance.get<testimonialProps>(endpoints.content.testimonial)
    // console.log('allBlogsAPICall res', res);
    return res.data;
}