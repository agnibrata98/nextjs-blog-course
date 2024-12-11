import { IAddUnlikesProps } from "@/typeScript/cms.interface";
import axiosInstance from "../axios/axios";
import { endpoints } from "../endPoints/endPoints";

export const addUnlikesFn = async (id: string) => {
    const res = await axiosInstance.put<IAddUnlikesProps>(`${endpoints.blogs.unlike}/${id}`);
    return res.data;
};