import styled from '@emotion/styled';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';

import AuthService from '../services/auth.service';
import AddIcon from '@material-ui/icons/Add';

// const Bar = styled(AppBar)`
//   max-width: 410px;
//   /* width: 100%; */
//   box-sizing: border-box;
//   z-index: 3;
//   box-shadow: 0px 1px 10px -2px rgba(0, 0, 0, 0.1);
//   left: 50%;
//   right: 50%;
//   transform: translate(-50%, 0);
// `;
const Bar = styled.div`
  max-width: 410px;
  /* width: 100%; */
  box-sizing: border-box;
  z-index: 3;
  box-shadow: 0px 1px 10px -2px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
`;

const BottomBar: React.FunctionComponent = () => {
  const router = useRouter();

  const { currentUser, removeUser } = useContext(UserContext);

  const logoutHandler = () => {
    AuthService.logout();
    removeUser();
  };

  return (
    <Bar color="primary">
      <Toolbar>
        <Button
          color="inherit"
          onClick={() => router.push('/')}
        >
          Home
          </Button>
        {currentUser ? (
          <>
            <Button
              color="inherit"
              onClick={() => router.push('/post/create')}
            >
              <AddIcon />
            </Button>
            <Button color="inherit" onClick={logoutHandler}>
              Logout
              </Button>
          </>
        ) : (
            <Button color="inherit" onClick={() => router.push('/login')}>
              Login
            </Button>
          )}
      </Toolbar>
    </Bar>
  );
};
export default BottomBar;
