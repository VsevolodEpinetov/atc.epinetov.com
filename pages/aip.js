/*eslint-disable*/
import React from "react";
import Head from 'next/head'
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Button from "components/CustomButtons/Button.js";
import Table from "components/Table/Table.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Footer from "components/Footer/Footer.js";

import GetApp from "@material-ui/icons/GetApp";

import aipPageStyle from "assets/jss/nextjs-material-kit-pro/pages/aipPageStyle.js";

import { getAllAIPData } from 'lib/aip'

const useStyles = makeStyles(aipPageStyle);

const createAIPDate = (allAIPData) => {
  var fullTable = [];

  allAIPData.forEach(aeroportData => {
    var row = [aeroportData.aeroportICAOCode, aeroportData.aeroportInfo.name, aeroportData.aeroportInfo.country];

    var fullID = -1;
    var starID = -1;
    var sidID = -1;

    aeroportData.availableAIPList.forEach((aip, id) => {
      if (aip.type === 'Full') fullID = id;
      if (aip.type === 'STAR') starID = id;
      if (aip.type === 'SID') sidID = id;
    });

    if (fullID > -1) row.push(<Button href={aeroportData.availableAIPList[fullID].link} color="blue"> <GetApp /> Полный </Button>)
    else row.push(<Button disabled color="blue"> <GetApp /> Полный </Button>)

    if (starID > -1) row.push(<Button href={aeroportData.availableAIPList[starID].link} color="blue"> <GetApp /> STAR </Button>)
    else row.push(<Button disabled color="blue"> <GetApp /> STAR </Button>)

    if (sidID > -1) row.push(<Button href={aeroportData.availableAIPList[sidID].link} color="blue"> <GetApp /> SID </Button>)
    else row.push(<Button disabled color="blue"> <GetApp /> SID </Button>)

    fullTable.push(row);
  })


  return fullTable;
}

export default function AIPPage({ allAIPData }) {
  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });
  const classes = useStyles();
  return (
    <div>
      <Head>
        <title>AIP | ATC</title>
      </Head>
      <Header
        links={<HeaderLinks dropdownHoverColor="dark" />}
        color="transparent"
      />
      <div className={classes.container}>
        <GridContainer>
          <GridItem
            md={12}
            className={classes.mlAuto + " " + classes.mrAuto}
            style={{ marginBottom: '3em !important' }}
          >
            <h2 className={classes.title}>Актуальная информация AIP</h2>
            <h5 className={classes.description}>
              На этой странице вы можете найти актуальную опубликованную аэронавигационную информацию по аэродромам гражданской авиации и совместного базирования.
            </h5>
            <h5 className={classes.description}>
              Все файлы взяты с <a href="http://www.caiga.ru/" target='_blank'>сайта ЦАИ ГА</a>
            </h5>
          </GridItem>
          <GridItem
            md={12}
            className={classes.mlAuto + " " + classes.mrAuto}
            style={{ marginBottom: '2em !important' }}
          >
            <Table
              striped
              hover
              tableHead={[
                "ICAO",
                "Название",
                "Страна",
                "Полный",
                "STAR",
                "SID"
              ]}
              tableData={createAIPDate(allAIPData)}
            />
          </GridItem>
        </GridContainer>
      </div>
      <Footer
        theme="white"
        content={
          <div style={{fontSize: '0.8em'}}>
            копирайт бгг &copy; {" "}
            <a
              href="http://epinetov.com"
              target="_blank"
            >
              Vsevolod Epinetov
              </a>{" "}
              <a href={require(`assets/img/rights-reserved.webp`)} target='_blank'>Все права защищены</a>
            </div>
        }
      >
        <br/>
      </Footer>
    </div>
  );
}

export async function getStaticProps() {
  const allAIPData = getAllAIPData()
  return {
    props: {
      allAIPData
    }
  }
}