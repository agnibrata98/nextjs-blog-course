import { contactProps } from "@/typeScript/cms.interface";
import { MutationFunction } from "@tanstack/react-query";
import { endpoints } from "../endPoints/endPoints";
import axiosInstance from "../axios/axios";

export const addContactFn: MutationFunction<contactProps> = async payload => {
    const res = await axiosInstance.post<contactProps>(
      endpoints.content.contact,
      payload
    );
  
    return res.data;
  };