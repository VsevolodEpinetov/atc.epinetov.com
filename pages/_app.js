/*!

=========================================================
* Методические, учебные и просто полезные материалы для диспетчеров УВД
=========================================================

* Дизайн: NextJS Material Kit PRO v1.1.0, основано на Material Kit PRO - v2.0.2 (Bootstrap 4.0.0 Final Edition) и Material Kit PRO React v1.8.0
* Разработка темы Creative Tim (https://www.creative-tim.com)

* Доработка темы/разработка бекенда Vsevolod Epinetov (https://epinetov.com)
=========================================================

*/
import React from "react";
import ReactDOM from "react-dom";
import App from "next/app";
import Head from "next/head";
import Router from "next/router";
import { UserProvider } from '@auth0/nextjs-auth0';

import PageChange from "components/PageChange/PageChange.js";

import "assets/scss/nextjs-material-kit-pro.scss?v=1.1.0";

import "assets/css/react-demo.css";

import "assets/css/custom.css";

import "animate.css/animate.min.css";

Router.events.on("routeChangeStart", url => {
  console.log(`Загрузка: ${url}`);
  document.body.classList.add("body-page-transition");
  ReactDOM.render(
    <PageChange path={url} />,
    document.getElementById("page-transition")
  );
});
Router.events.on("routeChangeComplete", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  document.body.classList.remove("body-page-transition");
});
Router.events.on("routeChangeError", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  document.body.classList.remove("body-page-transition");
});

export default class MyApp extends App {
  componentDidMount() {
    let comment = document.createComment(`
=========================================================
* Методические, учебные и просто полезные материалы для диспетчеров УВД
=========================================================

* Дизайн: NextJS Material Kit PRO v1.1.0, основано на Material Kit PRO - v2.0.2 (Bootstrap 4.0.0 Final Edition) и Material Kit PRO React v1.8.0
* Разработка темы Creative Tim (https://www.creative-tim.com)

* Доработка темы/разработка бекенда Vsevolod Epinetov (https://epinetov.com)
=========================================================

`);
    document.insertBefore(comment, document.documentElement);
  }

  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }
  render() {
    const { Component, pageProps } = this.props;

    return (
      <UserProvider>
        <React.Fragment>
          <Head>
            <title>Информация по ОВД | ATC</title>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-SPEBEGWV0S" />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'G-SPEBEGWV0S');
                  
                  `
              }}
            />
          </Head>
          <Component {...pageProps} />
        </React.Fragment>
      </UserProvider>
    );
  }
}
