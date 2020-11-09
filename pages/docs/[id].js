/*eslint-disable*/
import React from "react";
import Link from "next/link";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";
import Hidden from '@material-ui/core/Hidden';
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Footer from "components/Footer/Footer.js";
import { BsChevronUp } from 'react-icons/bs';
//import BackToTopButton from "components/BackToTopButton/BackToTopButton.js"

import docPageStyle from "assets/jss/nextjs-material-kit-pro/pages/docPageStyle.js";

import { getAllDocsIds, getDocData } from 'lib/docs'
import Date from 'lib/date'

import patternBG from "assets/img/pattern-bg.webp";

const useStyles = makeStyles(docPageStyle);

export default function DocPage({ docData }) {
  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });

  React.useEffect(() => {
    var href = window.location.href.substring(
      window.location.href.lastIndexOf("#") + 1
    );
    if (window.location.href.lastIndexOf("#") > 0) {
      document.getElementById(href).scrollIntoView();
    }
    window.addEventListener("scroll", updateView);
    updateView();
    return function cleanup() {
      window.removeEventListener("scroll", updateView);
    };
  });

  const easeInOutQuad = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  const updateView = () => {
    var documentBody = document.getElementById("document-body");
    var button = document.getElementById("button-to-top");

    if (
      documentBody.offsetTop -
      window.innerHeight / 2 <
      window.pageYOffset &&
      documentBody.offsetTop +
      documentBody.scrollHeight -
      window.innerHeight / 2 >
      window.pageYOffset
    ) {
      button.classList.remove("is-hidden");
    } else {
      button.classList.add("is-hidden");
    }
  };

  const smoothScroll = target => {
    var targetScroll = document.getElementById(target);
    scrollTo(document.documentElement, targetScroll.offsetTop, 900);
  };

  const scrollTo = (element, to, duration) => {
    var start = element.scrollTop,
      change = to - start + document.getElementById("document-body").offsetTop + 450,
      currentTime = 0,
      increment = 20;

    var animateScroll = function () {
      currentTime += increment;
      var val = easeInOutQuad(currentTime, start, change, duration);
      element.scrollTop = val;
      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    };
    animateScroll();
  };

  const structureList = (structure) => {
    const headersLinks = Object.keys(structure).map(id => {
      var subheaderLinks;
      if (structure[id].subheaders) subheaderLinks = structure[id].subheaders.map((subheader, subheaderID) => <li><a href={`#${id}-${subheaderID}`} onClick={e => { e.preventDefault(); smoothScroll(`${id}-${subheaderID}`); }}>{subheader}</a></li>)
      return <span><li><a href={`#${id}`} onClick={e => { e.preventDefault(); smoothScroll(`${id}`); }}>{structure[id].name}</a></li><ul className='nav-sidebar-subheaders'>{subheaderLinks}</ul></span>;
    });
    return (<ul class='nav-sidebar-headers'>{headersLinks}</ul>);
  }

  const navigationLinks = (docData) => {
    var summaryLink = <a href='#' className='link-is-disabled'>✂️ Краткая версия</a>;

    if (docData.summaryExists) summaryLink = <Link href={`summary/${docData.id}`}><a>✂️ Краткая версия</a></Link>

    return (
      <div>
        <h5>Ссылки</h5>
        {summaryLink}<br />
        <a href="#" class='link-is-disabled'>✅ Скачать документ</a> <br />
        <Link href='/docs'><a>📄 К документам</a></Link> <br />
        <Link href='/'><a>🏠 На главную</a></Link>
      </div>
    )
  }

  const navigationElements = (docData) => {
    return (
      <Card>
        <CardBody>
          {navigationLinks(docData)}
          <br />
          <h5>Навигация</h5>
          {structureList(docData.structure)}
        </CardBody>
      </Card>
    )
  }

  const classes = useStyles();
  return (
    <div>
      <Header
        links={<HeaderLinks dropdownHoverColor="dark" />}
        color="transparent"
        fixed
        changeColorOnScroll={{
          height: 300,
          color: "white"
        }}
      />
      <Parallax image={patternBG} small filter="light">
        <div className={classes.container} id="start">
          <GridContainer justify="center">
            <GridItem md={8} className={classes.textCenter}>
              <h1 className={classes.title}> {docData.title} </h1>
              <h4 className={classes.subtitle}> Редакция от <Date dateString={docData.date} /> </h4>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classes.main}>
        <div className={classes.container}>
          <div className={classes.section}>
            <GridContainer justify="center">
              <Hidden mdUp>
                <GridItem sm={12}>
                  {navigationElements(docData)}
                </GridItem>
              </Hidden>

              <GridItem xs={12} sm={12} md={8} id="document-body">
                  <div dangerouslySetInnerHTML={{ __html: docData.contentHtml }} />
              </GridItem>

              <Hidden smDown>
                <GridItem md={4}>
                  {navigationElements(docData)}
                </GridItem>
              </Hidden>
            </GridContainer>
          </div>
        </div>
      </div>
      <a
        href="#start"
        onClick={e => {
          e.preventDefault();
          smoothScroll("start");
        }}
      >
        <div className={classes.backToTopButtonWrapper} id="button-to-top">
          <span className={classes.backToTopButtonStyle}><BsChevronUp /></span>
        </div>
      </a>
      <Footer
          theme="white"
          content={
            <div style={{ fontSize: '0.8em' }}>
              копирайт бгг &copy; {" "}
              <a
                href="http://epinetov.com"
                target="_blank"
              >
                Vsevolod Epinetov
              </a>{" "}
              <a href={require(`assets/img/rights-reserved.webp`)} target='_blank'>Все права защищены</a>
            </div>
          }
        >
          <br />
        </Footer>
    </div>
  );
}

export async function getStaticPaths() {
  const paths = getAllDocsIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const docData = await getDocData(params.id)
  return {
    props: {
      docData
    }
  }
}