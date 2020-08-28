import styled from 'styled-components';

export const Wrapper = styled.div`
  grid-area: header;

  .header__logo {
    max-width: 200px;
    max-height: 100%;
  }

  .header__actions {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
    grid-gap: 12px;
  }
`;
