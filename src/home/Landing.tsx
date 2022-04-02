import HowItWorks from './HowItWorks';
import BackgroundImg from '../assets/landing.svg';
import LandingImg from '../assets/carKids.svg';
import { Button } from 'antd';
import {
  ButtonContainer,
  LandingAuthor,
  LandingContainer,
  LandingImage,
  LandingImageContainer,
  LandingInfo,
  LandingTitle,
} from './Home.styled';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();
  return (
    <>
      <LandingContainer url={BackgroundImg}>
        <LandingImageContainer>
          <LandingImage src={LandingImg} />
        </LandingImageContainer>
        <LandingInfo>
          <LandingTitle>
            "It is a happy talent to know how to play"
          </LandingTitle>
          <LandingAuthor>- Ralph Waldo Emerson</LandingAuthor>
          <ButtonContainer>
            <Button type="primary" onClick={() => navigate('/signup')}>
              Sign up for more details
            </Button>
          </ButtonContainer>
        </LandingInfo>
      </LandingContainer>
      <HowItWorks />
    </>
  );
};

export default Landing;
