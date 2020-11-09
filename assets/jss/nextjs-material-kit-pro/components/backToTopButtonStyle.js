import {
    whiteColor
} from "assets/jss/nextjs-material-kit-pro.js";
  
  const backToTopButtonStyle = {
    button: {
        position: "fixed",
        width: "100%",
        bottom: "20px",
        alignItems: "center",
        height: "20px",
        justifyContent: "center",
        zIndex: "1000",
        cursor: "pointer",
        animation: "fadeIn 0.3s",
        transition: "opacity 0.4s",
        opacity: "0.5",
        "&:hover": {
            opacity: "1"
          }
    }
  };
  
  export default backToTopButtonStyle;
  