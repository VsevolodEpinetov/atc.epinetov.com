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
import Flight from "@material-ui/icons/Flight";
import LocationCity from "@material-ui/icons/LocationCity";
import LibraryBooks from "@material-ui/icons/LibraryBooks";

import indexPageStyle from "assets/jss/nextjs-material-kit-pro/pages/indexPageStyle.js";

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
              >
                <CardBody>
                  <h3 className={classes.cardTitleWhite}>
                    Привет! 👋
                  </h3>
                  <p className={classes.cardDescription}>
                    От 23 марта 2022 года: <br/>
                    — Обновлены ТРД <br/>
                    — Исправлена ошибка отображения изображений <br/>
                    — Исправлено отображение таблиц в ФАП 362 <br/>
                  </p>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              <Card
                raised
                background
                style={{ backgroundImage: `url(https://storage.googleapis.com/atc.epinetov.com/public/img/aircraft-bg.webp)` }}
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
                style={{ backgroundImage: `url(https://storage.googleapis.com/atc.epinetov.com/public/img/docs-bg.webp)` }}
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
                style={{ backgroundImage: `url(https://storage.googleapis.com/atc.epinetov.com/public/img/aip-bg.webp)` }}
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
            <GridItem xs={12} sm={6} md={6}>
              <Card
                raised
                background
                style={{ backgroundImage: `url(https://storage.googleapis.com/atc.epinetov.com/public/img/posts-bg.webp)` }}
              >
                <CardBody background>
                  <Link href="/posts">
                    <a>
                      <h3 className={classes.cardTitleWhite}>
                        Полезное
                      </h3>
                    </a>
                  </Link>
                  <p className={classes.cardDescription}>
                    То, что может оказаться полезным, но не подходит под другие категории
                  </p>
                  <Button
                    href="/posts"
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
                style={{ backgroundImage: `url(https://storage.googleapis.com/atc.epinetov.com/public/img/trd-bg.webp)` }}
              >
                <CardBody background>
                  <Link href="/trd">
                    <a>
                      <h3 className={classes.cardTitleWhite}>
                        ТРД
                      </h3>
                    </a>
                  </Link>
                  <p className={classes.cardDescription}>
                    ТРД МАДЦ
                  </p>
                  <Button
                    href="/trd"
                    round
                    color="blue"
                  >
                    <Subject /> Перейти
                  </Button>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              <Card
                raised
                background
                style={{ backgroundImage: `url(https://storage.googleapis.com/atc.epinetov.com/public/img/tests-bg.webp)` }}
              >
                <CardBody background>
                  <Link href="/aircraft">
                    <a>
                      <h3 className={classes.cardTitleWhite}>
                        Тестирования
                      </h3>
                    </a>
                  </Link>
                  <p className={classes.cardDescription}>
                    Различные тесты для диспетчеров
                  </p>
                  <Button
                    href="/tests/aircraft"
                    round
                    color="blue"
                  >
                    <Flight /> ВС
                  </Button>
                  <Button
                    href="/tests/cities"
                    round
                    color="blue"
                  >
                    <LocationCity /> Города
                  </Button>
                  <Button
                    href="/tests/trd"
                    round
                    color="blue"
                  >
                    <LibraryBooks /> ТРД АузДЦ
                  </Button>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer />
      </div>
    </div>
  );
}
