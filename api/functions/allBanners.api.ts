import { bannerProps } from "@/typeScript/cms.interface"
import axiosInstance from "../axios/axios"
import { endpoints } from "../endPoints/endPoints"

export const allBannersAPICall = async () => {
    const res = await axiosInstance.get<bannerProps>(endpoints.content.banner)
    // console.log('allBlogsAPICall res', res);
    return res.data
}