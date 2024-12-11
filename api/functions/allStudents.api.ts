import { showAllStudentProps } from "@/typeScript/crud.interface"
import axiosInstance from "../axios/axios"
import { endpoints } from "../endPoints/endPoints"


export const allStudentsAPICall = async () => {
    const res = await axiosInstance.get<showAllStudentProps>(endpoints.crud.allstudent)
    // console.log('allBlogsAPICall res', res);
    return res.data;
}
