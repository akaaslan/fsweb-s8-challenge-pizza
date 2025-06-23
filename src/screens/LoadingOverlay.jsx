import React from "react";

const overlayStyle = {
  position: "fixed",
  zIndex: 9999,
  inset: 0,
  background: "#ce2829",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  fontSize: "3rem",
  color: "#ce2829",
  fontFamily: "'Roboto Condensed', Arial, Helvetica, sans-serif",
  letterSpacing: "1px",
};

const dotStyle = {
  display: "inline-block",
  width: "0.2em",
  height: "0.2em",
  margin: "0 0.15em",
  borderRadius: "50%",
  background: "rgba(255,255,255,1)",
  animation: "loading-bounce 1s infinite alternate",
};

const LoadingOverlay = () => (
  <div style={overlayStyle}>
    <span style={{
      fontSize: "3rem",
      color: "rgba(255,255,255,1)",
      fontFamily: "'Roboto Condensed', Arial, Helvetica, sans-serif",
  letterSpacing: "1px"
    }}>Yükleniyor</span>
    <div style={{ marginTop: "1rem" }}>
      <span style={{ ...dotStyle, animationDelay: "0s" }} />
      <span style={{ ...dotStyle, animationDelay: "0.2s" }} />
      <span style={{ ...dotStyle, animationDelay: "0.4s" }} />
    </div>
    <style>
      {`
        @keyframes loading-bounce {
          0% { transform: translateY(0); opacity: 0.7; }
          100% { transform: translateY(-1em); opacity: 1; }
        }
      `}
    </style>
  </div>
);

export default LoadingOverlay;