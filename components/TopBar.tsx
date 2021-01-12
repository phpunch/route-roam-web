import styled from '@emotion/styled';

const Bar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 25px;
  position: fixed;
  max-width: 410px;
  width: 100%;
  box-sizing: border-box;
  background-color: white;
  z-index: 2;
  box-shadow: 0px 1px 10px -2px rgba(0, 0, 0, 0.1);
`;

const TopBar: React.FunctionComponent = () => {
  return <Bar>RouteRoam
    
  </Bar>;
};
export default TopBar;
