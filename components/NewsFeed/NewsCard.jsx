import React, { useState } from 'react';

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "components/CustomButtons/Button.js";


import { Telegram, Visibility } from "@mui/icons-material";

import Slide from "@material-ui/core/Slide";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

import { makeStyles } from "@material-ui/core/styles";
import newsFeedStyles from "assets/jss/custom-components/newsFeed.js";
const useStyles = makeStyles(newsFeedStyles);

const NewsCard = ({ post, postID }) => {
  const classes = useStyles();
  const [modal, setModal] = useState(false);

  return (
    <div>
      <Card color="info">
        <CardBody color onClick={() => setModal(true)} style={{ cursor: 'pointer' }}>
          <p className={classes.feedTitleWhite}>
            {post.title}
          </p>
        </CardBody>
        <CardFooter
          style={{ justifyContent: 'space-between' }}
        >
          <div className={classes.authorWhite}>
            <a href={`https://t.me/${post.channel.slice(1)}`} target="_blank" >
              <span>{post.channel}</span>
            </a>
          </div>
          <div className={classes.textNewsCard}>
            {post.date}
          </div>
        </CardFooter>
      </Card>
      <Dialog
        scroll="paper"
        open={modal}
        TransitionComponent={Transition}
        maxWidth='md'
        onClose={() => setModal(false)}
        aria-labelledby={`news-${postID}-slide-title`}
        aria-describedby={`news-${postID}-slide-description`}
      >
        <DialogTitle id="scroll-dialog-title">
          {post.channel}, {post.date}
        </DialogTitle>
        <DialogContent
          id={`news-${postID}-modal-description`}
          className={classes.modalBody}
          dividers
        >
          <DialogContentText
            id={`scroll-dialog-${postID}-description`}
            component='span'
          >
            <GridContainer>
              <GridItem md={12} dangerouslySetInnerHTML={{ __html: post.body }}>
              </GridItem>
            </GridContainer>
          </DialogContentText>
        </DialogContent>
        <DialogActions
          className={
            classes.modalFooter + " " + classes.modalFooterCenter
          }
        >
          <Button color="twitter" href={`https://t.me/${post.channel.slice(1)}`} target="_blank">
            <Telegram /> Перейти к каналу
          </Button>
          <Button
            onClick={() => setModal(false)}
            color="danger"
          >
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NewsCard;