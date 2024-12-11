import { studentDetailsProps } from "@/typeScript/crud.interface";
import axiosInstance from "../axios/axios";
import { endpoints } from "../endPoints/endPoints";

export const studentDetailsAPICall = async (id : string) => {
    const res = await axiosInstance.get<studentDetailsProps>(`${endpoints.crud.editstudent}/${id}`)
    // console.log('blogDetailsApiCall res', res);
    return res.data;
}