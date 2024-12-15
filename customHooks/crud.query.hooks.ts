import { createStudentProps, deleteStudentProps, IcreateStudentProps, IshowAllStudentProps, IstudentDetailsProps, updateStudentProps } from "@/typeScript/crud.interface";
import { useMutation, UseMutationResult, useQuery, UseQueryResult } from "@tanstack/react-query";
import { useGlobalHooks } from "./globalHooks/globalHooks";
import { createStudentFn } from "@/api/functions/createStudent.api";
import { allStudentsAPICall } from "@/api/functions/allStudents.api";
import { studentDetailsAPICall } from "@/api/functions/studentDetails.api";
import { updateStudentFn } from "@/api/functions/updateStudent.api";
import { deleteStudentFn } from "@/api/functions/deleteStudent.api";

// for creating a new student query
export const createStudentMutation = (): UseMutationResult<createStudentProps, unknown> => {
    const { queryClient } = useGlobalHooks()
    // const cookie = new Cookies()
    return useMutation<createStudentProps, void, unknown>({
        mutationFn: createStudentFn,
        onSuccess: (res: IcreateStudentProps) => {
            const { success, msg } = res || {}
            if (success) {
                // cookie.set("token", token, { path: "/", secure: true })
                // console.log(res, "res");
            }
            queryClient.invalidateQueries({ queryKey: ["CREATE_STUDENT"] })
        }
    })

}

// for showing all students query
export const allStudentsQuery = (): UseQueryResult<IshowAllStudentProps, unknown> => {
    return useQuery({
      queryKey: ["ALL-STUDENTS"],
      queryFn: allStudentsAPICall
    });
};

// for showing student details query
export const studentDetailsQuery = (id: string): UseQueryResult<IstudentDetailsProps, unknown> => {
    return useQuery({
      queryKey: ["STUDENT-DETAILS", id],
      queryFn: () => studentDetailsAPICall(id)
    });
};

// for updating student query
export const updateStudentMutation = (id: string) => {
    const { queryClient } = useGlobalHooks();
    return useMutation({
        mutationFn: (payload: updateStudentProps) => updateStudentFn(id, payload),
        onSuccess: data => {
        queryClient.invalidateQueries({ queryKey: ["UPDATE-STUDENT"] });
        // console.log(data, "UPDATED STUDENT");
        }
    });
};

// for deleting student query
export const deleteStudentMutation = (id: string): UseMutationResult<deleteStudentProps, unknown, deleteStudentProps> => {
    const { queryClient } = useGlobalHooks()
    return useMutation<deleteStudentProps, unknown, deleteStudentProps>({
        mutationFn: (id) => deleteStudentFn(id),
        onSuccess: (res) => {
            const { status, message } = res || {}
            if (status === true) {
                // console.log(res, "res");
                // console.log(message, "message");
            }
            queryClient.invalidateQueries({ queryKey: ["DELETE-STUDENT"] })
        }
    })
}