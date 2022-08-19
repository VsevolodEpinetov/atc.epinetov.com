import React, { useState } from 'react';
import Image from 'next/image'

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import { makeStyles } from "@material-ui/core/styles";
import Box from '@material-ui/core/Box';

import aircraftCardStyles from "assets/jss/custom-components/aircraftPage/aircraftCardStyles.js";
const useStyles = makeStyles(aircraftCardStyles);

import { getWeightStats } from 'lib/utility'
import AircraftDialog from './AircraftDialog';

const AircraftCard = ( {aircraftInfo, aircraftName, aircraftThumbnailIsShown} ) => {
  const classes = useStyles();
  const [modal, setModal] = useState(false);

  return (
    <GridItem xs={12} sm={6} md={3} key={`${aircraftName}`} className={aircraftThumbnailIsShown}>
      <GridContainer onClick={() => setModal(true)}>
        <GridItem md={12}>
          <Box
            color="black"
            backgroundсolor="rgba(255, 255, 255, 0)"
          >
            <Image
              placeholder='blur'
              src={require(`../../data/aircraft/${aircraftName}/thumbnail.webp`)}
              alt={aircraftInfo.name.plain}
              className={classes.thumbnail}
            />
          </Box>
        </GridItem>
        <GridItem style={{ cursor: "pointer" }}>
          <h3>{aircraftInfo.name.plain}</h3>
          <p>{aircraftInfo.specs.engines.quantity} двигателя <br /> <span className={classes[`${getWeightStats(aircraftInfo.specs.maxTakeOffWeight.kg).color}Text`]}>{getWeightStats(aircraftInfo.specs.maxTakeOffWeight.kg).rus}</span></p>
        </GridItem>
      </GridContainer>
      <AircraftDialog 
        ceiling={aircraftInfo.specs.ceiling.fl}
        speed={aircraftInfo.specs.speed.cruising.kmh}
        wikiLink={aircraftInfo.links.wiki}
        atcHTML={aircraftInfo.commentary.atcHtml}
        atc={aircraftInfo.commentary.atc}
        name={aircraftInfo.name.plain}
        summary={aircraftInfo.commentary.summary}
        id={aircraftName}
        modal={modal}
        setModal={setModal}
      />
    </GridItem>
  );
};

export default AircraftCard;