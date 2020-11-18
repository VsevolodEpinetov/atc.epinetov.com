/*eslint-disable*/
import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import CustomLinearProgress from "components/CustomLinearProgress/CustomLinearProgress.js";
import Footer from "components/Footer/Footer.js";

import Box from '@material-ui/core/Box';
import Close from "@material-ui/icons/Close";

import { getAllAircraftData } from 'lib/aircraft'

import { rankSpeed, colorForSpeed } from 'lib/utility'

import style from "assets/jss/nextjs-material-kit-pro/pages/aircraftPageStyle.js";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles(style);

export default function AircraftPage({ allAircraftData }) {
  const [modals, setModalsState] = React.useState({});


  allAircraftData.forEach(({ aircraftName }) => {
    () => addAircraftToModals(aircraftName);
  })

  function addAircraftToModals(aircraft) {
    setModalsState((prevState) => ({ ...prevState, [aircraft]: false }));
  }

  function openModal(aircraft) {
    setModalsState((prevState) => ({ ...prevState, [aircraft]: true }));
  }

  function closeModal(aircraft) {
    setModalsState((prevState) => ({ ...prevState, [aircraft]: false }));
  }

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
            <GridItem
              md={12}
              className={classes.mlAuto + " " + classes.mrAuto}
              style={{ marginBottom: '3em !important' }}
            >
              <h2 className={classes.title}>Воздушные суда</h2>
              <h5 className={classes.description}>
                Список наиболее часто встречающихся при ОВД воздушных судов. На страничке каждого ВС имеются ранги некоторых характеристик. Очень важно понимать, что значения характеристик (а значит, и баллов) - это частные случаи, которые можно ожидать от ВС в большинстве случаев. На практике все значения зависят от состояния ВС, экипажа, погоды, времени года и прочих факторов. Список будет полезен в основном тем, кто очень плохо разбирается в ВС и с чем их едят :)
              </h5>
              <h5 className={classes.description}>
                Информация взята с различных источников: от <a href="https://ru.wikipedia.org/wiki/%D0%92%D0%BE%D0%B7%D0%B4%D1%83%D1%88%D0%BD%D0%BE%D0%B5_%D1%81%D1%83%D0%B4%D0%BD%D0%BE">Википедии</a> до знаний опытных диспетчеров
              </h5>
            </GridItem>
            {
              allAircraftData.map(({ aircraftName, aircraftInfo }) => (
                <GridItem xs={12} sm={6} md={3}>
                  <GridContainer onClick={() => openModal(aircraftName)}>
                    <GridItem md={12}>
                      <Box
                        color="black"
                        backgroundColor="rgba(255, 255, 255, 0)"
                      >
                        <img
                          src={require(`assets/data/aircraft/${aircraftName}/thumbnail.webp`)}
                          alt={aircraftInfo.name.plain}
                          style={{ width: "100%", display: "block", cursor: "pointer" }}
                        />
                      </Box>
                    </GridItem>
                    <GridItem style={{ cursor: "pointer" }}>
                      <h3>{aircraftInfo.name.plain}</h3>
                      <p>{aircraftInfo.specs.engines.quantity} двигателя</p>
                    </GridItem>
                  </GridContainer>
                  <Dialog
                    scroll="paper"
                    open={modals[aircraftName]}
                    TransitionComponent={Transition}
                    onClose={() => closeModal(aircraftName)}
                    aria-labelledby={`aircraft-${aircraftName}-slide-title`}
                    aria-describedby={`aircraft-${aircraftName}-slide-description`}
                  >
                    {/*<DialogTitle
                      disableTypography
                      className={classes.modalHeader}
                      id={`aircraft-${aircraftName}-modal-title`}
                    >
                      <Button
                        simple
                        className={classes.modalCloseButton}
                        key="close"
                        aria-label="Close"
                        onClick={() => closeModal(aircraftName)}
                      >
                        {" "}
                        <Close className={classes.modalClose} />
                      </Button>
                      <h4 className={classes.modalTitle}>
                        {aircraftName}
                      </h4>
                    </DialogTitle>*/}
                    <DialogTitle id="scroll-dialog-title">
                      {aircraftInfo.name.plain}
                    </DialogTitle>
                      <DialogContent
                        id={`aircraft-${aircraftName}-modal-description`}
                        className={classes.modalBody}
                        dividers
                      >
                        <DialogContentText
                          id={`scroll-dialog-${aircraftName}-description`}
                          tabIndex={-1}
                        >
                          <GridContainer>
                            <GridItem md={12} className={classes.imageHolder} style={{ background: `url(${require(`assets/data/aircraft/${aircraftName}/main.webp`)})` }}>
                              <img
                                src={require(`assets/data/aircraft/${aircraftName}/main.webp`)}
                                alt={aircraftName}
                                style={{ width: "100%", display: "block", opacity: "0" }}
                              />
                            </GridItem>
                            <GridItem md={12}>
                              <h2 className={classes.title}>{aircraftInfo.name.plain}</h2>
                              <h4>{aircraftInfo.commentary.subtitle}</h4>
                              <br />
                              <p>Скорость: {rankSpeed(aircraftInfo.specs.speed.cruising.kmh)['10']}/10 ({aircraftInfo.specs.speed.cruising.kmh} км/ч)</p>
                              <CustomLinearProgress
                                variant="determinate"
                                color={colorForSpeed(aircraftInfo.specs.speed.cruising.kmh)}
                                value={rankSpeed(aircraftInfo.specs.speed.cruising.kmh)['100']}
                              />
                              <Button color="white" justIcon href={aircraftInfo.links.wiki}>
                                <i className="fab fa-wikipedia-w" />
                              </Button>
                            </GridItem>
                          </GridContainer>
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions
                        className={
                          classes.modalFooter + " " + classes.modalFooterCenter
                        }
                      >
                        <Button
                          onClick={() => closeModal(aircraftName)}
                          color="info"
                          round
                        >
                          Закрыть
                        </Button>
                      </DialogActions>
                  </Dialog>
                </GridItem>
              ))
            }
          </GridContainer>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export async function getStaticProps() {
  const allAircraftData = getAllAircraftData()
  return {
    props: {
      allAircraftData
    }
  }
}