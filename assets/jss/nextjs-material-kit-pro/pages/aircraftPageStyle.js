import {
    container,
    mlAuto,
    mrAuto,
    title,
    description
  } from "assets/jss/nextjs-material-kit-pro.js";

  import modalStyle from "assets/jss/nextjs-material-kit-pro/modalStyle.js";
  
  const aircraftStyles = theme => ({
    container,
    mlAuto,
    mrAuto,
    title,
    description,
    gridContainer: {},
    gridItem: {},
    ...modalStyle(theme),
    textCenter: {
      textAlign: "center"
    },
    imageHolder: {
      backgroundPosition: "50% 50% !important",
      backgroundSize: "cover !important"
    }
  });
  
  export default aircraftStyles;
  