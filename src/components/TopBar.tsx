import styled from '@emotion/styled';
import {
  AppBar,
  Toolbar,
  Button,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

import AuthService from '../services/auth.service';
import AddIcon from '@material-ui/icons/Add';

const Bar = styled(AppBar)`
  width: 400px;
  height: 8vh;
  margin: 0 auto;
  position: relative;
  box-sizing: border-box;
  z-index: 2;
  box-shadow: 0px 1px 10px -2px rgba(0, 0, 0, 0.1);
`;

const TopBar: React.FunctionComponent = () => {
  const router = useRouter();

  const { currentUser, removeUser } = useContext(UserContext);

  const logoutHandler = () => {
    AuthService.logout();
    removeUser();
    router.push('/login')
  };

  return (
    <Bar>
      <Toolbar>
        <Button
          style={{marginRight: 'auto'}}
          color="inherit"
          onClick={() => router.push('/')}
        >
          Route Roam
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
export default TopBar;
