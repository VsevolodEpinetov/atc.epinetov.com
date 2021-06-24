/*eslint-disable*/
import React, { useEffect, useContext } from "react";
import classNames from "classnames";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Footer from "components/Footer/Footer.js";
import Skeleton from '@material-ui/lab/Skeleton';

// custom components
import TestFeed from "../components/TestFeed";
import InternshipFeed from "../components/InternshipFeed";
import UserCard from "../components/UserCard";

// styles declaration
import style from "assets/jss/nextjs-material-kit-pro/pages/aircraftPageStyle.js";
const useStyles = makeStyles(style);
import linearProgressInternshipStyle from "assets/jss/nextjs-material-kit-pro/components/linearProgressInternshipStyle.js";
const useStylesLinearProgress = makeStyles(linearProgressInternshipStyle);

// auth
import AuthCheck from '../components/AuthCheck';
import { auth, firestore } from '../lib/firebase';
import { useDocumentData, useCollectionData, useCollection } from 'react-firebase-hooks/firestore'
import { UserContext } from '../lib/context';

export default function ProfilePage(props) {
  const classes = useStyles();

  const { user } = useContext(UserContext);

  return (
    <div>
      <Header
        links={<HeaderLinks dropdownHoverColor="dark" />}
        color="transparent"
      />
      <div className={classes.projects}>
        <div className={classes.container}>
          <GridContainer>
            <AuthCheck>
              <GridItem
                xs={12} sm={12} md={4}
              >
                <UserCard uid={user?.uid} />
              </GridItem>
              <GridItem
                xs={12} sm={12} md={8}
              >
                <GridContainer>

                  <GridItem xs={12} sm={12} md={12}>
                    <InternshipInfo />
                  </GridItem>

                  <GridItem xs={12} sm={12} md={12}>
                    <AircraftTestList />
                  </GridItem>

                  <GridItem xs={12} sm={12} md={12}>
                    <CitiesTestList />
                  </GridItem>

                </GridContainer>
              </GridItem>
            </AuthCheck>
          </GridContainer>
        </div>
      </div>
      <Footer />
    </div >
  );
}

function AircraftTestList() {
  const ref = firestore.collection('users').doc(auth.currentUser.uid).collection('testsAircraft');
  const query = ref.orderBy('timestamp', 'desc');
  const [querySnapshot, queryLoading] = useCollection(query);
  const tests = querySnapshot?.docs.map((doc) => doc.data())

  return (
    <>
      {querySnapshot &&
        (
          <>
            <h3>Тесты ЛТХ ВС</h3>
            <TestFeed tests={tests} testType='aircraft' />
          </>
        )
      }
      {queryLoading &&
        (
          <>
            <Skeleton height={60} width='60%' style={{ marginBottom: '0px' }} />
          </>
        )
      }
    </>
  )
  
}

function CitiesTestList() {
  const ref = firestore.collection('users').doc(auth.currentUser.uid).collection('testsCities');
  const query = ref.orderBy('timestamp', 'desc');
  const [querySnapshot, queryLoading] = useCollection(query);
  const tests = querySnapshot?.docs.map((doc) => doc.data())

  return (
    <>
      {querySnapshot &&
        (
          <>
            <h3>Тесты Аэропорты РФ</h3>
            <TestFeed tests={tests} testType='cities' />
          </>
        )
      }
      {queryLoading &&
        (
          <>
            <Skeleton height={60} width='70%' style={{ marginBottom: '0px' }} />
          </>
        )
      }
    </>
  )
}


function InternshipInfo() {
  const ref = firestore.collection('users').doc(auth.currentUser.uid).collection('internship').doc('info');
  const [internship, internshipLoading] = useDocumentData(ref);

  return (
    <>
      {internship &&
        (
          <>
            <h3>Стажировка</h3>
            <InternshipFeed internship={internship} />
          </>
        )
      }
      {internshipLoading &&
        (
          <>
            <Skeleton height={60} width='30%' style={{ marginBottom: '0px' }} />
          </>
        )
      }
    </>
  )
}