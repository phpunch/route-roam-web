import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import '../styles/globals.css';
import styled from '@emotion/styled';
import TopBar from '../src/components/TopBar';
import { StylesProvider } from '@material-ui/core/styles';
import { UserProvider } from '../src/components/UserContext';

const Window = styled.div`
  width: 404px;
  font-family: -apple-system, system-ui;
  position: relative;
  box-shadow: 0px 1px 10px -2px rgba(0, 0, 0, 0.2);
  margin: 0 auto;
`;
export default function MyApp(props) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Route Roam</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <StylesProvider injectFirst>
          <UserProvider>
            <Window>
              <TopBar />
              <Component {...pageProps} />
            </Window>
          </UserProvider>
        </StylesProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
