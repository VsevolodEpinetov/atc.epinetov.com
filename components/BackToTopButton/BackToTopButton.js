/* eslint-disable */
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import {FaArrowCircleUp} from 'react-icons/fa';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import styles from "assets/jss/nextjs-material-kit-pro/components/backToTopButtonStyle.js";

const useStyles = makeStyles(styles);

export default function BackToTopButton (props) {
    //const [showScroll, setShowScroll] = React.useState(false)

    /*React.useEffect(() => {
      const checkScrollTop = () => {
        if (!showScroll && window.pageYOffset > 400){
          setShowScroll(true)
        } else if (showScroll && window.pageYOffset <= 400){
          setShowScroll(false)
        }
      }

      const scrollTop = () =>{
        window.scrollTo({top: 0, behavior: 'smooth'});
      }

      window.addEventListener('scroll', checkScrollTop)
    })*/
  
    return (
          <FaArrowCircleUp style={{height: 40, display: showScroll ? 'flex' : 'none'}}/>
    );
}
