import styled from '@emotion/styled';
import { Avatar } from '@material-ui/core';
import React from 'react';

const Profile = styled(Avatar)`
  margin-right: 1ch;
`

const Container = styled.div`
  width: 100%;
  margin: 10px 0;
  display: flex;
`;

const InnerContainer = styled.div`
  width: 100%;
  display: block;
  word-wrap: break-word;
`;

const BoldBox = styled.div`
  display: inline-block;
  font-weight: 700;
  /* margin-right: 1ch; */
`

const Box = styled.div`
  width: 100%;
  font-weight: 400;
`

interface CommentBoxProps {
  username: string;
  text: string;
}

const CommentBox: React.FunctionComponent<CommentBoxProps> = ({
  username, text
}) => {

  return (
    <Container>
      <Profile>{username}</Profile>
      <InnerContainer>
        <BoldBox>{username}</BoldBox>
        <Box>{text}</Box>
      </InnerContainer>

    </Container>
  );
};
export default CommentBox;
