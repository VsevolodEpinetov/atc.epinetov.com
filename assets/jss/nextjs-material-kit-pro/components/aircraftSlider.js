import {
  mlAuto,
  mrAuto,
} from "assets/jss/nextjs-material-kit-pro.js";

const aircraftSlider = {
  mlAuto,
  mrAuto,
  sliderRoot: {
    color: "#4caf50",
    height: 8
  },
  sliderThumb: {
    height: '24px !important',
    width: '24px !important',
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: '-8px !important',
    marginLeft: '-12 !important',
    '&:focus, &:hover, &:active': {
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
  }
};

export default aircraftSlider;