import { commentProps } from "@/typeScript/cms.interface";
import axiosInstance from "../axios/axios";
import { endpoints } from "../endPoints/endPoints";

export const allCommentsAPICall = async (id : string) => {
    const res = await axiosInstance.get<commentProps>(`${endpoints.blogs.showcomment}/${id}`)
    // console.log('allComments res', res);
    return res.data;
}