/*eslint-disable*/
import React from "react";
import Link from "next/link";
import Image from 'next/image'
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
import BackToTopButton from "components/BackToTopButton/BackToTopButton.js"
import smoothScroll from "components/SmoothScroll/SmoothScroll.js"
import PostImage from "components/PostImage/PostImage.js"
import Snackbar from '@material-ui/core/Snackbar';
import { MDXRemote } from 'next-mdx-remote'
import { Alert, AlertTitle } from '@material-ui/lab';
// styles
import docPageStyle from "assets/jss/nextjs-material-kit-pro/pages/docPageStyle.js";
// libraries
import { getAllPostsIds, getPostData } from 'lib/posts'
import Date from 'lib/date'
// images

const components = { PostImage, Alert, AlertTitle, Snackbar }

const useStyles = makeStyles(docPageStyle);

export default function DocPage({ postData }) {
  React.useEffect(() => {
  });

  const structureList = (structure) => {
    const headersLinks = Object.keys(structure).map(id => {
      var subheaderLinks;
      if (structure[id].subheaders) subheaderLinks = structure[id].subheaders.map((subheader, subheaderID) => <li><a href={`#${id}-${subheaderID}`} onClick={e => { e.preventDefault(); smoothScroll(`${id}-${subheaderID}`); }}>{subheader}</a></li>)
      return <span><li><a href={`#${id}`} onClick={e => { e.preventDefault(); smoothScroll(`${id}`); }}>{structure[id].name}</a></li><ul className='nav-sidebar-subheaders'>{subheaderLinks}</ul></span>;
    });
    return (<ul class='nav-sidebar-headers'>{headersLinks}</ul>);
  }

  const navigationLinks = (postData) => {
    return (
      <div>
        <h5>Ссылки</h5>
        <Link href='/posts'><a>⭐️ К полезностям</a></Link> <br />
        <Link href='/'><a>🏠 На главную</a></Link>
      </div>
    )
  }

  const navigationElements = (postData) => {
    return (
      <Card>
        <CardBody>
          {navigationLinks(postData)}
          <br />
          <h5>Навигация</h5>
          {structureList(postData.structure)}
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
      <Parallax image='https://storage.googleapis.com/atc.epinetov.com/public/img/pattern-bg.webp' small filter="light">
        <div className={classes.container} id="start">
          <GridContainer justify="center">
            <GridItem md={8} className={classes.textCenter}>
              <h1 className={classes.title}> {postData.data.title} </h1>
              <h4 className={classes.subtitle}> Редакция от <Date dateString={postData.data.date}/> </h4>
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
                  {navigationElements(postData)}
                </GridItem>
              </Hidden>

              <GridItem xs={12} sm={12} md={8} id="document-body">
                  <>
                    <MDXRemote {...postData.contentWithLinksInHeaders} components={components} />
                  </>
              </GridItem>

              <Hidden smDown>
                <GridItem md={4}>
                  {navigationElements(postData)}
                </GridItem>
              </Hidden>
            </GridContainer>
          </div>
        </div>
      </div>
      <BackToTopButton/>
      <Footer/>
    </div>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostsIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}