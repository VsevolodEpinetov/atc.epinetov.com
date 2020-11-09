/*eslint-disable*/
import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Button from "components/CustomButtons/Button.js";
import Table from "components/Table/Table.js";

import GetApp from "@material-ui/icons/GetApp";

import indexPageStyle from "assets/jss/nextjs-material-kit-pro/pages/indexPageStyle.js";

import { getAllAIPData } from 'lib/aip'

const useStyles = makeStyles(indexPageStyle);

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

export default function AIPPage ( {allAIPData} ) {
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
        </div>
      </div>
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