import styled from '@emotion/styled';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from '@material-ui/core';
import { useRouter } from 'next/router';

import MenuIcon from '@material-ui/icons/Menu';

const Bar = styled(AppBar)`
  max-width: 410px;
  /* width: 100%; */
  box-sizing: border-box;
  z-index: 2;
  box-shadow: 0px 1px 10px -2px rgba(0, 0, 0, 0.1);
  left: 50%;
  right: 50%;
  transform: translate(-50%, 0);
`;

const TopBar: React.FunctionComponent = () => {
  const router = useRouter();

  const loginButtonHandler = () => {
    router.push('/login');
  };
  return (
    <div>
      <Bar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            // className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          {/* <Typography variant="h6" className={classes.title}>
          News
        </Typography> */}
          <Button
            style={{ flexGrow: 1 }}
            color="inherit"
            onClick={() => router.push('/')}
          >
            Home
          </Button>
          <Button color="inherit" onClick={() => router.push('/login')}>
            Login
          </Button>
        </Toolbar>
      </Bar>
    </div>
  );
};
export default TopBar;
