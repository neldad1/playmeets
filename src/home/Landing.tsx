import HowItWorks from './HowItWorks';
import landing from '../assets/landing.svg';
import { Button } from 'antd';
import { LandingContainer, LandingInfo, LandingTitle } from './Home.styled';

const Landing = () => {
  return (
    <>
      <LandingContainer url={landing}>
        <LandingInfo>
          <LandingTitle>Your kid will no longer play alone</LandingTitle>
          <Button type="primary">Sign up for more details</Button>
        </LandingInfo>
      </LandingContainer>
      <HowItWorks />
    </>
  );
};

export default Landing;
