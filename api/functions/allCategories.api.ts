import { allCategoryProps } from "@/typeScript/cms.interface"
import axiosInstance from "../axios/axios"
import { endpoints } from "../endPoints/endPoints"

export const allCategoriesAPICall = async () => {
    const res = await axiosInstance.get<allCategoryProps>(endpoints.blogs.showAllCategory)
    // console.log('allBlogsAPICall res', res);
    return res.data;
}