import styled from 'styled-components';

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  margin: 5% auto;
  justify-content: space-evenly;
  border: 1px solid;
  gap: 1em;
  padding: 1em;
  @media only screen and (max-width: 768px) {
    width: 100%;
    margin: 0;
    padding: 1em;
  }
`;

const Logo = styled.img`
  width: 5em;
  height: 5em;
`;

export { FlexColumn, Logo };
