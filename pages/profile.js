/*eslint-disable*/
import React, { useEffect } from "react";
import nookies from 'nookies'
import { verifyIdToken } from '../firebaseAdmin'
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Footer from "components/Footer/Footer.js";
import Table from "components/Table/Table.js";
import CircularProgress from '@material-ui/core/CircularProgress';
import CardProfile from "components/Card/CardProfile.js";
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';

import style from "assets/jss/nextjs-material-kit-pro/pages/aircraftPageStyle.js";
//import profilePageStyle from "assets/jss/nextjs-material-kit-pro/pages/profilePageStyle.js";

import { convertTimestampToDate } from '../lib/date';

import firebase from 'firebase/app'
import firebaseClient from '../firebaseClient';
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDocumentData, useCollectionData } from 'react-firebase-hooks/firestore'


import Done from "@material-ui/icons/Done";
import DoneAll from "@material-ui/icons/DoneAll";
import Close from "@material-ui/icons/Close";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { urlObjectKeys } from "next/dist/next-server/lib/utils";

firebaseClient();
const auth = firebase.auth();
const useStyles = makeStyles(style);

export default function ProfilePage({ userData }) {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
  const [user] = useAuthState(auth);


  const userRef = firebase.firestore().collection('users').doc(userData.id);
  const [basicInfo, loadingBasicInfo, errorBasicInfo] = useDocumentData(userRef);
  const [aircraftTestsInfo, loadingAircraftTestsInfo, errorAircraftTestsInfo] = useCollectionData(userRef.collection('testsAircraft'));


  const getTablesForAircraftTests = (aircraftTestsInfo) => {
    let resultsData = [];
    aircraftTestsInfo.forEach(testResults => {
      let data = {
        timestamp: testResults.timestamp,
        totalPoints: testResults.totalPoints,
        totalPointsGot: testResults.totalPointsGot,
        table: []
      };
      let questionNumber = 1;
      testResults.results.forEach(result => {
        let classForText = 'textOrange';
        let ResultIcon = Done;
        if (result.pointsGot === 1) {
          classForText = 'textGreen'
          ResultIcon = DoneAll;
        }
        if (result.pointsGot === 0) {
          classForText = 'textRed'
          ResultIcon = Close;
        }
        let correctAnswer = `L${result.correctAnswer.engines.number}${result.correctAnswer.engines.type}, ${result.correctAnswer.category}, ${result.correctAnswer.speed} км/ч, FL${result.correctAnswer.ceiling}`
        let userAnswer = `L${result.userAnswer.engines.number}${result.userAnswer.engines.type}, ${result.userAnswer.category}, ${result.userAnswer.speed} км/ч, FL${result.userAnswer.ceiling}`
        data.table.push([<span className={classForText}>{questionNumber}</span>, <span className={classForText}>{result.question}</span>, <span className={classForText}>{correctAnswer}</span>, <span className={classForText}>{userAnswer}</span>, <span className={classForText}><ResultIcon /></span>, `${result.pointsGot}`])
        questionNumber++;
      })
      resultsData.push(data);
    })

    return resultsData;
  }

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (e, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };


  return (
    <div>
      <Header
        links={<HeaderLinks dropdownHoverColor="dark" />}
        color="transparent"
      />
      <div className={classes.projects}>
        <div className={classes.container}>
          <GridContainer>


            {user && (
              <>
                <GridItem
                  xs={12} sm={12} md={4}
                >
                  {basicInfo &&
                    <CardProfile
                      name={`${basicInfo.name} ${basicInfo.surname}`}
                      avatarURL='https://storage.googleapis.com/atc.epinetov.com/public/img/profile-pic-dummy.png'
                      uid={user.uid}
                      workingAt={basicInfo.workingAt}
                      workingPosition={basicInfo.workingPosition}
                    />
                  }
                  {loadingBasicInfo && <CircularProgress />}
                  {errorBasicInfo && <p style={{ color: 'red' }}><b>Ошибка загрузки!</b></p>}
                </GridItem>
                <GridItem
                  xs={12} sm={12} md={8}
                >
                  <h3>Тесты ЛТХ ВС</h3>
                  {errorAircraftTestsInfo && <strong>Ошибка: {JSON.stringify(errorAircraftTestsInfo)}</strong>}
                  {loadingAircraftTestsInfo && <CircularProgress />}
                  {aircraftTestsInfo && getTablesForAircraftTests(aircraftTestsInfo).length > 0 ? getTablesForAircraftTests(aircraftTestsInfo).map((resultData, id) => (
                    <>
                      <Accordion expanded={expanded === `panel-aircraftTest${id}`} onChange={handleChange(`panel-aircraftTest${id}`)}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls={`panel-aircraftTest${id}bh-content`}
                          id={`panel-aircraftTest${id}bh-header`}
                        >
                          <p>Тест от {convertTimestampToDate(resultData.timestamp)}, {resultData.totalPointsGot}/{resultData.totalPoints}</p>
                        </AccordionSummary>
                        <AccordionDetails className={'accordion-root'}>
                          <Table
                            striped
                            tableHead={["#", "ВС", "Верный ответ", "Твой ответ", "Результат", "Баллы"]}
                            tableData={resultData.table}
                          />
                        </AccordionDetails>
                      </Accordion>
                    </>
                  )) : 'Пока нет 👏'}


                  <Button color='danger' fullWidth style={{ marginTop: '20px' }}
                    onClick={async () => {
                      await firebase.auth().signOut();
                      window.location.href = '/';
                    }}
                  >
                    Выйти
                  </Button>
                </GridItem>
              </>
            )}

            {
              !user &&
              <Button color='success' fullWidth href='/login'>
                Залогиниться
              </Button>
            }
          </GridContainer>
        </div>
      </div>
      <Footer />
    </div >
  );
}

export async function getServerSideProps(context) {
  try {
    const cookies = nookies.get(context);
    const token = await verifyIdToken(cookies.token);
    const { uid } = token;
    return {
      props: {
        userData:
        {
          id: uid
        }
      },
    };
  } catch (error) {
    context.res.writeHead(302, { location: '/login' });
    context.res.end();
    console.log(error)
    return { props: {} };
  }
}