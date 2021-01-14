import styled from '@emotion/styled';
import {
  AppBar,
  Toolbar,
  Menu,
  IconButton,
  Typography,
  Button,
} from '@material-ui/core';
import { useRouter } from 'next/router';

const Bar = styled(AppBar)`
  /* max-width: 410px; */
  /* width: 100%; */
  box-sizing: border-box;
  /* background-color: white; */
  z-index: 2;
  box-shadow: 0px 1px 10px -2px rgba(0, 0, 0, 0.1);
`;

const TopBar: React.FunctionComponent = () => {
  const router = useRouter();

  const loginButtonHandler = () => {
    router.push('/login');
  };
  return (
    <Bar position="fixed">
      <Toolbar>
        {/* <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <Menu />
        </IconButton> */}
        {/* <Typography variant="h6" className={classes.title}>
          News
        </Typography> */}
        <Button color="inherit" onClick={loginButtonHandler}>
          Login
        </Button>
      </Toolbar>
    </Bar>
  );
};
export default TopBar;
