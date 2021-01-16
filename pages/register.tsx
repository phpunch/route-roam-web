import React from 'react';

import styled from '@emotion/styled';
import TextField from '@material-ui/core/TextField';
import { Button, Typography } from '@material-ui/core';
import { useState } from 'react';
import AuthService from '../src/services/auth.service';

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

const SuccessMessageBox = styled.div`
  width: 100%;
  background-color: #95ff95;
  color: green;
  padding: 10px;
  margin-top: 20px;
  border-radius: 5px;
  text-align: center;
`
const FailedMessageBox = styled.div`
  width: 100%;
  background-color: #ffe2e2;
  color: red;
  padding: 10px;
  margin-top: 20px;
  border-radius: 5px;
  text-align: center;
`

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const registerHandler = async () => {
    try {
      const res = await AuthService.register(email, password);
      console.log(res);
      setMessage(res.data.message)
      setSuccess(true)
    } catch (e) {
      console.log(e);
      setMessage(e.response.data.message)
      setSuccess(false)
    }
  };

  let messageBox = null
  if (message) {
    if (success) {
      messageBox = <SuccessMessageBox>{message}</SuccessMessageBox>
    } else {
      messageBox = <FailedMessageBox>{message}</FailedMessageBox>
    }
  }

  return (
    <p>
      <Form noValidate autoComplete="off">
        <Text variant="h6" align="center">
          Register
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
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <LoginButton
          onClick={registerHandler}
          color="primary"
          variant="contained"
          fullWidth
        >
          Login
        </LoginButton>
        {messageBox}
      </Form>
    </p>
  );
}
