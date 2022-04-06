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
import { useContext } from 'react';
import { CurrentUserContext } from '../context/CurrentUser';
import { isObjectEmpty } from '../common/Helpers';

const Landing = () => {
  const navigate = useNavigate();
  const currentUser = useContext(CurrentUserContext);

  let buttonCaption = 'Sign up for more details';
  if (!isObjectEmpty(currentUser)) {
    if (currentUser?.data?.state) buttonCaption = 'View the events';
  }

  const onButtonClick = () => {
    if (buttonCaption.includes('Sign up')) navigate('/signup');
    else navigate('/events');
  };

  return (
    <>
      <LandingContainer url={BackgroundImg}>
        <LandingImageContainer>
          <LandingImage
            data-testid="landing-img"
            className="slide-left"
            src={LandingImg}
          />
        </LandingImageContainer>
        <LandingInfo className="fade-in">
          <LandingTitle>
            "It is a happy talent to know how to play"
          </LandingTitle>
          <LandingAuthor>- Ralph Waldo Emerson</LandingAuthor>
          <ButtonContainer>
            <Button type="primary" onClick={onButtonClick}>
              {buttonCaption}
            </Button>
          </ButtonContainer>
        </LandingInfo>
      </LandingContainer>
      <HowItWorks />
    </>
  );
};

export default Landing;
