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

interface CommentInputProps {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>;
  handleSendComment: (comment) => {}
}

const CommentInput: React.FunctionComponent<CommentInputProps> = ({
  value, setValue, handleSendComment
}) => {

  return (
    <Container>
      <TextInput
        placeholder="Type your comment here"
        multiline
        fullWidth
        variant="outlined"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <StyledButton
        onClick={handleSendComment}>Send</StyledButton>


    </Container>
  );
};
export default CommentInput;
