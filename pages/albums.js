/*eslint-disable*/
import React from "react";
import Link from "next/link";
import Image from "next/image";
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
import Tooltip from "@material-ui/core/Tooltip";
import AlbumsGallery from 'components/AlbumsGallery/AlbumsGallery.js'
import { SRLWrapper } from 'simple-react-lightbox-pro'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import docsPageStyle from "assets/jss/nextjs-material-kit-pro/pages/docsPageStyle.js";

import Search from "@material-ui/icons/Search";

const useStyles = makeStyles(docsPageStyle);

export default function docsPage({ albums }) {
  React.useEffect(() => {
  });

  const classes = useStyles();

  const lighbtoxOptions = {
    buttons: {
      showAutoplayButton: false,
      showDownloadButton: false
    },
    translations: {
      closeText: 'Закрыть',
      fullscreenText: 'Полноэкранный режим',
      nextText: 'Дальше',
      pauseText: 'Пауза',
      previousText: 'Назад',
      thumbnailsText: 'Спрятать миниатюры',
      zoomOutText: 'Отдалить'
    }
  }

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
              key='docs-header'
            >
              <h2 className={classes.title}>Альбомы НСВП-3</h2>
              <h5 className={classes.description}>
                Альбомы по НСВП-3. Все картинки можно скачать/просмотреть с этой страницы или с <a href='https://1drv.ms/u/s!ApW8Q2E_xaNto7w0M4mlNbuYm9vUtw?e=ixcHod'>OneDrive</a>.
              </h5>
            </GridItem>
            {
              albums.map(area => (
                <>
                  <GridItem md={12}>
                    <h3>{area.name}</h3>
                  </GridItem>


                  { /* START OF RADAR SECTORS */}
                  <GridItem md={12}>
                    <h4>Круг</h4>
                  </GridItem>
                  <SRLWrapper options={lighbtoxOptions}>
                    <GridContainer justify="flex-start" alignItems="flex-start" style={{ marginLeft: '0.1em', marginRight: '0.1em' }}>
                      {
                        area.radar.map(imageName => (
                          <GridItem xs={12} sm={6} md={3} style={{ marginBottom: '1em' }}>
                            <Paper elevation={2}>
                              <a href={`https://storage.googleapis.com/atc.epinetov.com/public/albums/${area.icao}/radar/${imageName}.png`}>
                                <Image
                                  src={`https://storage.googleapis.com/atc.epinetov.com/public/albums/${area.icao}/radar/${imageName}.png`}
                                  width="320px"
                                  height="200px"
                                  alt={imageName}
                                  srl_gallery_image="true"
                                />
                              </a>
                            </Paper>
                          </GridItem>
                        ))
                      }
                    </GridContainer>
                  </SRLWrapper>
                  { /* END OF RADAR SECTORS */}


                  { /* START OF APPROACH SECTORS */}
                  <GridItem md={12}>
                    <h4>Подход</h4>
                  </GridItem>
                  <SRLWrapper options={lighbtoxOptions}>
                    <GridContainer justify="flex-start" alignItems="flex-start" style={{ marginLeft: '0.1em', marginRight: '0.1em' }}>
                      {
                        area.approach.map(imageName => (
                          <GridItem xs={12} sm={6} md={3} style={{ marginBottom: '1em' }}>
                            <Paper elevation={2}>
                              <a href={`https://storage.googleapis.com/atc.epinetov.com/public/albums/${area.icao}/approach/${imageName}.png`}>
                                <Image
                                  src={`https://storage.googleapis.com/atc.epinetov.com/public/albums/${area.icao}/approach/${imageName}.png`}
                                  width="320px"
                                  height="200px"
                                  alt={imageName}
                                  srl_gallery_image="true"
                                />
                              </a>
                            </Paper>
                          </GridItem>
                        ))
                      }
                    </GridContainer>
                  </SRLWrapper>
                  { /* END OF APPROACH SECTORS */}
                </>
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
  const albums = [
    {
      "name": "Шереметьево",
      "icao": 'uuee',
      "radar": ['A2D2_06_01_32', 'A2D2_24_01_32', 'A2_06', 'A2_24', 'D2_06_01_14', 'D2_06_01_32', 'D2_06_19_14', 'D2_06_19_32', 'D2_24_01_14', 'D2_24_01_32', 'D2_24_19_14', 'D2_24_19_32'],
      "approach": ['A1D1_06', 'A1D1_24', 'D1_06_01_32', 'D1_06_01_32_T', 'D1_24_19_14', 'D1_24_19_14_T']
    },
    {
      "name": "Внуково",
      "icao": 'uuww',
      "radar": ['A4D4_06_01_14', 'A4D4_06_01_32', 'A4D4_06_19_32', 'A4D4_24_01_14', 'A4D4_24_19_14', 'A4_01_07', 'A4_19_25', 'D4_06_01_14', 'D4_06_01_32', 'D4_06_19_14', 'D4_06_19_32', 'D4_24_01_14', 'D4_24_01_32', 'D4_24_19_14'],
      "approach": ['A3D3_24_19_14_T', 'A3', 'D3_06_01_32', 'D3_24_19_14', 'D3_24_19_14_T']
    },
    {
      "name": "Домодедово",
      "icao": 'uudd',
      "radar": ['A6D6_06_01_14_PEREK', 'A6D6_14_19_06', 'A6D6_24_01_32', 'A6_14_07', 'A6_14_25', 'A6_32_07', 'A6_32_25', 'D6_06_01_14', 'D6_06_01_32', 'D6_06_19_14', 'D6_06_19_32', 'D6_24_01_14', 'D6_24_01_32', 'D6_24_19_14', 'D6_24_19_32'],
      "approach": ['A5D5_24_19_14', 'A5', 'D5_06_19_32', 'D5_06_19_32_T', 'D5_24_01_14']
    },
    {
      "name": "Восток",
      "icao": 'uubw',
      "radar": ['D8_06_01_14', 'D8_06_01_32', 'D8_06_19_14', 'D8_06_19_32', 'D8_24_01_14', 'D8_24_01_32', 'D8_24_19_14', 'D8_24_19_32'],
      "approach": ['A7D7_06_01_32', 'A7D7_24_01_14', 'A7D7_25_01_32', 'A7', 'D7_06_10_32', 'D7_24_01_14', 'D7_24_01_14_T']
    }
  ]
  return {
    props: {
      albums
    }
  }
}