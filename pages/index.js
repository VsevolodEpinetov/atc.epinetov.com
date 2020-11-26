/*eslint-disable*/
import React from "react";
import Link from "next/link";
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

import Subject from "@material-ui/icons/Subject";

import indexPageStyle from "assets/jss/nextjs-material-kit-pro/pages/indexPageStyle.js";

import aircraftBG from "assets/img/aircraft-bg.webp";
import docsBG from "assets/img/docs-bg.webp";
import aipBG from "assets/img/aip-bg.webp";

const useStyles = makeStyles(indexPageStyle);

export default function IndexPage() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
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
            <GridItem xs={12} sm={12} md={12}>
              <Card
                raised
                background
                style={{ backgroundImage: `url(${aircraftBG})` }}
              >
                <CardBody background>
                  <Link href="/aircraft">
                    <a>
                      <h3 className={classes.cardTitleWhite}>
                        Воздушные суда
                      </h3>
                    </a>
                  </Link>
                  <p className={classes.cardDescription}>
                    Список наиболее встречаемых ВС с кратким описанием
                  </p>
                  <Button
                    href="/aircraft"
                    round
                    color="blue"
                  >
                    <Subject /> Перейти
                    </Button>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={6}>
              <Card
                raised
                background
                style={{ backgroundImage: `url(${docsBG})` }}
              >
                <CardBody background>
                  <Link href="/docs">
                    <a>
                      <h3 className={classes.cardTitleWhite}>
                        Документы
                        </h3>
                    </a>
                  </Link>
                  <p className={classes.cardDescription}>
                    Документация ОВД
                    </p>
                  <Button
                    href="/docs"
                    round
                    color="blue"
                  >
                    <Subject /> Перейти
                  </Button>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={6}>
              <Card
                raised
                background
                style={{ backgroundImage: `url(${aipBG})` }}
              >
                <CardBody background>
                  <Link href="/aip">
                    <a>
                      <h3 className={classes.cardTitleWhite}>
                        AIP
                    </h3>
                    </a>
                  </Link>
                  <p className={classes.cardDescription}>
                    И так всё понятно, думаю 🤔
                    </p>
                  <Button
                    href="/aip"
                    round
                    color="blue"
                  >
                    <Subject /> Перейти
                    </Button>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer/>
      </div>
    </div>
  );
}
