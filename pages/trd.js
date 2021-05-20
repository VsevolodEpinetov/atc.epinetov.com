/*eslint-disable*/
import React from "react";
import Link from "next/link";
import PropTypes from 'prop-types';
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
import CustomInput from "components/CustomInput/CustomInput.js";

import trdPageStyle from "assets/jss/nextjs-material-kit-pro/pages/trdPageStyle.js";

import Search from "@material-ui/icons/Search";

import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';
import Flight from '@material-ui/icons/Flight';
import FlightTakeoff from '@material-ui/icons/FlightTakeoff';
import FlightLand from '@material-ui/icons/FlightLand';
import DeleteIcon from '@material-ui/icons/Delete';
import Label from '@material-ui/icons/Label';
import InfoIcon from '@material-ui/icons/Info';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import { getAllTrdData } from 'lib/trd'

const useStyles = makeStyles(trdPageStyle);
const useTreeItemStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.secondary,
    '&:hover > $content': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:focus > $content, &$selected > $content': {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
      color: 'var(--tree-view-color)',
    },
    '&:focus > $content $label, &:hover > $content $label, &$selected > $content $label': {
      backgroundColor: 'transparent',
    },
  },
  content: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    '$expanded > &': {
      fontWeight: theme.typography.fontWeightRegular,
    },
  },
  group: {
    marginLeft: 0,
    '& $content': {
      paddingLeft: theme.spacing(2),
    },
  },
  expanded: {},
  selected: {},
  label: {
    fontWeight: 'inherit',
    color: 'inherit',
  },
  labelRoot: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0.5, 0),
  },
  labelIcon: {
    marginRight: theme.spacing(1),
  },
  labelText: {
    fontWeight: 'inherit',
    flexGrow: 1,
  },
}));

function StyledTreeItem(props) {
  const classes = useTreeItemStyles();
  const { labelText, labelIcon: LabelIcon, color, bgColor, ...other } = props;

  return (
    <TreeItem
      label={
        <div className={classes.labelRoot}>
          <LabelIcon color="inherit" className={classes.labelIcon} />
          <Typography variant="body2" className={classes.labelText}>
            {labelText}
          </Typography>
        </div>
      }
      style={{
        '--tree-view-color': color,
        '--tree-view-bg-color': bgColor,
      }}
      classes={{
        root: classes.root,
        content: classes.content,
        expanded: classes.expanded,
        selected: classes.selected,
        group: classes.group,
        label: classes.label,
      }}
      {...other}
    />
  );
}

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.elementType.isRequired,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
};

function getMinHeight(numberOfOpenedAirports) {
  return ` ${1 + numberOfOpenedAirports * 300}px !important`;
}

function setAirportOpened(e) {
  console.log(e)
}

function parseAirportStructure (airportStructure) {
  let structure = [];
  let test, testN = 1;
  let nodeID = 1;
  let rootID = 0;
  for (const airportICAO in airportStructure) {

    let radarStructure = [];
    airportStructure[airportICAO].structure.radar.sectors.forEach(sector => {
      nodeID++;
      radarStructure.push(<StyledTreeItem nodeId={nodeID.toString()} labelText={sector.name.rus} labelIcon={FlightLand} color="#1a73e8" bgColor="#e8f0fe" onClick={() => { window.open(`https://storage.googleapis.com/atc.epinetov.com/public/trd/${sector.name.eng}.pdf`, "_blank"); }} />)
    })


    let approachStructure = [];
    airportStructure[airportICAO].structure.approach.sectors.forEach(sector => {
      nodeID++;
      approachStructure.push(<StyledTreeItem nodeId={nodeID.toString()} labelText={sector.name.rus} labelIcon={FlightLand} color="#1a73e8" bgColor="#e8f0fe" onClick={() => { window.open(`https://storage.googleapis.com/atc.epinetov.com/public/trd/${sector.name.eng}.pdf`, "_blank"); }} />)
    })

    nodeID++;
    let st = [];
    st.push(<StyledTreeItem nodeId={nodeID.toString()} labelText="Круг" labelIcon={Flight}>{radarStructure}</StyledTreeItem>);
    nodeID++;
    st.push(<StyledTreeItem nodeId={nodeID.toString()} labelText="Подход" labelIcon={Flight}>{approachStructure}</StyledTreeItem>);
    nodeID++;
    structure.push(<StyledTreeItem nodeId={nodeID.toString()} labelText={airportStructure[airportICAO].name} labelIcon={Flight} id={`root-${rootID}`}>{st}</StyledTreeItem>);
    rootID++;
  }
  return structure;
}

export default function docsPage({ allTrdData }) {
  const [airportCategoriesOpened, setAirportCategoriesOpened] = React.useState(0);
  React.useEffect(() => {
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
            <GridItem
              md={12}
              className={classes.mlAuto + " " + classes.mrAuto}
            >
              <h2 className={classes.title}>Технология работы</h2>
              <h5 className={classes.description}>
                Технология работы диспетчера РЛУ и ПК МАДЦ. Актуальна на 22 апреля 2021 г.
              </h5>
            </GridItem>
            {
              allTrdData.map(city => (
                <GridItem
                  md={12}
                  className={classes.mlAuto + " " + classes.mrAuto}
                  id='categories'
                >
                  <TreeView
                    className={classes.root}
                    defaultExpanded={[]}
                    defaultCollapseIcon={<ArrowDropDownIcon />}
                    defaultExpandIcon={<ArrowRightIcon />}
                    defaultEndIcon={<div style={{ width: 24 }} />}
                    onNodeToggle={(event, nodeIds) => {
                      /*let height = document.getElementById('root-0').offsetHeight + document.getElementById('root-1').offsetHeight + document.getElementById('root-2').offsetHeight + document.getElementById('root-3').offsetHeight + 150;
                      let e = document.getElementById('categories');
                      e.style.height = `${height}px !important`;
                      e.setAttribute('style', `height: ${height}px !important`)*/
                      //console.log(document.getElementById('root-1').offsetHeight);
                      //console.log(nodeIds)

                      //console.log(height)
                      //setAirportCategoriesOpened(i);
                    }}
                  >
                    {parseAirportStructure(city.structure.adc.structure)}
                  </TreeView>
                </GridItem>
              ))
            }
          </GridContainer>
        </div>
        </div>
        <Footer />
      </div>
  );
}

export async function getStaticProps() {
  const allTrdData = getAllTrdData()
  return {
        props: {
        allTrdData
      }
  }
}