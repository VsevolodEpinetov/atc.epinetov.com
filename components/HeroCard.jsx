import React from 'react';
import Link from "next/link";

import { makeStyles } from "@material-ui/core/styles";

import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import Subject from "@material-ui/icons/Subject";
import GridItem from "components/Grid/GridItem.js";

import indexPageStyle from "assets/jss/nextjs-material-kit-pro/pages/indexPageStyle.js";
const useStyles = makeStyles(indexPageStyle);

const HeroCard = ({ title, description, backgroundImageName, href, large, customButtons }) => {
  const classes = useStyles();
  return (
    <GridItem xs={12} sm={12} md={large ? 12 : 6} >
      <Card
        raised
        background
        style={{ backgroundImage: `url(https://storage.googleapis.com/atc.epinetov.com/public/img/${backgroundImageName})` }}
      >
        <CardBody background>
          <Link href="/aip">
            <a>
              <h3 className={classes.cardTitleWhite}>
                {title}
              </h3>
            </a>
          </Link>
          <p className={classes.cardDescription}>
            {description}
          </p>
          {customButtons ?
            customButtons.map((b, id) => {
              return (<Button
                href={b.href}
                round
                color="blue"
                key={`${id}-key-button`}
              >
                {b.icon} {b.title}
              </Button>)
            })
            :
            <Button
              href={href}
              round
              color="blue"
            >
              <Subject /> Перейти
            </Button>
          }
        </CardBody>
      </Card>
    </GridItem>
  );
};

export default HeroCard;