import React from 'react';

import styled from '@emotion/styled';
import TextField from '@material-ui/core/TextField';
import { Button, Typography } from '@material-ui/core';
import axios from 'axios';
import { useState } from 'react';

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
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const loginHandler = async () => {
    const formData = new FormData();
    formData.append('email', email)
    formData.append('password', password)
    try {
      const res = await axios.post(process.env.API_BASE_URL + '/register', formData);
      console.log(res)
    } catch (e) {
      console.log(e);
    }
  };

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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextInput
          id="outlined-basic"
          label="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <LoginButton
          onClick={loginHandler}
          color="primary"
          variant="contained"
          fullWidth
        >
          Login
        </LoginButton>
      </Form>
    </>
  );
}
