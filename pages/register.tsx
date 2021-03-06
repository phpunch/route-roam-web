import React from 'react';

import styled from '@emotion/styled';
import TextField from '@material-ui/core/TextField';
import { Avatar, Button, Dialog, DialogActions, DialogTitle, Typography } from '@material-ui/core';
import { useState } from 'react';
import AuthService from '../src/services/auth.service';
import { useRouter } from 'next/router';

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

export default function Register() {
  const router = useRouter()
  const [open, setOpen] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const registerHandler = async () => {
    try {
      const res = await AuthService.register(username, password);
      console.log(res);
      setMessage(res.data.message)
      setSuccess(true)
      setOpen(true)
    } catch (e) {
      console.log(e);
      setMessage(e.response.data.message)
      setSuccess(false)
    }
  };

  const handleRedirect = () => {
    router.push('/login')
  }

  let messageBox = null
  if (message) {
    if (success) {
      messageBox = <SuccessMessageBox>{message}</SuccessMessageBox>
    } else {
      messageBox = <FailedMessageBox>{message}</FailedMessageBox>
    }
  }

  return (
    <>
      <Form noValidate autoComplete="off">
        <Text variant="h6" align="center">
          Register
        </Text>
        <TextInput
          label="username"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextInput
          label="password"
          variant="outlined"
          fullWidth
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <SubmitButton
          onClick={registerHandler}
          color="primary"
          variant="contained"
          fullWidth
        >
          Signup
        </SubmitButton>
        {messageBox}
      </Form>
      <Dialog
        open={open}
      >
        <DialogTitle>Register Successfully</DialogTitle>
        <DialogActions>
          <Button variant="outlined" color="primary" onClick={handleRedirect}>OK</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
