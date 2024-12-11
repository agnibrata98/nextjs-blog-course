import { createStudentProps } from "@/typeScript/crud.interface";
import { MutationFunction } from "@tanstack/react-query";
import axiosInstance from "../axios/axios";
import { endpoints } from "../endPoints/endPoints";


export const createStudentFn: MutationFunction<createStudentProps> = async payload => {
  const res = await axiosInstance.post<createStudentProps>(
    endpoints.crud.addstudent,
    payload
  );

  return res.data;
};