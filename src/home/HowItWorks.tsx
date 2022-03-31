import { HOWDESCRIPTION, HOWTITLE, Steps } from '../common/DataObjects';
import { StepInfo } from '../common/Interfaces';
import {
  Description,
  HowItWorksContainer,
  StepBox,
  Title,
} from './Home.styled';
import Step from './Step';

const HowItWorks = () => {
  return (
    <HowItWorksContainer>
      <Title>{HOWTITLE}</Title>
      <Description>{HOWDESCRIPTION}</Description>
      <StepBox>
        {Steps.map((step: StepInfo) => (
          <Step key={step.id} info={step} />
        ))}
      </StepBox>
    </HowItWorksContainer>
  );
};

export default HowItWorks;
