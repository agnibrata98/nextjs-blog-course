// import React from "react";
// import { Box, Typography, Button, Container } from "@mui/material";
// import { keyframes } from "@emotion/react";

// const fadeIn = keyframes`
//   from {
//     opacity: 0;
//     transform: translateY(-20px);
//   }
//   to {
//     opacity: 1;
//     transform: translateY(0);
//   }
// `;

// const ErrorPage = ({ errorMessage }: { errorMessage: string }) => {
//   const handleGoBack = () => {
//     window.history.back();
//   };

//   return (
//     <Container
//       maxWidth="md"
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         height: "100vh",
//         textAlign: "center",
//         animation: `${fadeIn} 0.8s ease-in-out`,
//       }}
//     >
//       {/* <Box
//         sx={{
//           position: "relative",
//           mb: 4,
//         }}
//       >
//         <Box
//           component="div"
//           sx={{
//             fontSize: "150px",
//             fontWeight: "bold",
//             color: "primary.main",
//             position: "absolute",
//             top: 0,
//             left: 0,
//             right: 0,
//             animation: `${fadeIn} 1.2s ease-in-out`,
//           }}
//         >
//           404
//         </Box>
//       </Box> */}

//       <Typography
//         variant="h4"
//         sx={{
//           fontWeight: "bold",
//           color: "text.primary",
//           mb: 2,
//           animation: `${fadeIn} 1.4s ease-in-out`,
//         }}
//       >
//         Oops! Something Went Wrong
//       </Typography>
//       <Typography
//         variant="body1"
//         sx={{
//           color: "text.secondary",
//           mb: 4,
//           animation: `${fadeIn} 1.6s ease-in-out`,
//         }}
//       >
//         {errorMessage}
//       </Typography>
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={handleGoBack}
//         sx={{
//           textTransform: "uppercase",
//           padding: "10px 20px",
//           animation: `${fadeIn} 1.8s ease-in-out`,
//         }}
//       >
//         Go Back
//       </Button>
//     </Container>
//   );
// };

// export default ErrorPage;

import React, { useEffect, useRef } from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { gsap } from "gsap";

const ErrorPage = ({ errorMessage }: { errorMessage: string }) => {
  const containerRef = useRef(null); // For overall animation
  const textRef = useRef<HTMLDivElement | null>(null); // For text animation
  const buttonRef = useRef<HTMLButtonElement | null>(null); // For button animation

  useEffect(() => {
    const timeline = gsap.timeline({ defaults: { ease: "power2.out" } });

    // Heading Animation
    timeline.fromTo(
      containerRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 1 }
    );

    // Text Animation
    if (textRef.current) {
      gsap.fromTo(
        textRef.current.children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.3, // Stagger for child elements
          duration: 0.8,
        }
      );
    }

    // Button Animation
    gsap.fromTo(
      buttonRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.6, delay: 1.5 }
    );
  }, []);

  // const handleGoBack = () => {
  //   window.history.back();
  // };

  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      // Fallback to a specific page if no history exists
      window.location.href = '/'; // Replace '/' with your desired fallback URL
    }
  };

  return (
    <Container
      maxWidth="md"
      ref={containerRef}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        gap: 2,
      }}
    >
      {/* <Box
        sx={{
          fontSize: "120px",
          fontWeight: "bold",
          color: "primary.main",
          textShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
        }}
      >
        404
      </Box> */}

      <Box ref={textRef}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "text.primary",
          }}
        >
          Oops! Something Went Wrong
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            maxWidth: "500px",
            margin: "0 auto",
          }}
        >
          {errorMessage}
        </Typography>
      </Box>

      <Button
        ref={buttonRef}
        variant="contained"
        color="primary"
        onClick={handleGoBack}
        sx={{
          textTransform: "uppercase",
          padding: "10px 20px",
        }}
      >
        Go Back
      </Button>
    </Container>
  );
};

export default ErrorPage;

