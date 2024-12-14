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
