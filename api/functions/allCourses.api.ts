import { coursesProps } from "@/typeScript/cms.interface";
import axiosInstance from "../axios/axios";
import { endpoints } from "../endPoints/endPoints";



export const allCoursesAPICall = async () => {
    const res = await axiosInstance.get<coursesProps>(endpoints.course.course)
    // console.log('allBlogsAPICall res', res);
    return res.data;
}