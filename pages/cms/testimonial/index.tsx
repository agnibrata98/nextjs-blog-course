import { allTestimonialsQuery } from '@/customHooks/cms.query.hooks'
import TestimonialCards from '@/ui/cards/testimonialCards';
import ErrorPage from '@/ui/errors/Error';
import { Box, CircularProgress, Typography } from '@mui/material';
import React from 'react'

const Testimonial = () => {
    // for testimonial fetching query
    const { data: allTestimonialsData, isPending: allTestimonialsDataPending, isError: isAllTestimonialsDataError, error: allTestimonialsDataError } = allTestimonialsQuery()

    const allTestimonials = allTestimonialsData?.testimonials || [];

    // console.log(allTestimonials, "allTestimonialsData");

    if (allTestimonialsDataPending) {
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

      if (isAllTestimonialsDataError) {
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <ErrorPage errorMessage={(allTestimonialsDataError as Error).message || 'An error occurred'} />
        </Box>
      );
    }
  return (
    <>
        <Typography variant='h3' gutterBottom textAlign={'center'} sx={{ fontWeight: 'bold', color: '#333' }}>
            Testimonial
        </Typography>
        <div style={{display:"flex", flexWrap:"wrap", gap:"20px"}}>
        {
            Array.isArray(allTestimonials) && allTestimonials.length > 0 ? (
                allTestimonials.map((testimonial, index) => (
                    <div key={index}>
                        <TestimonialCards {...testimonial}/>
                    </div>
                ))
            ) : (
                <p>No testimonials found</p>
            )
        }
        </div>
        
    </>
  )
}

export default Testimonial


