import {
  container,
  mlAuto,
  mrAuto,
  title,
  description,
  main
} from "assets/jss/nextjs-material-kit-pro.js";

import tooltipsStyle from "assets/jss/nextjs-material-kit-pro/tooltipsStyle.js";
import customSelectStyle from "assets/jss/nextjs-material-kit-pro/customSelectStyle.js";

const citiesPageStyle = {
  main,
  mlAuto,
  mrAuto,
  ...tooltipsStyle,
  ...customSelectStyle,
  container: {
    ...container,
    zIndex: "2"
  },
  title,
  description: {
    ...description,
    marginBottom: '1.6em'
  },
  textCenter: {
    textAlign: "center"
  },
  textRed: {
    color: "red !important"
  },
  textGreen: {
    color: "green !important"
  },
  textCenter: {
    textAlign: "center"
  },
  textRight: {
    textAlign: "right"
  },
  floatRight: {
    float: "right"
  },
  sliderRoot: {
    color: "#4caf50",
    height: 8
  },
  sliderThumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  sliderActive: {},
  sliderValueLabel: {
    left: 'calc(-50% + 4px)',
  },
  sliderTrack: {
    height: 8,
    borderRadius: 4,
  },
  sliderRail: {
    height: 8,
    borderRadius: 4,
  },
  sliderMarkLabel: {
    fontSize: '0.7rem'
  },
  mb3em: {
    marginBottom: '3em !important'
  },
  errorSelect: {
    '&after': {
      borderBottomColor: '#62f436 !important'
    }
  }
};

export default citiesPageStyle;