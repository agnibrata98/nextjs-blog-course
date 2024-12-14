// import { allTeamMembersQuery } from '@/customHooks/cms.query.hooks'
// import { Box, Card, CardContent, CardMedia, Grid, IconButton, Typography } from '@mui/material'
// import FacebookIcon from '@mui/icons-material/Facebook';
// import XIcon from '@mui/icons-material/X';
// import LinkedInIcon from '@mui/icons-material/LinkedIn';
// import MailIcon from '@mui/icons-material/Mail';
// import React from 'react'

// const TeamMembers = () => {
//     const { data: allTeamMembersData, isPending: allTeamMembersPending } = allTeamMembersQuery()
//     const allTeamMembers = allTeamMembersData?.TeamMember || []
//     console.log(allTeamMembers, "allTeamMembersData");
//   return (
//     <div>
//         <Typography variant='h3' gutterBottom textAlign={'center'}>Team Members</Typography>
//         <Grid container spacing={2} mt={2}>
//             {
//                 Array.isArray(allTeamMembers) && allTeamMembers.map((teamMember) => (
//                     <Grid item xs={12} md={6} lg={4} xl={3} alignItems={'center'} justifyContent={'center'}>
//                         <div key={teamMember._id}>
//                             <Card sx={{ maxWidth: 320, boxShadow: 2, borderRadius: 2, backgroundColor: '#fff' }}>
//                                 <CardMedia
//                                 component="img"
//                                 height="140"
//                                 image={`https://avatar.iran.liara.run/public/boy?username=${teamMember.slug}`}
//                                 alt={teamMember.name}
//                                 sx={{ objectFit: 'contain', mt: 2 }}
//                                 />
//                                 <CardContent>
//                                 <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
//                                     {teamMember.name}
//                                 </Typography>
//                                 <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 2 }}>
//                                     {teamMember.possession}
//                                 </Typography>

//                                 {/* {/ Social Links /} */}
//                                 <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
//                                     <IconButton sx={{ color: '#3b5998' }}>
//                                         <FacebookIcon />
//                                     </IconButton>
//                                     <IconButton sx={{ color: '#00acee' }}>
//                                         <XIcon />
//                                     </IconButton>
//                                     <IconButton sx={{ color: '#0077b5' }}>
//                                         <LinkedInIcon />
//                                     </IconButton>
//                                     <IconButton sx={{ color: '#D44638' }}>
//                                         <MailIcon />
//                                     </IconButton>
//                                 </Box>
//                                 </CardContent>
//                             </Card>
//                         </div>
//                     </Grid>
//                 ))
//             }
//         </Grid>
//     </div>
//   )
// }

// export default TeamMembers


import { allTeamMembersQuery } from '@/customHooks/cms.query.hooks'
import { Box, Card, CardContent, CardMedia, Grid, IconButton, Typography } from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MailIcon from '@mui/icons-material/Mail';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const TeamMembers = () => {
    // for team members fetching query
    const { data: allTeamMembersData, isPending: allTeamMembersPending } = allTeamMembersQuery();
    const allTeamMembers = allTeamMembersData?.TeamMember || [];

    // Refs for GSAP animations
    const cardRefs = useRef<HTMLDivElement[]>([]);

    // Initialize GSAP animations on component mount
    useEffect(() => {
        cardRefs.current.forEach((card, index) => {
            gsap.from(card, {
                opacity: 0,
                y: 30,
                delay: index * 0.1, // Stagger the animation for each card
                duration: 0.8,
                ease: 'power2.out',
            });
        });
    }, []);

  return (
    <div>
        <Typography variant='h3' gutterBottom textAlign={'center'} sx={{ fontWeight: 'bold', color: '#333' }}>
            Team Members
        </Typography>
        <Grid container spacing={2} mt={2}>
            {
                Array.isArray(allTeamMembers) && allTeamMembers.map((teamMember, index) => (
                    <Grid item xs={12} md={6} lg={4} xl={3} alignItems={'center'} justifyContent={'center'} key={teamMember._id}>
                        <div 
                        // ref={(el) => cardRefs.current[index] = el!}
                        ref={(el) => {
                            if (el) cardRefs.current[index] = el
                          }}
                        >
                            <Card sx={{
                                maxWidth: 320, boxShadow: 2, borderRadius: 2, backgroundColor: '#fff',
                                '&:hover': {
                                    boxShadow: '0px 15px 30px rgba(0, 0, 0, 0.2)',
                                    transform: 'scale(1.05)',
                                    transition: 'all 0.3s ease-in-out',
                                }
                            }}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={`https://avatar.iran.liara.run/public/boy?username=${teamMember.slug}`}
                                    alt={teamMember.name}
                                    sx={{
                                        objectFit: 'contain',
                                        mt: 2,
                                        borderRadius: '50%',
                                        border: '3px solid #f1f1f1'
                                    }}
                                />
                                <CardContent>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333', mb: 1 }}>
                                        {teamMember.name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 2 }}>
                                        {teamMember.possession}
                                    </Typography>

                                    {/* Social Links */}
                                    <Box sx={{
                                        display: 'flex', justifyContent: 'center', gap: 2, color: '#333',
                                        '& .MuiSvgIcon-root': {
                                            fontSize: '1.5rem',
                                        }
                                    }}>
                                        <IconButton sx={{ color: '#3b5998' }}>
                                            <FacebookIcon />
                                        </IconButton>
                                        <IconButton sx={{ color: '#00acee' }}>
                                            <XIcon />
                                        </IconButton>
                                        <IconButton sx={{ color: '#0077b5' }}>
                                            <LinkedInIcon />
                                        </IconButton>
                                        <IconButton sx={{ color: '#D44638' }}>
                                            <MailIcon />
                                        </IconButton>
                                    </Box>
                                </CardContent>
                            </Card>
                        </div>
                    </Grid>
                ))
            }
        </Grid>
    </div>
  );
}

export default TeamMembers;
