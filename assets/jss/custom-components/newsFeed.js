import {
  title,
  whiteColor,
  hexToRgb
} from "assets/jss/nextjs-material-kit-pro.js";

const pageHeaderStyles = theme => ({
  feedTitleWhite: {
    "&, & a": {
      ...title,
      marginTop: ".625rem",
      marginBottom: "0",
      minHeight: "auto",
      color: whiteColor + " !important"
    }
  },
  authorWhite: {
    display: "inline-flex",
    "& a": {
      color: "rgba(" + hexToRgb(whiteColor) + ", 0.8)"
    }
  },
  textNewsCard: {
    color: "rgba(" + hexToRgb(whiteColor) + ", 0.8)"
  },
  imageHolder: {
    backgroundPosition: "50% 50% !important",
    backgroundSize: "cover !important"
  }
});

export default pageHeaderStyles;
