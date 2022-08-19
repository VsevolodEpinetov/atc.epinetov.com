import React from 'react';
import GridItem from "components/Grid/GridItem.js";

import { makeStyles } from "@material-ui/core/styles";
import pageHeaderStyles from "assets/jss/custom-components/page-header/pageHeaderStyles.js";
const useStyles = makeStyles(pageHeaderStyles);

const PageHeader = ( {title, description} ) => {
  const classes = useStyles();

  return (
    <GridItem
      md={12}
      className={classes.margins}
    >
      <h2 className={classes.title}>{title}</h2>
      {
        description.map(d => <h5 className={classes.description}>{d}</h5>)
      }
    </GridItem>
  );
};

export default PageHeader;