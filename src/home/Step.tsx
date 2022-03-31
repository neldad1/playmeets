import { StepInfo } from '../common/Interfaces';
import {
  StepContainer,
  StepDescription,
  StepImage,
  StepTitle,
} from './Home.styled';

interface StepProps {
  info: StepInfo;
}
const Step = ({ info }: StepProps) => {
  const url = require(`../${info.imgSrc}`);
  return (
    <StepContainer>
      <StepImage src={url} alt="" />
      <StepTitle>{info.title}</StepTitle>
      <StepDescription>{info.description}</StepDescription>
    </StepContainer>
  );
};

export default Step;
