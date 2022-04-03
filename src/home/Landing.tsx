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

const Landing = () => {
  const navigate = useNavigate();
  const currentUser = useContext(CurrentUserContext);

  const onButtonClick = () => {
    if (!currentUser) navigate('/signup');
    else navigate('/events');
  };

  let buttonCaption = 'Sign up for more details';
  if (currentUser) {
    console.log(currentUser);
    if (currentUser?.data?.state) buttonCaption = 'View the events';
  }

  return (
    <>
      <LandingContainer url={BackgroundImg}>
        <LandingImageContainer>
          <LandingImage className="slide-left" src={LandingImg} />
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
