import { categoryPostProps, IAllCategoryPostProps } from "@/typeScript/cms.interface";
import axiosInstance from "../axios/axios";
import { endpoints } from "../endPoints/endPoints";

export const blogsByCategoryAPICall = async (id : string) => {
    const res = await axiosInstance.get<categoryPostProps>(`${endpoints.blogs.postByCategory}/${id}`)
    // console.log('blogDetailsApiCall res', res);
    return res.data;
}