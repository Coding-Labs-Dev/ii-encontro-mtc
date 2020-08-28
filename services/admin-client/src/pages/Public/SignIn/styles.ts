import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .MuiContainer-root {
    text-align: center;
  }

  & > div:first-child {
    width: 100%;
    flex: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  img {
    max-height: 125px;
  }
`;
