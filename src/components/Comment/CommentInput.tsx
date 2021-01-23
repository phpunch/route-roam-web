import styled from '@emotion/styled';
import { Avatar, Button, TextareaAutosize, TextField } from '@material-ui/core';
import React from 'react';




const Container = styled.div`
  width: 100%;
  margin: 15px 0;

  display: flex;
  justify-content: flex-end;
`;

const TextInput = styled(TextField)`
`;

const StyledButton = styled(Button)`
  height: 55px;
`;


const CommentInput: React.FunctionComponent = () => {

  return (
    <Container>
      <TextInput
        placeholder="Type your comment here"
        multiline
        fullWidth
        variant="outlined"

      />
      <StyledButton size="small">Send</StyledButton>


    </Container>
  );
};
export default CommentInput;
