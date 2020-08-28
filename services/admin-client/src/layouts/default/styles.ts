import styled from 'styled-components';

interface Props {
  type: 'light' | 'dark';
}

export const Wrapper = styled.div<Props>`
  position: relative;
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: 64px 1fr;
  grid-template-areas:
    'navigation header'
    'navigation main';
`;

export const Main = styled.div`
  overflow: auto;
`;
