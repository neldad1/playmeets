import styled from 'styled-components';

const PagesContainer = styled.div<{ offset?: string }>`
  display: flex;
  flex-direction: column;
  padding: ${({ offset }) => offset && `${offset}`};
  gap: ${({ offset }) => offset && `${offset}`};
`;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  margin: 5% auto;
  justify-content: space-evenly;
  /* border: 1px solid; */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.16), 0 2px 4px rgba(0, 0, 0, 0.23);
  gap: 1em;
  padding: 1em;
  border-radius: 0.25rem;
  @media only screen and (max-width: 768px) {
    width: 100%;
    margin: 0;
    height: 80vh;
    box-shadow: none;
  }
`;

const Logo = styled.img`
  width: 4em;
  height: 4em;
`;

const FlexRight = styled.div`
  width: 50%;
  bottom: 20%;
  left: 60%;
  position: absolute;
  display: flex;
`;

export { PagesContainer, FlexColumn, Logo, FlexRight };
