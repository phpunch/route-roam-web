import Head from 'next/head';
import React from 'react';
import HomePage from '../components/HomePage';

import styled from '@emotion/styled';
import TopBar from '../components/TopBar';
import { CssBaseline } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
const theme = createMuiTheme();

const Window = styled.div`
  width: 410px;
  /* height: 760px; */
  font-family: -apple-system, system-ui;
  position: relative;
  box-shadow: 0px 1px 10px -2px rgba(0, 0, 0, 0.2);
  margin: 0 auto;
`;

export default function Home() {
  return (
    <MuiThemeProvider theme={theme}>
      {/* <React.Fragment> */}
        {/* <Head>
        <title>RouteRoam</title>
        <link rel="icon" href="/favicon.ico" />
      </Head> */}

        <CssBaseline />
        <Window>
          <TopBar />
          <HomePage />
        </Window>
      {/* </React.Fragment> */}
    </MuiThemeProvider>
  );
}
