// import SweetAlert from "react-bootstrap-sweetalert";
// import React, { useState } from "react";

// function SweetAlertComponent({ confirm: any, cancel: any, title: any, subtitle: any, type: any }) {
//   const [fadeOut, setFadeOut] = useState(false); // State to control fade-out effect

//   const alertStyles = {
//     zIndex: "1",
//     fontFamily: "'Roboto', sans-serif",
//     transition: "opacity 0.5s ease", // Smooth transition for opacity
//     opacity: fadeOut ? 0 : 1, // Change opacity based on fadeOut state
//   };

//   const confirmButtonStyles = {
//     backgroundColor: "maroon",
//     border: "2px solid orangered",
//     color: "#fff",
//     "&:hover": {
//       backgroundColor: "darkred",
//     },
//   };

//   const cancelButtonStyles = {
//     backgroundColor: "lightgray",
//     border: "none",
//     color: "black",
//     "&:hover": {
//       backgroundColor: "gray",
//     },
//   };

//   const handleConfirm = () => {
//     setFadeOut(true); // Trigger fade-out animation
//     setTimeout(() => {
//       confirm(); // Call confirm after fade-out is complete
//     }, 500); // Duration should match the CSS transition duration
//   };

//   return (
//     <SweetAlert
//       style={alertStyles}
//       title={title}
//       onConfirm={handleConfirm} // Use the new handleConfirm function
//       type={type !== undefined ? type : "warning"}
//       showCancel={true}
//       confirmBtnStyle={confirmButtonStyles}
//       cancelBtnStyle={cancelButtonStyles}
//       onCancel={cancel}
//       customIcon={type === "success" ? "✔️" : type === "danger" ? "❌" : "⚠️"} // Custom icon based on type
//     >
//       <h5 style={{ margin: 0, padding: '10px 0', color: type === "danger" ? "red" : "black" }}>
//         {subtitle}
//       </h5>
//     </SweetAlert>
//   );
// }

// export default SweetAlertComponent;


// import SweetAlert from "react-bootstrap-sweetalert";
// import React, { useState, CSSProperties, FC } from "react";

// interface SweetAlertProps {
//   confirm: () => void; // Function type for confirm action
//   cancel: () => void;  // Function type for cancel action
//   title: string;       // Title of the alert
//   subtitle: string;    // Subtitle of the alert
//   type?: "success" | "danger" | "warning" | undefined; // Alert type (optional)
// }

// const SweetAlertComponent: FC<SweetAlertProps> = ({
//   confirm,
//   cancel,
//   title,
//   subtitle,
//   type = "warning", // Default type is 'warning'
// }) => {
//   const [fadeOut, setFadeOut] = useState(false); // State to control fade-out effect

//   const alertStyles: CSSProperties = {
//     zIndex: 1,
//     fontFamily: "'Roboto', sans-serif",
//     transition: "all 0.5s ease-in-out", // Smooth transition for animation
//     transform: fadeOut ? "scale(0.9)" : "scale(1)", // Shrink on fade-out
//     opacity: fadeOut ? 0 : 1, // Fade-out effect
//     borderRadius: "12px", // Rounded corners for a modern look
//     boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)", // Subtle shadow
//     padding: "20px",
//   };

//   const confirmButtonStyles: CSSProperties = {
//     backgroundColor: "#e63946",
//     border: "none",
//     color: "#fff",
//     borderRadius: "5px",
//     padding: "10px 20px",
//     fontSize: "1rem",
//     transition: "all 0.3s ease-in-out",
//     boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
//     cursor: "pointer",
//   };

//   const cancelButtonStyles: CSSProperties = {
//     backgroundColor: "#a8dadc",
//     border: "none",
//     color: "#1d3557",
//     borderRadius: "5px",
//     padding: "10px 20px",
//     fontSize: "1rem",
//     transition: "all 0.3s ease-in-out",
//     boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
//     cursor: "pointer",
//   };

//   const handleConfirm = () => {
//     setFadeOut(true); // Trigger fade-out animation
//     setTimeout(() => {
//       confirm(); // Call confirm after fade-out is complete
//     }, 500); // Duration should match the CSS transition duration
//   };

//   const fadeInAnimation: CSSProperties = {
//     animation: "fadeIn 0.5s ease-in-out",
//   };

//   return (
//     <SweetAlert
//       style={{ ...alertStyles, ...fadeInAnimation }}
//       title={<span style={{ color: "#457b9d", fontWeight: "bold" }}>{title}</span>}
//       onConfirm={handleConfirm} // Use the new handleConfirm function
//       type={type}
//       showCancel={true}
//       confirmBtnStyle={confirmButtonStyles}
//       cancelBtnStyle={cancelButtonStyles}
//       onCancel={cancel}
//       customIcon={
//         <div
//           style={{
//             fontSize: "3rem",
//             color: type === "success" ? "#2a9d8f" : type === "danger" ? "#e63946" : "#e9c46a",
//           }}
//         >
//           {type === "success" ? "✔️" : type === "danger" ? "❌" : "⚠️"}
//         </div>
//       } // Custom icon based on type
//     >
//       <p style={{ margin: 0, padding: "10px 0", fontSize: "1.1rem", lineHeight: "1.5" }}>
//         {subtitle}
//       </p>
//     </SweetAlert>
//   );
// };

// export default SweetAlertComponent;

import SweetAlert from "react-bootstrap-sweetalert";
import React, { useState, CSSProperties, FC, useRef, useEffect } from "react";
import { gsap } from "gsap";

interface SweetAlertProps {
  confirm: () => void; // Function type for confirm action
  cancel: () => void;  // Function type for cancel action
  title: string;       // Title of the alert
  subtitle: string;    // Subtitle of the alert
  type?: "success" | "danger" | "warning" | undefined; // Alert type (optional)
}

const SweetAlertComponent: FC<SweetAlertProps> = ({
  confirm,
  cancel,
  title,
  subtitle,
  type = "warning", // Default type is 'warning'
}) => {
  const [isSuccess, setIsSuccess] = useState(false); // Control success state
  const tickRef = useRef<HTMLDivElement | null>(null); // Ref for the green tick animation

  useEffect(() => {
    if (isSuccess) {
      // GSAP animation on success
      gsap.fromTo(
        tickRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1.2, opacity: 1, duration: 0.6, ease: "elastic.out(1, 0.5)" }
      );
      gsap.to(tickRef.current, {
        scale: 1,
        duration: 0.4,
        repeat: 3,
        yoyo: true,
        delay: 0.6,
        ease: "power1.inOut",
      });
    }
  }, [isSuccess]);

  const alertStyles: CSSProperties = {
    zIndex: 1,
    fontFamily: "'Roboto', sans-serif",
    transition: "all 0.5s ease-in-out",
    transform: isSuccess ? "scale(1)" : "scale(1)",
    opacity: 1,
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
    padding: "20px",
  };

  const confirmButtonStyles: CSSProperties = {
    backgroundColor: isSuccess ? "#2a9d8f" : "#e63946",
    border: "none",
    color: "#fff",
    borderRadius: "5px",
    padding: "10px 20px",
    fontSize: "1rem",
    transition: "all 0.3s ease-in-out",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
    cursor: "pointer",
  };

  const cancelButtonStyles: CSSProperties = {
    backgroundColor: "#a8dadc",
    border: "none",
    color: "#1d3557",
    borderRadius: "5px",
    padding: "10px 20px",
    fontSize: "1rem",
    transition: "all 0.3s ease-in-out",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
    cursor: "pointer",
  };

  const handleConfirm = () => {
    setIsSuccess(true); // Set success state
    setTimeout(() => {
      confirm(); // Execute confirm function after animation
    }, 1500); // Allow GSAP animation to complete
  };

  return (
    <SweetAlert
      style={alertStyles}
      title={
        isSuccess ? (
          <div style={{ color: "#2a9d8f", fontWeight: "bold" }} ref={tickRef}>
           success
          </div>
        ) : (
          <span style={{ color: "#457b9d", fontWeight: "bold" }}>{title}</span>
        )
      }
      onConfirm={handleConfirm}
      type={isSuccess ? "success" : type}
      showCancel={!isSuccess}
      confirmBtnStyle={confirmButtonStyles}
      cancelBtnStyle={cancelButtonStyles}
      onCancel={cancel}
      customIcon={
        isSuccess ? (
          <div
            ref={tickRef}
            style={{
              fontSize: "3rem",
              color: "#2a9d8f",
              display: "inline-block",
            }}
          >
            ✔️
          </div>
        ) : (
          <div
            style={{
              fontSize: "3rem",
              color: type === "success" ? "#2a9d8f" : type === "danger" ? "#e63946" : "#e9c46a",
            }}
          >
            {type === "success" ? "✔️" : type === "danger" ? "❌" : "⚠️"}
          </div>
        )
      }
    />
  );
};

export default SweetAlertComponent;



// import React, { useState, CSSProperties, FC, useRef, useEffect } from "react";
// import SweetAlert from "react-bootstrap-sweetalert";
// import { gsap } from "gsap";

// interface SweetAlertProps {
//   confirm: () => void;
//   cancel: () => void;
//   title: string;
//   subtitle: string;
//   type?: "success" | "danger" | "warning";
// }

// const SweetAlertComponent: FC<SweetAlertProps> = ({
//   confirm,
//   cancel,
//   title,
//   subtitle,
//   type = "warning",
// }) => {
//   const [isSuccess, setIsSuccess] = useState(false);
//   const tickRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     if (isSuccess && tickRef.current) {
//       gsap.fromTo(
//         tickRef.current,
//         { scale: 0, opacity: 0 },
//         { scale: 1.2, opacity: 1, duration: 0.6, ease: "elastic.out(1, 0.5)" }
//       );
//       gsap.to(tickRef.current, {
//         scale: 1,
//         duration: 0.4,
//         repeat: 3,
//         yoyo: true,
//         delay: 0.6,
//         ease: "power1.inOut",
//       });
//     }
//   }, [isSuccess]);

//   const handleConfirm = () => {
//     setIsSuccess(true);
//     setTimeout(() => confirm(), 1500);
//   };

//   const alertStyles: CSSProperties = {
//     zIndex: 1,
//     fontFamily: "'Roboto', sans-serif",
//     borderRadius: "12px",
//     boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
//     padding: "20px",
//   };

//   const buttonStyles: CSSProperties = {
//     border: "none",
//     borderRadius: "5px",
//     padding: "10px 20px",
//     fontSize: "1rem",
//     transition: "all 0.3s ease-in-out",
//     boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
//     cursor: "pointer",
//   };

//   const confirmButtonStyles: CSSProperties = {
//     ...buttonStyles,
//     backgroundColor: isSuccess ? "#2a9d8f" : "#e63946",
//     color: "#fff",
//   };

//   const cancelButtonStyles: CSSProperties = {
//     ...buttonStyles,
//     backgroundColor: "#a8dadc",
//     color: "#1d3557",
//   };

//   const customIcon = isSuccess ? (
//     <div
//       ref={tickRef}
//       style={{
//         fontSize: "3rem",
//         color: "#2a9d8f",
//         display: "inline-block",
//       }}
//     >
//       ✔️
//     </div>
//   ) : (
//     <div
//       style={{
//         fontSize: "3rem",
//         color: type === "success" ? "#2a9d8f" : type === "danger" ? "#e63946" : "#e9c46a",
//       }}
//     >
//       {type === "success" ? "✔️" : type === "danger" ? "❌" : "⚠️"}
//     </div>
//   );

//   return (
//     <SweetAlert
//       style={alertStyles}
//       title={title}
//       onConfirm={handleConfirm}
//       type={isSuccess ? "success" : type}
//       showCancel={!isSuccess}
//       confirmBtnStyle={confirmButtonStyles}
//       cancelBtnStyle={cancelButtonStyles}
//       onCancel={cancel}
//       customIcon={customIcon}
//     />
//   );
// };

// export default SweetAlertComponent;





