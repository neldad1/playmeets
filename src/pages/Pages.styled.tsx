import styled from 'styled-components';

const PagesContainer = styled.div`
  margin: 2em;
  gap: 1em;
  display: flex;
  flex-direction: column;
`;

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

interface LandingProps {
  url: string;
}
const LandingContainer = styled.div`
  max-width: 100vw;
  height: 85vh;
  background-image: url(${(props: LandingProps) => props.url});
  background-repeat: no-repeat;
  background-size: cover;
`;

const FlexRight = styled.div`
  width: 50%;
  bottom: 20%;
  left: 60%;
  position: absolute;
  display: flex;
`;

export { PagesContainer, FlexColumn, Logo, LandingContainer, FlexRight };
