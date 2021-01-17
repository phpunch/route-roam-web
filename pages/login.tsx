import React, { useContext } from 'react';
import styled from '@emotion/styled';
import TextField from '@material-ui/core/TextField';
import { Button, Typography } from '@material-ui/core';
import { useState } from 'react';
import AuthService from '../src/services/auth.service';
import { useRouter } from 'next/router';
import { UserContext } from '../src/contexts/UserContext';

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

const SubmitButton = styled(Button)`
  margin: 35px 0;
`;

const SuccessMessageBox = styled.div`
  width: 100%;
  background-color: #95ff95;
  color: green;
  padding: 10px;
  margin: 20px 0;
  border-radius: 5px;
  text-align: center;
`;
const FailedMessageBox = styled.div`
  width: 100%;
  background-color: #ffe2e2;
  color: red;
  padding: 10px;
  margin: 20px 0;
  border-radius: 5px;
  text-align: center;
`;

export default function Login() {
  const router = useRouter();
  const {setUser} = useContext(UserContext);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const loginHandler = async () => {
    try {
      const data = await AuthService.login(email, password);
      setMessage(data.message);
      setSuccess(true);
      setUser(data.access_token)
      router.push('/');
    } catch (e) {
      setMessage(e.response.data.message);
      setSuccess(false);
    }
  };

  let messageBox = null;
  if (message) {
    if (success) {
      messageBox = <SuccessMessageBox>{message}</SuccessMessageBox>;
    } else {
      messageBox = <FailedMessageBox>{message}</FailedMessageBox>;
    }
  }

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
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <SubmitButton
          onClick={loginHandler}
          color="primary"
          variant="contained"
          fullWidth
        >
          Login
        </SubmitButton>
        {messageBox}
        <Typography align="center">
          Don't have an account yet?
        </Typography>
        <SubmitButton
          onClick={() => router.push('/register')}
          color="secondary"
          variant="contained"
          fullWidth
        >
          Register
        </SubmitButton>
      </Form>
    </>
  );
}
