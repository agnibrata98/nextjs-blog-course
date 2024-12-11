// import { allServicesQuery } from '@/customHooks/cms.query.hooks';
// import {
//   Card,
//   CardContent,
//   CardMedia,
//   CircularProgress,
//   Container,
//   Grid,
//   Typography,
//   Box,
//   Button,
// } from '@mui/material';
// import React, { useState } from 'react';

// const Services = () => {
//   const [expanded, setExpanded] = useState<Record<string, boolean>>({});

//   const truncateText = (text: string, limit: number) =>
//     text.length > limit ? `${text.substring(0, limit)}...` : text;

//   const toggleReadMore = (id: string) => {
//     setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
//   };

//   const { data: allServicesData, isPending: allServicesDataPending } = allServicesQuery();
//   const services = allServicesData?.data || [];

//   if (allServicesDataPending) {
//     return (
//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           height: '100vh',
//         }}
//       >
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <Box
//       sx={{
//         marginTop: '4rem',
//         marginBottom: '4rem',
//         backgroundColor: '#f9f9f9',
//         padding: '2rem',
//         borderRadius: '10px',
//         boxShadow: 2,
//       }}
//     >
//       <Container maxWidth="lg">
//         <Typography
//           variant="h4"
//           gutterBottom
//           sx={{
//             fontWeight: 'bold',
//             color: '#333',
//             textAlign: 'center',
//             marginBottom: '2rem',
//           }}
//         >
//           Our Services
//         </Typography>

//         <Grid container spacing={3} justifyContent="center">
//           {Array.isArray(services) && services.length > 0 ? (
//             services.map((service) => (
//               <Grid item xs={12} sm={6} md={4} key={service._id}>
//                 <Card
//                   sx={{
//                     borderRadius: '10px',
//                     boxShadow: 3,
//                     transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//                     '&:hover': {
//                       transform: 'scale(1.05)',
//                       boxShadow: 6,
//                     },
//                   }}
//                 >
//                   <CardMedia
//                     component="img"
//                     height="180"
//                     image="https://random.imagecdn.app/500/150"
//                     alt={service.name}
//                     sx={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}
//                   />
//                   <CardContent>
//                     <Typography
//                       variant="h6"
//                       component="div"
//                       sx={{ fontWeight: 'bold', color: '#007bff', marginBottom: 1 }}
//                     >
//                       {service.name}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 2 }}>
//                       {expanded[service._id]
//                         ? service.details
//                         : truncateText(service.details, 50)}
//                     </Typography>
//                     {service.details.length > 50 && (
//                       <Button
//                         onClick={() => toggleReadMore(service._id)}
//                         size="small"
//                         sx={{
//                           textTransform: 'none',
//                           color: '#007bff',
//                           padding: 0,
//                           minWidth: 'auto',
//                           textDecoration: 'underline',
//                         }}
//                       >
//                         {expanded[service._id] ? 'Read Less' : 'Read More'}
//                       </Button>
//                     )}
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))
//           ) : (
//             <Typography variant="body1" color="text.secondary">
//               No services available.
//             </Typography>
//           )}
//         </Grid>
//       </Container>
//     </Box>
//   );
// };

// export default Services;


import { allServicesQuery } from '@/customHooks/cms.query.hooks';
import {
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Grid,
  Typography,
  Box,
  Button,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const Services = () => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const truncateText = (text: string, limit: number) =>
    text.length > limit ? `${text.substring(0, limit)}...` : text;

  const toggleReadMore = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const { data: allServicesData, isPending: allServicesDataPending } = allServicesQuery();
  const services = allServicesData?.data || [];

  useEffect(() => {
    if (cardsRef.current) {
      gsap.from(cardsRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.2,
        ease: 'power2.out',
      });
    }
  }, [services]);

  if (allServicesDataPending) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        marginTop: '4rem',
        marginBottom: '4rem',
        backgroundColor: '#f3f4f6',
        padding: '2rem',
        borderRadius: '10px',
        boxShadow: 2,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: '#1a202c',
            textAlign: 'center',
            marginBottom: '2rem',
            textShadow: '2px 2px 6px rgba(0, 0, 0, 0.2)',
          }}
        >
          Our Services
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {Array.isArray(services) && services.length > 0 ? (
            services.map((service, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={service._id}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el
                }}
              >
                <Card
                  sx={{
                    borderRadius: '15px',
                    boxShadow: 4,
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: 8,
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="180"
                    image="https://random.imagecdn.app/500/150"
                    alt={service.name}
                    sx={{
                      borderTopLeftRadius: '15px',
                      borderTopRightRadius: '15px',
                      filter: 'grayscale(0.2)',
                      transition: 'filter 0.3s ease',
                      '&:hover': { filter: 'grayscale(0)' },
                    }}
                  />
                  <CardContent>
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{
                        fontWeight: 'bold',
                        color: '#3182ce',
                        marginBottom: 1,
                        textAlign: 'center',
                      }}
                    >
                      {service.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ marginBottom: 2, textAlign: 'justify' }}
                    >
                      {expanded[service._id]
                        ? service.details
                        : truncateText(service.details, 100)}
                    </Typography>
                    {service.details.length > 100 && (
                      <Box textAlign="center">
                        <Button
                          onClick={() => toggleReadMore(service._id)}
                          size="small"
                          sx={{
                            textTransform: 'none',
                            color: '#3182ce',
                            padding: '0.5rem 1rem',
                            borderRadius: '20px',
                            border: '1px solid #3182ce',
                            transition: 'background-color 0.3s ease, color 0.3s ease',
                            '&:hover': {
                              backgroundColor: '#3182ce',
                              color: '#fff',
                            },
                          }}
                        >
                          {expanded[service._id] ? 'Read Less' : 'Read More'}
                        </Button>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="body1" color="text.secondary">
              No services available.
            </Typography>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default Services;
