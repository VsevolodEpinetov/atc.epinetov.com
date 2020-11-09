import {
    container,
    title,
    main,
    grayColor,
    mainRaised
  } from "assets/jss/nextjs-material-kit-pro.js";

import backToTopButtonStyle from "assets/jss/nextjs-material-kit-pro/components/backToTopButtonStyle.js";
  
const docPageStyle = {
    ...backToTopButtonStyle,
    container: {
      ...container,
      zIndex: "2"
    },
    textCenter: {
      textAlign: "center"
    },
    title: {
      ...title,
      color: grayColor[5]
    },
    subtitle: {
      color: grayColor[5]
    },
    main: {
      ...main,
      ...mainRaised
    },
    block: {
      color: "inherit",
      padding: "0.9375rem",
      fontWeight: "500",
      fontSize: "12px",
      textTransform: "uppercase",
      borderRadius: "3px",
      textDecoration: "none",
      position: "relative",
      display: "block"
    },
    inlineBlock: {
      display: "inline-block",
      padding: "0px",
      width: "auto"
    },
    list: {
      marginBottom: "0",
      padding: "0",
      marginTop: "0"
    },
    left: {
      float: "left!important",
      display: "block"
    },
    right: {
      padding: "15px 0",
      margin: "0",
      float: "right"
    },
    icon: {
      width: "18px",
      height: "18px",
      top: "3px",
      position: "relative"
    },
    section: {
      paddingBottom: "0",
      backgroundPosition: "50%",
      backgroundSize: "cover",
      padding: "70px 0",
      "& p": {
        fontSize: "1.188rem",
        lineHeight: "1.5em",
        color: grayColor[15],
        marginBottom: "30px"
      }
    },
    backToTopButtonWrapper: {
      position: "fixed",
      top: "90%",
      bottom: "auto",
      transform: "",
      zIndex: "4",
      right: "10%",
      width: "3em",
      height: "3em",
      borderRadius: "50%",
      border: "1px solid #ececec",
      boxShadow: "0px 0px 25px 0px rgba(0, 0, 0, 0.04)",
      background: "#fff",
      paddingTop: "0.88em",
      textAlign: "center",
      transition: "transform 0.5s, opacity 0.5s",
      opacity: "1",
      "&:hover": {
        transform: "translate3d(0, -5px, 0)"
      }
    }
  };
  
  export default docPageStyle;
  