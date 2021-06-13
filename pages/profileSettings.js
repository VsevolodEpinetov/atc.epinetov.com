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
import CircularProgress from '@material-ui/core/CircularProgress';
import CardProfile from "components/Card/CardProfile.js";
import CustomInput from 'components/CustomInput/CustomInput.js';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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


  const [workplace, setWorkplace] = React.useState('---');
  const [position, setPosition] = React.useState('---');

  const handleWorkplaceChange = (event) => {
    setWorkplace(event.target.value);
  };

  const handlePositionChange = (event) => {
    setPosition(event.target.value);
  };


  const [openError, setOpenError] = React.useState(false);
  const [messageError, setMessageError] = React.useState('');
  const handleCloseError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenError(false);
  };


  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [messageSuccess, setMessageSuccess] = React.useState('');
  const handleCloseSuccess = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccess(false);
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
                      backToProfileButton
                    />
                  }
                  {loadingBasicInfo && <CircularProgress />}
                  {errorBasicInfo && <p style={{ color: 'red' }}><b>Ошибка загрузки!</b></p>}
                </GridItem>
                <GridItem
                  xs={12} sm={12} md={8}
                >
                  <h3>Данные профиля</h3>
                  <p>Здесь ты можешь поменять данные профиля. Имей в виду, что сделать это можно только один раз.</p>
                  {
                    basicInfo && (
                      <GridContainer>
                        <GridItem
                          xs={12} sm={12} md={6}
                          style={{ marginBottom: '20px' }}
                        >
                          <TextField
                            disabled={basicInfo.locked}
                            id="name-text-field"
                            label="Имя"
                            defaultValue={basicInfo.name}
                            fullWidth
                          />
                        </GridItem>
                        <GridItem
                          xs={12} sm={12} md={6}
                          style={{ marginBottom: '20px' }}
                        >
                          <TextField
                            disabled={basicInfo.locked}
                            id="surname-text-field"
                            label="Фамилия"
                            defaultValue={basicInfo.surname}
                            fullWidth
                          />
                        </GridItem>
                        <GridItem
                          xs={12} sm={12} md={6}
                          style={{ marginBottom: '20px' }}
                        >
                          <FormControl fullWidth>
                            <InputLabel id="workplace-select-label">Место работы</InputLabel>
                            <Select
                              labelId="workplace-select-label"
                              id="workplace-select"
                              value={workplace}
                              onChange={handleWorkplaceChange}
                              fullWidth
                              disabled={basicInfo.locked}
                            >
                              <MenuItem value='moscow'>МЦ АУВД</MenuItem>
                            </Select>
                          </FormControl>
                        </GridItem>
                        <GridItem
                          xs={12} sm={12} md={6}
                          style={{ marginBottom: '20px' }}
                        >
                          <FormControl fullWidth>
                            <InputLabel id="position-select-label">Должность</InputLabel>
                            <Select
                              labelId="position-select-label"
                              id="position-select"
                              value={position}
                              onChange={handlePositionChange}
                              fullWidth
                              disabled={basicInfo.locked}
                            >
                              <MenuItem value='trainee'>Диспетчер-стажёр</MenuItem>
                              <MenuItem value='controller'>Диспетчер РЛУ и ПК</MenuItem>
                              <MenuItem value='coach'>Диспетчер-инструктор</MenuItem>
                            </Select>
                          </FormControl>
                        </GridItem>
                        <GridItem
                          xs={12} sm={12} md={12}
                          style={{ marginBottom: '20px' }}
                        >
                          <Button
                            color='success'
                            fullWidth
                            style={{ marginTop: '20px' }}
                            disabled={basicInfo.locked}
                            onClick={async (e) => {
                              e.preventDefault();
                              let userObj = {
                                name: document.getElementById('name-text-field').value,
                                surname: document.getElementById('surname-text-field').value,
                                workingAt: workplace,
                                workingPosition: position,
                                locked: true
                              }
                              await firebase
                                .firestore()
                                .collection('users')
                                .doc(userData.id)
                                .set(userObj)
                                .catch(function (error) {
                                  setMessageError(error.message);
                                  setOpenError(true);
                                })
                                .then(() => {
                                  setMessageSuccess('Данные успешно сохранены');
                                  setOpenSuccess(true);
                                })
                            }}
                          >
                            Сохранить
                          </Button>
                        </GridItem>
                      </GridContainer>
                    )
                  }
                  <Button color='danger' fullWidth style={{ marginTop: '-15px' }}
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
          <Snackbar open={openError} autoHideDuration={6000} onClose={handleCloseError}>
            <Alert onClose={handleCloseError} severity="error">
              {messageError}
            </Alert>
          </Snackbar>
          <Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleCloseSuccess}>
            <Alert onClose={handleCloseSuccess} severity="success">
              {messageSuccess}
            </Alert>
          </Snackbar>
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