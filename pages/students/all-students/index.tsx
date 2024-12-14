import React, { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  Button,
  CircularProgress,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { allStudentsQuery, deleteStudentMutation } from "@/customHooks/crud.query.hooks";
import Link from "next/link";
import { useRouter } from "next/router";
import SweetAlertComponent from "@/ui/sweetAlert/SweetAlert";
import ErrorPage from "@/ui/errors/Error";
import toast from "react-hot-toast";
import { set } from "react-hook-form";

const AllStudents = () => {
  // for state management hook
  const [modal, setModal] = useState(false);
  //  for delete id state management
  const [deleteId, setDeleteId] = useState<string | null>(null); 

  // for router navigation
  const router = useRouter();
  // for query params
  const { slug } = router.query;

  // for query fetching for students
  const { data: allStudentsData, isPending: allStudentsPending, isError: isAllStudentsDataError ,error: allStudentsError, refetch: studentsRefetch } = allStudentsQuery();

  // for delete student mutation
  const {mutate: deleteStudentMutate, isPending: deleteStudentPending, isError: isDeleteStudentError, error: deleteStudentError } = deleteStudentMutation(slug as string);
  // console.log(allStudentsError, "error");

  const allStudents = allStudentsData?.data || [];

  // for confirm delete function
  const confirmDelete = (id: string) => {
    deleteStudentMutate(id as any, {
      onSuccess: () => {
        studentsRefetch(); // Refresh the student list
        setModal(false); // Close the SweetAlert modal
      },
      // onError: (error : any) => {
      //   toast.error("Error deleting student:", error.message);
      //   setModal(false); // Close the SweetAlert modal
      // }
    });
  };

  // for handle delete click for id setting and activating modal(sweet alert)
  const handleDeleteClick = (id: string) => {
    setDeleteId(id); // Set the ID of the student to delete
    setModal(true); // Show the SweetAlert modal
  };

  if (allStudentsPending) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

if (isAllStudentsDataError) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <ErrorPage errorMessage={(allStudentsError as Error).message || 'An error occurred'} />
    </Box>
  );
}

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          fontWeight: "bold",
          textAlign: "center",
          color: "primary.main",
        }}
      >
        All Students
      </Typography>

      {
        <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#5b636a" }}>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Name</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Email</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Phone</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Address</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>City</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Class</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allStudents.map((student) => (
                <TableRow key={student._id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.phone}</TableCell>
                  <TableCell>{student.address}</TableCell>
                  <TableCell>{student.city}</TableCell>
                  <TableCell>{student.class}</TableCell>
                  <TableCell style={{ display: "flex", justifyContent: "center" }}>
                    <Link href={'/students/all-students/' + student._id}>
                        <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        sx={{ mr: 1, backgroundColor: "#5b636a" }}
                        >
                        <EditIcon />
                        </Button>
                    </Link>
                    <Button variant="outlined" color="error" size="small">
                      <DeleteIcon onClick={() => handleDeleteClick(student._id)} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      }

      {modal && deleteId && (
        <SweetAlertComponent
          confirm={()=>confirmDelete(deleteId)}
          cancel={() => setModal(false)}
          title={"Are you sure?"}
          subtitle={"You will not be able to recover!"}
        />
      )}
    </Box>
  );
};

export default AllStudents;
