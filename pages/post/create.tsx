import React, { useContext } from 'react';

import styled from '@emotion/styled';
import TextField from '@material-ui/core/TextField';
import { Button, Typography } from '@material-ui/core';
import { useState } from 'react';
import PostService from '../../src/services/post.service';
import { useRouter } from 'next/router';
import DropZone from '../../src/components/DropZone';

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
`;
const FailedMessageBox = styled.div`
  width: 100%;
  background-color: #ffe2e2;
  color: red;
  padding: 10px;
  margin-top: 20px;
  border-radius: 5px;
  text-align: center;
`;

export default function CreatePostPage() {
  const router = useRouter();
  const [text, setText] = useState<string>('');
  const [validFiles, setValidFiles] = useState([]);

  const [message, setMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [canSubmit, setCanSubmit] = useState<boolean>(false);

  const submitHandler = async () => {
    try {
      const formData = new FormData()
      formData.append('text', text)
      for (let i = 0; i < validFiles.length; i++) {
        formData.append('datasetPath[]', validFiles[i])
      }
      const res = await PostService.createPost(formData);
      setMessage(res.data.message);
      setSuccess(true);

      // router.push('/');
    } catch (e) {
      console.log(e.response.data.message)
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
          Create a post
        </Text>
        <DropZone setCanSubmit={setCanSubmit} validFiles={validFiles} setValidFiles={setValidFiles} />
        <TextInput
          id="filled-basic"
          label="text"
          variant="outlined"
          fullWidth
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <SubmitButton
          onClick={submitHandler}
          color="primary"
          variant="contained"
          fullWidth
          disabled={!canSubmit}
        >
          Submit
        </SubmitButton>
        {messageBox}
      </Form>
    </>
  );
}
