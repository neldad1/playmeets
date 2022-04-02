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
  margin-top: 2em;
  margin-bottom: 2em;
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
  flex-direction: row;
  justify-content: space-evenly;
  align-items: flex-start;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const LandingContainer = styled.div<{ url: string }>`
  max-width: 100vw;
  height: 85vh;
  background-image: url(${({ url }) => url});
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 2em;

  @media only screen and (max-width: 768px) {
    flex-direction: column-reverse;
    gap: 1em;
  }
`;

const LandingInfo = styled.div`
  flex: 1;
  text-align: left;

  .ant-btn {
    height: 50px;
  }

  @media only screen and (max-width: 768px) {
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  /* margin: 20% 5% 0 50%; */

  /* display: flex; */
  /* gap: 2em; */
  /* flex-direction: column; */
  /* justify-content: flex-end; */
`;

const LandingTitle = styled.h1`
  margin: 0;
  line-height: 1.15em;
  font-size: 4em;
  color: white;

  @media only screen and (max-width: 768px) {
    font-size: 3em;
  }
`;

const LandingAuthor = styled.span`
  color: white;
  margin-top: 0.5em;
  display: block;
`;

const ButtonContainer = styled.div`
  margin-top: 2em;
  text-align: left;
`;

const LandingImageContainer = styled.div`
  flex: 1;
  text-align: center;
`;

const LandingImage = styled.img`
  width: 30em;
  @media only screen and (max-width: 768px) {
    width: 25em;
  }
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
  LandingImage,
  LandingImageContainer,
  ButtonContainer,
  LandingAuthor,
};
