/*eslint-disable*/
import React from "react";
import nookies from 'nookies'
import { verifyIdToken } from '../firebaseAdmin'
import firebaseClient from '../firebaseClient'
import firebase from 'firebase/app'
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Footer from "components/Footer/Footer.js";

import style from "assets/jss/nextjs-material-kit-pro/pages/aircraftPageStyle.js";

const useStyles = makeStyles(style);

function Authenticated({ session }) {
  const classes = useStyles();
  firebaseClient();
  if (session) {
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
              >
                Войдено
                <h5 className={classes.description}>
                  {session}
                </h5>
                <Button color='success' size="sm" fullWidth
                  onClick={async () => {
                    await firebase.auth().signOut();
                    window.location.href = '/';
                  }}>
                  Выйти
                </Button>
              </GridItem>
            </GridContainer>
          </div>
        </div>
        <Footer />
      </div>
    );
  } else {
    return (
      <>
        Загрузка...
      </>
    );
  }
}

export async function getServerSideProps(context) {
  try {
    const cookies = nookies.get(context);
    const token = await verifyIdToken(cookies.token);
    const { uid, email } = token;
    return {
      props: { session: `Почта: ${email}, uid: ${uid}` },
    };
  } catch (error) {
    context.res.writeHead(302, {location: '/login'});
    context.res.end();
    console.log(error)
    return { props: {} };
  }
}

export default Authenticated;