import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import '../styles/globals.css';
import styled from '@emotion/styled';
import TopBar from '../src/components/TopBar';
import BottomBar from '../src/components/BottomBar';
import { StylesProvider } from '@material-ui/core/styles';
import { UserProvider } from '../src/contexts/UserContext';

const Window = styled.div`
  width: 50vh;
  font-family: -apple-system, system-ui;
  position: relative;
  height: 84vh;
  max-height: 84vh;
  overflow-y: auto;
  box-shadow: 0px 1px 10px -2px rgba(0, 0, 0, 0.2);
  margin: 0 auto;
  &::-webkit-scrollbar {
    width: 0.4em;
  }
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 1px rgba(0, 0, 0, 0);
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.1);
  }
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
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
              <TopBar />
              <Window>
                <Component {...pageProps} />
              </Window>
              <BottomBar />
            </div>
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
