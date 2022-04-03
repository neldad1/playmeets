import styled from 'styled-components';

const FooterCont = styled.div`
  width: 100%;
  height: 5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FooterLabel = styled.label`
  margin-right: 1em;
  margin-left: 2em;

  @media only screen and (max-width: 768px) {
    margin-right: 0;
    margin-left: 1em;
  }
`;

export { FooterCont, FooterLabel };
