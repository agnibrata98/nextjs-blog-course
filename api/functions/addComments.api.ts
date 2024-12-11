import { MutationFunction } from "@tanstack/react-query";
import { endpoints } from "../endPoints/endPoints";
import axiosInstance from "../axios/axios";
import { addCommentProps } from "@/typeScript/cms.interface";

export const addCommentFn = async (id: string, payload: addCommentProps) => {
  const res = await axiosInstance.post<addCommentProps>(
    `${endpoints.blogs.addComment}/${id}/comment/create`,
    payload
  );

  return res.data;
};
