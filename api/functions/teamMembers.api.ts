import { teamMemberProps } from "@/typeScript/cms.interface";
import axiosInstance from "../axios/axios";
import { endpoints } from "../endPoints/endPoints";


export const allTeammembersAPICall = async () => {
    const res = await axiosInstance.get<teamMemberProps>(endpoints.content.team)
    // console.log('allBlogsAPICall res', res);
    return res.data;
}