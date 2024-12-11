import { latestBlogsProps } from "@/typeScript/cms.interface";
import { endpoints } from "../endPoints/endPoints";
import axiosInstance from "../axios/axios";


export const latestBlogsAPICall = async () => {
    const res = await axiosInstance.get<latestBlogsProps>(endpoints.blogs.letestPost)
    // console.log('allBlogsAPICall res', res);
    return res.data;
}