import { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import LinearProgress from '@material-ui/core/LinearProgress';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Tooltip from "@material-ui/core/Tooltip";

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import linearProgressInternshipStyle from "../assets/jss/nextjs-material-kit-pro/components/linearProgressInternshipStyle.js";
const useStylesLinearProgress = makeStyles(linearProgressInternshipStyle);

import style from "assets/jss/nextjs-material-kit-pro/pages/aircraftPageStyle.js";
const useStyles = makeStyles(style);


const materialsToRead = [
  [
    {
      name: 'Организационная структура МЦ АУВД',
      type: 'post',
      link: '/posts/matcc-structure'
    }
  ]
]



export default function InternshipFeed({ internship }) {
  const classes = useStyles();
  const classesLinearProgress = useStylesLinearProgress();

  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (e, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const getLinearProgress = (info) => {
    const percentagePreliminary = Math.ceil((info.currentHoursPreliminary / info.totalHours) * 100);
    const percentageTraining = Math.ceil((info.currentHoursTraining / info.totalHours) * 100);
    const percentageNeighbours = Math.ceil((info.currentHoursNeighbours / info.totalHours) * 100);
    const percentageWorking = 100 - percentagePreliminary - percentageTraining - percentageNeighbours;
  
    const valueWorking = parseInt((info.currentHoursWorking / info.totalHoursWorking) * 100);
  
    return (
      <>
        <Tooltip
          title={`Предварительная ${info.currentHoursPreliminary}/${info.totalHoursPreliminary}`}
          aria-label="tooltip-linear-preliminary"
          classes={{
            tooltip: classesLinearProgress.tooltipFont,
          }}
        >
          <LinearProgress
            variant="determinate"
            //color="success"
            classes={{
              root: classesLinearProgress.root + " " + classesLinearProgress['success' + "Background"],
              bar: classesLinearProgress.bar + " " + classesLinearProgress['success']
            }}
            value={100}
            style={{ width: `${percentagePreliminary}%`, display: "inline-block" }}
          />
        </Tooltip>
        <Tooltip
          title={`Ознакомление со смежными ${info.currentHoursNeighbours}/${info.totalHoursNeighbours}`}
          aria-label="tooltip-linear-neighbours"
          classes={{
            tooltip: classesLinearProgress.tooltipFont,
          }}
        >
          <LinearProgress
            variant="determinate"
            //color="warning"
            classes={{
              root: classesLinearProgress.root + " " + classesLinearProgress['warning' + "Background"],
              bar: classesLinearProgress.bar + " " + classesLinearProgress['warning']
            }}
            value={100}
            style={{ width: `${percentageNeighbours}%`, display: "inline-block" }}
          />
        </Tooltip>
        <Tooltip
          title={`Тренажёры ${info.currentHoursTraining}/${info.totalHoursTraining}`}
          aria-label="tooltip-linear-training"
          classes={{
            tooltip: classesLinearProgress.tooltipFont,
          }}
        >
          <LinearProgress
            variant="determinate"
            //color="info"
            classes={{
              root: classesLinearProgress.root + " " + classesLinearProgress['info' + "Background"],
              bar: classesLinearProgress.bar + " " + classesLinearProgress['info']
            }}
            value={100}
            style={{ width: `${percentageTraining}%`, display: "inline-block" }}
          />
        </Tooltip>
        <Tooltip
          title={`На рабочем месте ${info.currentHoursWorking}/${info.totalHoursWorking}`}
          aria-label="tooltip-linear-working"
          classes={{
            tooltip: classesLinearProgress.tooltipFont,
          }}
        >
          <LinearProgress
            variant="determinate"
            //color="primary"
            classes={{
              root: classesLinearProgress.root + " " + classesLinearProgress['primary' + "Background"],
              bar: classesLinearProgress.bar + " " + classesLinearProgress['primary']
            }}
            value={valueWorking}
            style={{ width: `${percentageWorking}%`, display: "inline-block" }}
          />
        </Tooltip>
      </>
    )
  }
  
  const getCurrentInternshipState = (info) => {
    let state = '';
  
    if (info.currentHoursPreliminary < info.totalHoursPreliminary)
      state = `Предварительная подготовка`
    else {
      state = `На рабочем месте. Задача №`
  
      let trainingTaskNumber = '0';
      switch (true) {
        case info.currentHoursTraining < 10:
          trainingTaskNumber = 1;
          break;
        case info.currentHoursTraining < 20:
          trainingTaskNumber = 2;
          break;
        case info.currentHoursTraining < 30:
          trainingTaskNumber = 3;
          break;
        default:
          trainingTaskNumber = 4;
          break;
      }
      state += trainingTaskNumber;
    }
  
    return state;
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        {getLinearProgress(internship)}
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        Текущий этап: {getCurrentInternshipState(internship)}
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Accordion expanded={expanded === `panel-internship-materials`} onChange={handleChange(`panel-internship-materials`)}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel-internship-materials-bh-content`}
            id={`panel-internship-materials-bh-header`}
          >
            Материалы для изучения
          </AccordionSummary>
          <AccordionDetails className={'accordion-root'}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <Card>
                  <CardBody>
                    <h4 className={classes.cardTitle}>ФП ИВП</h4>
                    <h6 className={classes.cardSubtitle}>Документ</h6>
                    <p>
                      Руководящий документ
                    </p>
                    <a
                      href="#pablo"
                      className={classes.cardLink}
                      onClick={e => e.preventDefault()}
                    >
                      Прочитать
                    </a>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <Card>
                  <CardBody>
                    <h4 className={classes.cardTitle}>ФАП 362</h4>
                    <h6 className={classes.cardSubtitle}>Документ</h6>
                    <p>
                      Руководящий документ
                    </p>
                    <a
                      href="#pablo"
                      className={classes.cardLink}
                      onClick={e => e.preventDefault()}
                    >
                      Прочитать
                    </a>
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
          </AccordionDetails>
        </Accordion>
      </GridItem>
    </GridContainer>
  )

}