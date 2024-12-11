import { servicesProps } from "@/typeScript/cms.interface";
import axiosInstance from "../axios/axios";
import { endpoints } from "../endPoints/endPoints";

export const allServicesAPICall = async () => {
    const res = await axiosInstance.get<servicesProps>(endpoints.content.service)
    // console.log('allBlogsAPICall res', res);
    return res.data;
}