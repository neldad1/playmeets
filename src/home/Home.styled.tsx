import styled from 'styled-components';

const HowItWorksContainer = styled.div`
  // width: 90%;
  height: 90%;
  text-align: center;
  padding: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2em;
  overflow: hidden;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 2.5em;
`;

const Description = styled.h4`
  margin: 0;
  font-size: 1.25em;
`;

const StepImage = styled.img`
  width: 200px;
  height: 200px;
`;

const StepTitle = styled.p`
  margin: 0;
  line-height: 3em;
  font-weight: bold;
  font-size: 1.5em;
  color: midnightblue;
`;

const StepDescription = styled.p`
  margin: 0;
  width: 250px;
`;

const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25em;
  justify-content: center;
  align-items: center;
`;

const StepBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
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
  display: flex;
  flex-direction: column;
`;

const LandingInfo = styled.div`
  margin: 20% 5% 0 50%;
  display: flex;
  gap: 2em;
  flex-direction: column;
  justify-content: flex-end;
`;

const LandingTitle = styled.h1`
  margin: 0;
  font-size: 4em;
  color: white;
`;

export {
  Title,
  Description,
  HowItWorksContainer,
  StepImage,
  StepTitle,
  StepDescription,
  StepContainer,
  StepBox,
  LandingInfo,
  LandingContainer,
  LandingTitle,
};
