/*eslint-disable*/
import React from "react";
import Link from "next/link";
import Image from "next/image";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Footer from "components/Footer/Footer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Tooltip from "@material-ui/core/Tooltip";
import AlbumsGallery from 'components/AlbumsGallery/AlbumsGallery.js'

import docsPageStyle from "assets/jss/nextjs-material-kit-pro/pages/docsPageStyle.js";

import Search from "@material-ui/icons/Search";

const useStyles = makeStyles(docsPageStyle);

export default function docsPage({ allDocsData }) {
  React.useEffect(() => {
  });

  const classes = useStyles();

  return (
    <div>
      <Header
        links={<HeaderLinks dropdownHoverColor="dark" />}
        color="transparent"
      />
      <div className={classes.projects}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem
              md={12}
              className={classes.mlAuto + " " + classes.mrAuto}
              style={{ marginBottom: '3em !important' }}
              key='docs-header'
            >
              <h2 className={classes.title}>Альбомы НСВП-3</h2>
              <h5 className={classes.description}>
                Альбомы по НСВП-3
              </h5>
            </GridItem>
            <GridItem
              md={12}
              className={classes.mlAuto + " " + classes.mrAuto}
              key='gallery'>
              <AlbumsGallery/>
            </GridItem>
          </GridContainer>
        </div>
      </div>
      <Footer />
    </div>
  );
}