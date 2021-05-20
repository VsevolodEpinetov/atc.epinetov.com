/* eslint-disable */
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// react components for routing our app without refresh
import Link from "next/link";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Hidden from "@material-ui/core/Hidden";

// @material-ui/icons
import AirplanemodeActive from "@material-ui/icons/AirplanemodeActive";
import DescriptionOutlined from "@material-ui/icons/DescriptionOutlined";
import AccountBox from "@material-ui/icons/AccountBox";
import Home from "@material-ui/icons/Home";
import Star from "@material-ui/icons/Star";
import EmojiEvents from "@material-ui/icons/EmojiEvents";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";

// user
import { useUser } from '@auth0/nextjs-auth0';

import styles from "assets/jss/nextjs-material-kit-pro/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const easeInOutQuad = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  const smoothScroll = (e, target) => {
    if (window.location.pathname === "/sections") {
      var isMobile = navigator.userAgent.match(
        /(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i
      );
      if (isMobile) {
        // if we are on mobile device the scroll into view will be managed by the browser
      } else {
        e.preventDefault();
        var targetScroll = document.getElementById(target);
        scrollGo(document.documentElement, targetScroll.offsetTop, 1250);
      }
    }
  };

  const scrollGo = (element, to, duration) => {
    var start = element.scrollTop,
      change = to - start,
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
  var onClickSections = {};

  const { dropdownHoverColor } = props;
  const classes = useStyles();

  const { user, error, isLoading } = useUser();

  return (
    <List className={classes.list + " " + classes.mlAuto}>
      <ListItem className={classes.listItem}>
        <Button
          href="/"
          className={classes.navLink}
          color="transparent"
        >
          <Home /> Главная
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="/aircraft"
          className={classes.navLink}
          color="transparent"
        >
          <AirplanemodeActive /> ВС
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          navDropdown
          hoverColor={dropdownHoverColor}
          buttonText="Документы"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={DescriptionOutlined}
          dropdownList={[
            <Link href="/docs">
              <a className={classes.dropdownLink}>
                ФАП
              </a>
            </Link>,
            <Link href="/aip">
              <a className={classes.dropdownLink}>
                AIP
              </a>
            </Link>,
            <Link href="/trd">
              <a className={classes.dropdownLink}>
                ТРД
              </a>
            </Link>
          ]}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="/posts"
          className={classes.navLink}
          color="transparent"
        >
          <Star /> Полезное
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          navDropdown
          hoverColor={dropdownHoverColor}
          buttonText="Тесты"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={EmojiEvents}
          dropdownList={[
            <Link href="/tests/cities" prefetch>
              <a className={classes.dropdownLink}>
                Аэропорты РФ
              </a>
            </Link>
          ]}
        />
      </ListItem>
      {
        user && (
          <ListItem className={classes.listItem}>
            <CustomDropdown
              noLiPadding
              navDropdown
              hoverColor={dropdownHoverColor}
              buttonText={user.name}
              buttonProps={{
                className: classes.navLink,
                color: "transparent"
              }}
              buttonIcon={AccountBox}
              dropdownList={[
                <Link href="/api/auth/me">
                  <a className={classes.dropdownLink}>
                    Профиль
                  </a>
                </Link>,
                <Link href="/api/auth/logout">
                  <a className={classes.dropdownLink}>
                    Выйти
                  </a>
                </Link>
              ]}
            />
          </ListItem>
        )
      }
      {!isLoading && !error && !user && (
        <ListItem className={classes.listItem}>
          <Button
            href="/api/auth/login"
            className={classes.navLink}
            color="transparent"
          >
            <AccountBox /> Войти
          </Button>
        </ListItem>
      )}
    </List>
  );
}

HeaderLinks.defaultProps = {
  hoverColor: "primary"
};

HeaderLinks.propTypes = {
  dropdownHoverColor: PropTypes.oneOf([
    "dark",
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "rose"
  ])
};
