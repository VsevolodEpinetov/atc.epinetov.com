/*eslint-disable*/
import React from "react";
import Link from "next/link";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";

import GetApp from "@material-ui/icons/GetApp";

import indexPageStyle from "assets/jss/nextjs-material-kit-pro/pages/indexPageStyle.js";

import { getSortedDocsData } from 'lib/docs'
import Date from 'lib/date'

const useStyles = makeStyles(indexPageStyle);

export default function docsPage({ allDocsData }) {
  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });
  const classes = useStyles();
  return (
    <div>
      <Header
        links={<HeaderLinks dropdownHoverColor="dark"/>}
        color="transparent"
      />
      <div className={classes.projects}>
        <div className={classes.container}>
          <GridContainer>
            {
                allDocsData.map(({ id, date, title }) => (
                  <GridItem
                    md={4}
                    className={
                      classes.mlAuto + " " + classes.mrAuto + " " + classes.textCenter
                    }
                  >
                    <Card>
                      <CardBody>
                        <h4 className={classes.cardTitle}>{title}</h4>
                        <p>Ред. от <Date dateString={date} /></p>
                        <Button color="blue" href={`/docs/${id}`}>Смотреть</Button>
                      </CardBody>
                    </Card>
                  </GridItem>
                ))
            }
          </GridContainer>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const allDocsData = getSortedDocsData()
  return {
    props: {
      allDocsData
    }
  }
}