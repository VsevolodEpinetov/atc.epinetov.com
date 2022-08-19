import {
  primaryColor,
  infoColor,
  successColor,
  warningColor,
  dangerColor,
  grayColor,
  title,
  description
} from "../nextjs-material-kit-pro";

const typography = {
  title,
  description,
  primaryText: {
    "&, & *": {
      color: primaryColor[0],
      display: "inline-block"
    }
  },
  infoText: {
    "&, & *": {
      color: infoColor[0],
      display: "inline-block"
    }
  },
  successText: {
    "&, & *": {
      color: successColor[0],
      display: "inline-block"
    }
  },
  warningText: {
    "&, & *": {
      color: warningColor[0],
      display: "inline-block"
    }
  },
  dangerText: {
    "&, & *": {
      color: 'red',
      display: "inline-block"
    }
  }
};

export default typography;
