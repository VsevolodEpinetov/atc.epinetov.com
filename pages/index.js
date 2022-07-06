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

import Subject from "@material-ui/icons/Subject";
import Flight from "@material-ui/icons/Flight";
import LocationCity from "@material-ui/icons/LocationCity";
import LibraryBooks from "@material-ui/icons/LibraryBooks";

import indexPageStyle from "assets/jss/nextjs-material-kit-pro/pages/indexPageStyle.js";
import HeroCard from "../components/HeroCard";

const useStyles = makeStyles(indexPageStyle);

export default function IndexPage() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });
  const classes = useStyles();
  return (
    <div>
      <Head>
        <meta property="og:title" content="Информация ОВД" key="meta-title-og" />
        <meta property="title" content="Информация ОВД" key="meta-title" />
        <meta property="og:description" content="Сайт с полезной информацией, если ты диспетчер-стажер или даже диспетчер РЛУ и ПК. Документы ОВД, тесты, ЛТХ ВС, статьи и прочие интересности" key="meta-description-og" />
        <meta property="description" content="Сайт с полезной информацией, если ты диспетчер-стажер или даже диспетчер РЛУ и ПК. Документы ОВД, тесты, ЛТХ ВС, статьи и прочие интересности" key="meta-description" />
        <meta property="og:image" content="https://storage.googleapis.com/atc.epinetov.com/public/img/meta-image.png" key="meta-image-og" />
      </Head>
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
              >
                <CardBody>
                  <h3 className={classes.cardTitleWhite}>
                    Привет! 👋
                  </h3>
                  <p className={classes.cardDescription}>
                    От 7 июля 2022 года: <br />
                    — Исправлена ошибка отображения изображений <br />
                    — Исправлено отображение таблиц в ФАП 362 <br />
                  </p>
                </CardBody>
              </Card>
            </GridItem>
            <HeroCard
              title='Воздушные суда'
              description='Список наиболее встречаемых ВС с кратким описанием'
              href='/aircraft'
              backgroundImageName='aircraft-bg.webp'
              large
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
              title='Тестирования'
              description='Различные тесты для диспетчеров'
              backgroundImageName='tests-bg.webp'
              customButtons={[
                {href: '/tests/aircraft', icon: <Flight/>, title: 'ВС'},
                {href: '/tests/cities', icon: <LocationCity/>, title: 'Города'},
                {href: '/tests/trd', icon: <LibraryBooks/>, title: 'ТРД АузДЦ'}
              ]}
              large
            />
          </GridContainer>
        </div>
        <Footer />
      </div>
    </div>
  );
}
