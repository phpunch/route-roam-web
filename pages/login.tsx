import React from 'react';

import styled from '@emotion/styled';
import TextField from '@material-ui/core/TextField';
import { Button, Typography } from '@material-ui/core';

const Form = styled.form`
  margin-top: 75px;
  padding: 25px;
  & > * {
    margin: theme.spacing(1);
    width: '25ch';
  }
`;

const Text = styled(Typography)`
  margin-bottom: 25px;
`;

const TextInput = styled(TextField)`
  margin-top: 10px;
`;

const LoginButton = styled(Button)`
  margin-top: 35px;
`;

export default function Login() {
  return (
    <>
      <Form noValidate autoComplete="off">
        <Text variant="h6" align="center">
          Login
        </Text>
        <TextInput
          id="filled-basic"
          label="email"
          variant="outlined"
          fullWidth
        />
        <TextInput
          id="outlined-basic"
          label="password"
          variant="outlined"
          fullWidth
        />
        <LoginButton color="primary" variant="contained" fullWidth>
          Login
        </LoginButton>
      </Form>
    </>
  );
}
