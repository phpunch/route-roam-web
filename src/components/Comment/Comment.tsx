import styled from '@emotion/styled';
import { Avatar } from '@material-ui/core';
import React from 'react';

const Profile = styled(Avatar)`
  margin-right: 1ch;
`

const Container = styled.div`
  width: 100%;
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

const Comment: React.FunctionComponent = () => {

  return (
    <Container>
      <Profile alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
      <InnerContainer>
        <BoldBox>Hello</BoldBox>
        <Box>สวัสดีวันจันทร์นะครับเพราะว่าวันนี้เราจะมีประชุมกันทุกสัปดาห์จนไปถึงวันพุธ</Box>
      </InnerContainer>

    </Container>
  );
};
export default Comment;
