import React, { useState } from 'react';

import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import Slider from '@material-ui/core/Slider';
import Tooltip from "@material-ui/core/Tooltip";

import aircraftSlider from "/assets/jss/nextjs-material-kit-pro/components/aircraftSlider.js";
const useStyles = makeStyles(aircraftSlider);

function ValueLabelComponent({children, open, value}) {
  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

function valueLabelFormat(value) {
  return `FL${value}`;
}

const colorsForSliders = {
  orange: "#ff9800",
  red: "#f44336",
  green: "#4caf50",
  purple: "#9c27b0",
  correctAnswer: '#80b58e',
  wrongAnswer: '#de7d7d'
}

const AircraftSlider = ( {title, defaultValue, onChange, marks, disabled, sliderType} ) => {
  const classes = useStyles();
  
  const [value, setValue] = useState(defaultValue);
  const [color, setColor] = useState(colorsForSliders.red);

  const borders = [480, 400, 300];

  const getColor = (value) => {
    if (value >= borders[0]) return colorsForSliders.purple;
    if (value >= borders[1]) return colorsForSliders.green;
    if (value >= borders[2]) return colorsForSliders.orange;
    return colorsForSliders.red;
  }

  const handleSlider = (e, newValue) => {
    let color = getColor(newValue);
 
    setColor(color);
    setValue(newValue);
  }

  return (
    <GridItem
      md={6}
      sm={12}
      className={classes.mlAuto + " " + classes.mrAuto}
      key='answer-field-ceiling'
    >
      <span id='ceiling-label'>{title}</span>
      <Slider
        valueLabelDisplay="auto"
        aria-label="slider-ceiling"
        ValueLabelComponent={ValueLabelComponent}
        onChange={handleSlider}
        min={sliderType == 'ceiling' ? 100 : 300}
        max={sliderType == 'ceiling' ? 600 : 1000}
        step={10}
        classes={{
          root: classes.sliderRoot,
          thumb: classes.sliderThumb,
          valueLabel: classes.sliderValueLabel,
          track: classes.sliderTrack,
          rail: classes.sliderRail,
          markLabel: classes.sliderMarkLabel,
          disabled: classes.sliderDisabled
        }}
        style={{
          color: color
        }}
        getAriaValueText={valueLabelFormat}
        valueLabelFormat={valueLabelFormat}
        marks={marks}
        disabled={disabled}
        value={value}
      />
    </GridItem>
  );
};

export default AircraftSlider;