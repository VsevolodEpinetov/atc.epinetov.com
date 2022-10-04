/*eslint-disable*/
import React from "react";
import Link from "next/link";
import Head from "next/head"
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
import CardFooter from "components/Card/CardFooter.js";

import Subject from "@material-ui/icons/Subject";
import Flight from "@material-ui/icons/Flight";
import LocationCity from "@material-ui/icons/LocationCity";
import LibraryBooks from "@material-ui/icons/LibraryBooks";

import indexPageStyle from "assets/jss/nextjs-material-kit-pro/pages/indexPageStyle.js";
import HeroCard from "../components/HeroCard";
import NewsFeed from "../components/NewsFeed/NewsFeed";

const useStyles = makeStyles(indexPageStyle);

export default function IndexPage() {

  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }, []);

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
            {/*<NewsFeed />*/}
            <HeroCard
              large
              title='Воздушные суда'
              description='Список наиболее встречаемых ВС с кратким описанием'
              href='/aircraft'
              backgroundImageName='aircraft-bg.webp'
            />
            <HeroCard
              title='Документы'
              description='Документация по ОВД'
              href='/docs'
              backgroundImageName='docs-bg.webp'
            />
            <HeroCard
              title='AIP'
              description='И так всё понятно, думаю 🤔'
              href='/aip'
              backgroundImageName='aip-bg.webp'
            />
            <HeroCard
              title='Полезное'
              description='То, что может оказаться полезным, но не подходит под другие категории'
              href='/posts'
              backgroundImageName='posts-bg.webp'
            />
            <HeroCard
              title='ТРД'
              description='ТРД МАДЦ'
              href='/trd'
              backgroundImageName='trd-bg.webp'
            />
            <HeroCard
              large
              title='Тестирования'
              description='Различные тесты для диспетчеров'
              backgroundImageName='tests-bg.webp'
              customButtons={[
                { href: '/tests/aircraft', icon: <Flight />, title: 'ВС' },
                { href: '/tests/cities', icon: <LocationCity />, title: 'Города' },
                { href: '/tests/trd', icon: <LibraryBooks />, title: 'ТРД АузДЦ' }
              ]}
            />
          </GridContainer>
        </div>
        <Footer />
      </div >
    </div >
  );
}
