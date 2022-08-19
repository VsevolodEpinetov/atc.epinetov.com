import React from 'react';

import GridItem from "components/Grid/GridItem.js";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

import { withStyles, makeStyles } from "@material-ui/core/styles";

import testsAircraftPageStyle from "assets/jss/nextjs-material-kit-pro/pages/testsAircraftPageStyle.js";
const useStyles = makeStyles(testsAircraftPageStyle);

const AmountOfQuestionsSelector = ({ amountOfQuestions, handleAmountOfQuestionsSelector, possibleOptions, title }) => {
  const classes = useStyles();
  return (
    <GridItem
      md={6}
      className={classes.mlAuto + " " + classes.mrAuto + ' margin-bottom-fix'}
      style={{ marginBottom: '3em !important' }}
      key='test-cities-settings-number'
    >
      <FormControl fullWidth className={classes.selectFormControl}>
        <InputLabel
          htmlFor="simple-select"
          className={classes.selectLabel}
        >
          Количество вопросов
        </InputLabel>
        <Select
          MenuProps={{
            className: classes.selectMenu
          }}
          classes={{
            select: classes.select
          }}
          value={amountOfQuestions}
          onChange={handleAmountOfQuestionsSelector}
          inputProps={{
            name: "handleAmountOfQuestionsSelector",
            id: "amount-of-questions-selector"
          }}
        >
          <MenuItem
            disabled
            classes={{
              root: classes.selectMenuItem
            }}
          >
            {title || "Количество вопросов"}
          </MenuItem>
          {possibleOptions.map(o =>
            <MenuItem
              classes={{
                root: classes.selectMenuItem,
                selected: classes.selectMenuItemSelected
              }}
              value={o}
            >
              {o}
            </MenuItem>)}
        </Select>
      </FormControl>
    </GridItem>
  );
};

export default AmountOfQuestionsSelector;