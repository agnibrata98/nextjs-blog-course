import { deleteStudentProps } from "@/typeScript/crud.interface";
import { MutationFunction } from "@tanstack/react-query";
import { endpoints } from "../endPoints/endPoints";
import axiosInstance from "../axios/axios";


export const deleteStudentFn: MutationFunction<deleteStudentProps> = async (id) => {
    const res = await axiosInstance.delete<deleteStudentProps>(`${endpoints.crud.deletestudent}/${id}`);
    return res.data;
};