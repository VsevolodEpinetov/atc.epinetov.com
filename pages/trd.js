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

import { getSortedDocsData } from 'lib/docs'
import Date from 'lib/date'

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

function getMinHeight (numberOfOpenedAirports) {
  return ` ${1 + numberOfOpenedAirports * 300}px !important`;
}

function setAirportOpened (e) {
  console.log(e)
}

export default function docsPage({ allDocsData }) {
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
              style={{ marginBottom: '3em !important' }}
            >
              <h2 className={classes.title}>Технология работы</h2>
              <h5 className={classes.description}>
                Технология работы диспетчера РЛУ и ПК МАДЦ. Актуальна на 22 апреля 2021 г.
              </h5>
            </GridItem>
            <GridItem
              md={12}
              className={classes.mlAuto + " " + classes.mrAuto + " " + `opened-${airportCategoriesOpened}`}
              style={{ marginBottom: '3em !important' }}
              id='categories'
            >
              <TreeView
                className={classes.root}
                defaultExpanded={[]}
                defaultCollapseIcon={<ArrowDropDownIcon />}
                defaultExpandIcon={<ArrowRightIcon />}
                defaultEndIcon={<div style={{ width: 24 }} />}
                onNodeToggle={(event, nodeIds) => {
                  var i = 0;
                  if (nodeIds.includes('1')) i++;
                  if (nodeIds.includes('2')) i++;
                  if (nodeIds.includes('3')) i++;
                  if (nodeIds.includes('4')) i++;
                  setAirportCategoriesOpened(i);
                }}
              >
                <StyledTreeItem nodeId="1" labelText="Шереметьево" labelIcon={Flight}>
                  <StyledTreeItem
                    nodeId="5"
                    labelText="А2"
                    labelIcon={FlightLand}
                    color="#1a73e8"
                    bgColor="#e8f0fe"
                    onClick={() => {window.open("/trd/A2.pdf", "_blank");}}
                  />
                  <StyledTreeItem
                    nodeId="6"
                    labelText="А2+А2С"
                    labelIcon={FlightLand}
                    color="#1a73e8"
                    bgColor="#e8f0fe"
                    onClick={() => {window.open("/trd/A2+A2S.pdf", "_blank");}}
                  />
                  <StyledTreeItem
                    nodeId="7"
                    labelText="А2+А2С+ШД2+ШД1"
                    labelIcon={FlightLand}
                    color="#1a73e8"
                    bgColor="#e8f0fe"
                    onClick={() => {window.open("/trd/A2+A2S+SD2+SD1.pdf", "_blank");}}
                  />
                  <StyledTreeItem
                    nodeId="8"
                    labelText="А2+А2С+ШД2+ШД1+Д2"
                    labelIcon={FlightLand}
                    color="#1a73e8"
                    bgColor="#e8f0fe"
                    onClick={() => {window.open("/trd/A2+A2S+SD2+SD1+D2.pdf", "_blank");}}
                  />
                  <StyledTreeItem
                    nodeId="9"
                    labelText="А2С"
                    labelIcon={FlightLand}
                    color="#1a73e8"
                    bgColor="#e8f0fe"
                    onClick={() => {window.open("/trd/A2S.pdf", "_blank");}}
                  />
                  <StyledTreeItem
                    nodeId="10"
                    labelText="Д2"
                    labelIcon={FlightTakeoff}
                    color="#1a73e8"
                    bgColor="#e8f0fe"
                    onClick={() => {window.open("/trd/D2.pdf", "_blank");}}
                  />
                  <StyledTreeItem
                    nodeId="11"
                    labelText="ШД1"
                    labelIcon={FlightLand}
                    color="#1a73e8"
                    bgColor="#e8f0fe"
                    onClick={() => {window.open("/trd/SD1.pdf", "_blank");}}
                  />
                  <StyledTreeItem
                    nodeId="12"
                    labelText="ШД2"
                    labelIcon={FlightLand}
                    color="#1a73e8"
                    bgColor="#e8f0fe"
                    onClick={() => {window.open("/trd/SD2.pdf", "_blank");}}
                  />
                  <StyledTreeItem
                    nodeId="13"
                    labelText="ШД2+ШД1"
                    labelIcon={FlightLand}
                    color="#1a73e8"
                    bgColor="#e8f0fe"
                    onClick={() => {window.open("/trd/SD2+SD1.pdf", "_blank");}}
                  />
                  <StyledTreeItem
                    nodeId="14"
                    labelText="А1"
                    labelIcon={FlightLand}
                    color="#1a73e8"
                    bgColor="#e8f0fe"
                    onClick={() => {window.open("/trd/A1.pdf", "_blank");}}
                  />
                  <StyledTreeItem
                    nodeId="15"
                    labelText="А1+Д1"
                    labelIcon={FlightLand}
                    color="#1a73e8"
                    bgColor="#e8f0fe"
                    onClick={() => {window.open("/trd/A1+D1.pdf", "_blank");}}
                  />
                  <StyledTreeItem
                    nodeId="16"
                    labelText="Д1"
                    labelIcon={FlightTakeoff}
                    color="#1a73e8"
                    bgColor="#e8f0fe"
                    onClick={() => {window.open("/trd/D1.pdf", "_blank");}}
                  />
                </StyledTreeItem>
                <StyledTreeItem nodeId="2" labelText="Внуково" labelIcon={Flight}>
                  <StyledTreeItem
                    nodeId="17"
                    labelText="А3"
                    labelIcon={FlightLand}
                    color="#1a73e8"
                    bgColor="#e8f0fe"
                    onClick={() => {window.open("/trd/A3.pdf", "_blank");}}
                  />
                  <StyledTreeItem
                    nodeId="18"
                    labelText="А3+Д3"
                    labelIcon={FlightLand}                     
                    color="#1a73e8"
                    bgColor="#e8f0fe"
                    onClick={() => {window.open("/trd/A3+D3.pdf", "_blank");}}
                  />
                  <StyledTreeItem
                    nodeId="19"
                    labelText="А4"
                    labelIcon={FlightLand}                     
                    color="#1a73e8"
                    bgColor="#e8f0fe"
                    onClick={() => {window.open("/trd/A4.pdf", "_blank");}}
                  />
                  <StyledTreeItem
                    nodeId="20"
                    labelText="А4+ВД"
                    labelIcon={FlightLand}                     
                    color="#1a73e8"
                    bgColor="#e8f0fe"
                    onClick={() => {window.open("/trd/A4+WD.pdf", "_blank");}}
                  />
                  <StyledTreeItem
                    nodeId="21"
                    labelText="А4+ВД+Д4"
                    labelIcon={FlightLand}                     
                    color="#1a73e8"
                    bgColor="#e8f0fe"
                    onClick={() => {window.open("/trd/A4+WD+D4.pdf", "_blank");}}
                  />
                  <StyledTreeItem
                    nodeId="22"
                    labelText="ВД"
                    labelIcon={FlightLand}                     
                    color="#1a73e8"
                    bgColor="#e8f0fe"
                    onClick={() => {window.open("/trd/WD.pdf", "_blank");}}
                  />
                  <StyledTreeItem
                    nodeId="23"
                    labelText="Д3"
                    labelIcon={FlightTakeoff}                     
                    color="#1a73e8"
                    bgColor="#e8f0fe"
                    onClick={() => {window.open("/trd/D3.pdf", "_blank");}}
                  />
                  <StyledTreeItem
                    nodeId="24"
                    labelText="Д4"
                    labelIcon={FlightTakeoff}                     
                    color="#1a73e8"
                    bgColor="#e8f0fe"
                    onClick={() => {window.open("/trd/D4.pdf", "_blank");}}
                  />
                </StyledTreeItem>
                <StyledTreeItem nodeId="3" labelText="Домодедово" labelIcon={Flight}>
                  <StyledTreeItem
                    nodeId="25"
                    labelText="А5"
                    labelIcon={FlightLand}                     
                    color="#1a73e8"
                    bgColor="#e8f0fe"
                    onClick={() => {window.open("/trd/A5.pdf", "_blank");}}
                  />
                  <StyledTreeItem
                    nodeId="26"
                    labelText="А5+Д5"
                    labelIcon={FlightLand}                     
                    color="#1a73e8"
                    bgColor="#e8f0fe"
                    onClick={() => {window.open("/trd/A5+D5.pdf", "_blank");}}
                  />
                  <StyledTreeItem
                    nodeId="27"
                    labelText="А6"
                    labelIcon={FlightLand}                     
                    color="#1a73e8"
                    bgColor="#e8f0fe"
                    onClick={() => {window.open("/trd/A6.pdf", "_blank");}}
                  />
                  <StyledTreeItem
                    nodeId="28"
                    labelText="А6+А8"
                    labelIcon={FlightLand}                     
                    color="#1a73e8"
                    bgColor="#e8f0fe"
                    onClick={() => {window.open("/trd/A6+A8.pdf", "_blank");}}
                  />
                  <StyledTreeItem
                    nodeId="29"
                    labelText="А6+А8+ДД1+ДД2"
                    labelIcon={FlightLand}                     
                    color="#1a73e8"
                    bgColor="#e8f0fe"
                    onClick={() => {window.open("/trd/A6+A8+DD1+DD2.pdf", "_blank");}}
                  />
                  <StyledTreeItem
                    nodeId="30"
                    labelText="А6+А8+ДД1+ДД2+Д6"
                    labelIcon={FlightLand}                     
                    color="#1a73e8"
                    bgColor="#e8f0fe"
                    onClick={() => {window.open("/trd/A6+A8+DD1+DD2+D6.pdf", "_blank");}}
                  />
                  <StyledTreeItem
                    nodeId="31"
                    labelText="А8"
                    labelIcon={FlightLand}                     
                    color="#1a73e8"
                    bgColor="#e8f0fe"
                    onClick={() => {window.open("/trd/A8.pdf", "_blank");}}
                  />
                  <StyledTreeItem
                    nodeId="32"
                    labelText="Д5"
                    labelIcon={FlightTakeoff}                     
                    color="#1a73e8"
                    bgColor="#e8f0fe"
                    onClick={() => {window.open("/trd/D5.pdf", "_blank");}}
                  />
                  <StyledTreeItem
                    nodeId="33"
                    labelText="Д6"
                    labelIcon={FlightTakeoff}                     
                    color="#1a73e8"
                    bgColor="#e8f0fe"
                    onClick={() => {window.open("/trd/D6.pdf", "_blank");}}
                  />
                  <StyledTreeItem
                    nodeId="34"
                    labelText="ДД1"
                    labelIcon={FlightLand}                     
                    color="#1a73e8"
                    bgColor="#e8f0fe"
                    onClick={() => {window.open("/trd/DD1.pdf", "_blank");}}
                  />
                  <StyledTreeItem
                    nodeId="35"
                    labelText="ДД1+ДД2"
                    labelIcon={FlightLand}                     
                    color="#1a73e8"
                    bgColor="#e8f0fe"
                    onClick={() => {window.open("/trd/DD1+DD2.pdf", "_blank");}}
                  />
                  <StyledTreeItem
                    nodeId="36"
                    labelText="ДД2"
                    labelIcon={FlightLand}                     
                    color="#1a73e8"
                    bgColor="#e8f0fe"
                    onClick={() => {window.open("/trd/DD2.pdf", "_blank");}}
                  />
                </StyledTreeItem>
                <StyledTreeItem nodeId="4" labelText="Восток" labelIcon={Flight}>
                  <StyledTreeItem
                    nodeId="37"
                    labelText="А7"
                    labelIcon={FlightTakeoff}                     
                    color="#1a73e8"
                    bgColor="#e8f0fe"
                    onClick={() => {window.open("/trd/A7.pdf", "_blank");}}
                  />
                  <StyledTreeItem
                    nodeId="38"
                    labelText="А7+Д7"
                    labelIcon={FlightLand}                     
                    color="#1a73e8"
                    bgColor="#e8f0fe"
                    onClick={() => {window.open("/trd/A7+D7.pdf", "_blank");}}
                  />
                  <StyledTreeItem
                    nodeId="39"
                    labelText="Д7"
                    labelIcon={FlightLand}                     
                    color="#1a73e8"
                    bgColor="#e8f0fe"
                    onClick={() => {window.open("/trd/D7.pdf", "_blank");}}
                  />
                  <StyledTreeItem
                    nodeId="40"
                    labelText="Д8"
                    labelIcon={FlightLand}                     
                    color="#1a73e8"
                    bgColor="#e8f0fe"
                    onClick={() => {window.open("/trd/D8.pdf", "_blank");}}
                  />
                </StyledTreeItem>
              </TreeView>
            </GridItem>
          </GridContainer>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const allDocsData = getSortedDocsData()
  return {
    props: {
      allDocsData
    }
  }
}