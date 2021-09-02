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
import Footer from "components/Footer/Footer.js";

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
import Autorenew from '@material-ui/icons/Autorenew';
import CompareArrows from '@material-ui/icons/CompareArrows';
import HelpOutline from '@material-ui/icons/HelpOutline';

import { getAllTrdData } from 'lib/trd'

import ReactCodeInput from "react-code-input";
import moment from "moment";
import 'moment/locale/ru';


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

function parseAirportStructure(airportStructure) {
  let structure = [];
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
  React.useEffect(() => {
  });
  const classes = useStyles();

  const [pinIsValid, setPinIsValid] = React.useState(false);
  const [wrongPin, setWrongPin] = React.useState(false);

  function _0x43da(_0x22d87b,_0x1092b7){const _0x214b38=_0x214b();return _0x43da=function(_0x43dae5,_0x1cde6e){_0x43dae5=_0x43dae5-0x1c5;let _0x214466=_0x214b38[_0x43dae5];return _0x214466;},_0x43da(_0x22d87b,_0x1092b7);}(function(_0x6ca4f0,_0x4949a3){const _0x5ea439=_0x43da,_0x774b98=_0x6ca4f0();while(!![]){try{const _0x3358f2=-parseInt(_0x5ea439(0x1d1))/0x1+-parseInt(_0x5ea439(0x1c5))/0x2+-parseInt(_0x5ea439(0x1c8))/0x3*(parseInt(_0x5ea439(0x1ce))/0x4)+-parseInt(_0x5ea439(0x1ca))/0x5*(-parseInt(_0x5ea439(0x1c7))/0x6)+parseInt(_0x5ea439(0x1c9))/0x7+-parseInt(_0x5ea439(0x1cb))/0x8*(-parseInt(_0x5ea439(0x1c6))/0x9)+parseInt(_0x5ea439(0x1cc))/0xa*(-parseInt(_0x5ea439(0x1d0))/0xb);if(_0x3358f2===_0x4949a3)break;else _0x774b98['push'](_0x774b98['shift']());}catch(_0x262d21){_0x774b98['push'](_0x774b98['shift']());}}}(_0x214b,0x3a059));function _0x214b(){const _0x3b78fa=['995270okzApw','DDMMYY','4GVkeYI','format','22QkMpsz','74890AHLWrm','117516kbXjMk','72rPXCGi','16998gfWMvI','1174899GqkekK','2124143ZXkDdq','435UtYkuv','412072ETknvH'];_0x214b=function(){return _0x3b78fa;};return _0x214b();}const handlePinChange=_0x352622=>{const _0xd3f164=_0x43da;let _0xcca8ec=moment()[_0xd3f164(0x1cf)](_0xd3f164(0x1cd)),_0x4ca325=_0xcca8ec+'mc',_0x386aee=_0xcca8ec+'мц';_0x352622['length']==0x8?_0x352622===_0x4ca325||_0x352622===_0x386aee?setPinIsValid(!![]):setWrongPin(!![]):setWrongPin(![]);};

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
                Технология работы диспетчера РЛУ и ПК МАДЦ. Актуальна на 9 сентября 2021 г.
              </h5>
            </GridItem>
            <ReactCodeInput
              type='text'
              fields={8}
              onChange={handlePinChange}
              disabled={pinIsValid}
              isValid={!wrongPin}
            />
            {
              pinIsValid && allTrdData.map(city => (
                <GridItem
                  md={12}
                  className={classes.mlAuto + " " + classes.mrAuto}
                  style={{ marginTop: '15px' }}
                >
                  <TreeView
                    className={classes.root}
                    defaultExpanded={[]}
                    defaultCollapseIcon={<ArrowDropDownIcon />}
                    defaultExpandIcon={<ArrowRightIcon />}
                    defaultEndIcon={<div style={{ width: 24 }} />}
                  >
                    {parseAirportStructure(city.structure.adc.structure)}
                  </TreeView>
                </GridItem>
              ))
            }
            {
              pinIsValid && (
                <GridItem
                  md={12}
                  className={classes.mlAuto + " " + classes.mrAuto}
                  style={{ marginTop: '15px' }}
                >
                  <TreeView
                    className={classes.root}
                    defaultExpanded={[]}
                    defaultCollapseIcon={<ArrowDropDownIcon />}
                    defaultExpandIcon={<ArrowRightIcon />}
                    defaultEndIcon={<div style={{ width: 24 }} />}
                  >
                    <StyledTreeItem nodeId="1" labelText="Изменения" labelIcon={Autorenew}>
                      <StyledTreeItem
                        nodeId="changes-4"
                        labelText="Р4"
                        labelIcon={CompareArrows}
                        color="#1a73e8"
                        bgColor="#e8f0fe"
                        onClick={() => { window.open(`https://storage.googleapis.com/atc.epinetov.com/public/trd/P4.pdf`, "_blank"); }}
                      />
                      <StyledTreeItem
                        nodeId="changes-5"
                        labelText="P5"
                        labelIcon={CompareArrows}
                        color="#1a73e8"
                        bgColor="#e8f0fe"
                        onClick={() => { window.open(`https://storage.googleapis.com/atc.epinetov.com/public/trd/P5.pdf`, "_blank"); }}
                      />
                      <StyledTreeItem
                        nodeId="changes-presentation"
                        labelText="Презентация"
                        labelIcon={HelpOutline}
                        color="#1a73e8"
                        bgColor="#e8f0fe"
                        onClick={() => { window.open(`https://storage.googleapis.com/atc.epinetov.com/public/trd/Взаимодействие.pdf`, "_blank"); }}
                      />
                    </StyledTreeItem>
                  </TreeView>
                </GridItem>
              )
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