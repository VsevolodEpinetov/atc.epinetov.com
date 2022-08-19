import React from 'react';

import Image from 'next/image'

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";

import Button from "components/CustomButtons/Button.js";
import CustomLinearProgress from "components/CustomLinearProgress/CustomLinearProgress.js";

import { rankSpeed, colorForSpeed, rankCeiling, colorForCeiling } from 'lib/utility'

import Slide from "@material-ui/core/Slide";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

import { makeStyles } from "@material-ui/core/styles";
import aircraftCardStyles from "assets/jss/custom-components/aircraftPage/aircraftCardStyles.js";
const useStyles = makeStyles(aircraftCardStyles);


const AircraftDialog = ( {wikiLink, ceiling, speed, modal, setModal, atcHTML, name, summary, aircraftName,id, atc} ) => {
  const classes = useStyles();

  return (
    <Dialog
      scroll="paper"
      open={modal}
      TransitionComponent={Transition}
      maxWidth='md'
      onClose={() => setModal(false)}
      aria-labelledby={`aircraft-${id}-slide-title`}
      aria-describedby={`aircraft-${id}-slide-description`}
    >
      <DialogTitle id="scroll-dialog-title">
        {name}
      </DialogTitle>
      <DialogContent
        id={`aircraft-${id}-modal-description`}
        className={classes.modalBody}
        dividers
      >
        <DialogContentText
          id={`scroll-dialog-${id}-description`}
          component='span'
        >
          <GridContainer>
            <GridItem md={12} className={classes.imageHolder}>
              <Image
                placeholder='blur'
                src={require(`../../data/aircraft/${id}/main.webp`)}
                alt={name}
              />
            </GridItem>
            <GridItem md={12}>
              <h2 className={classes.title}>{name}</h2>
              <h3>Общее</h3>
              <p>{summary}</p>
              {
                atc && (
                  <>
                    <h3>Особенности при ОВД</h3>
                    <p>{atc}</p>
                  </>
                )
              }
              {
                atcHTML && (
                  <>
                    <h3>Особенности при ОВД</h3>
                    <span dangerouslySetInnerHTML={{ __html: atcHTML }} />
                  </>
                )
              }
              <br />
              <p>Скорость: {rankSpeed(speed)['10']}/10 ({speed} км/ч)</p>
              <CustomLinearProgress
                variant="determinate"
                color={colorForSpeed(speed)}
                value={rankSpeed(speed)['100']}
              />
              <p>Потолок: {rankCeiling(ceiling)['10']}/10 (FL{ceiling})</p>
              <CustomLinearProgress
                variant="determinate"
                color={colorForCeiling(ceiling)}
                value={rankCeiling(ceiling)['100']}
              />
              <Button color="white" justIcon href={wikiLink}>
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
          onClick={() => setModal(false)}
          color="info"
          round
        >
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AircraftDialog;