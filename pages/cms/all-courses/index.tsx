import { allCoursesQuery } from '@/customHooks/cms.query.hooks';
import { DataGrid } from '@mui/x-data-grid';
import { Card, Typography, CircularProgress, Box } from '@mui/material';
import React from 'react';

const columns = [
  { field: 'name', headerName: 'Course Name', width: 200 },
  { field: 'requirement', headerName: 'Requirement', width: 200 },
  { field: 'duration', headerName: 'Duration', width: 150 },
  { field: 'fees', headerName: 'Fees', width: 150 },
];

const AllCourses = () => {
  // all courses query
  const { data: allCoursesData, isPending: allCoursesPending } = allCoursesQuery();
  const allCourses = allCoursesData?.Courses || [];

  return (
    <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', textAlign: 'center' }}>
        All Courses
      </Typography>

      <Card
        sx={{
          width: '100%',
          maxWidth: '800px',
          p: 2,
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: 'background.paper',
        }}
      >
        {
          allCoursesPending ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 300,
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
              <DataGrid
                  rows={allCourses?.map((course: any) => ({
                      id: course._id,
                      name: course.name,
                      requirement: course.requirement,
                      duration: course.duration,
                      fees: course.fees,
                  })) || []}
                  columns={columns}
                  autoPageSize
                  sx={{
                    '& .MuiDataGrid-root': {
                      border: 'none',
                    },
                    '& .MuiDataGrid-columnHeaders': {
                      backgroundColor: 'primary.main',
                      color: 'black',
                      fontSize: '16px',
                    },
                    '& .MuiDataGrid-row:hover': {
                      backgroundColor: 'action.hover',
                    },
                  }}
              />
          )
        }
      </Card>
    </Box>
  );
};

export default AllCourses;
