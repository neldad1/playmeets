import { FlexRowLeft, Label } from '../components/Components.styled';
import { LabelData } from './User.styled';

interface AgeGroupProps {
  ageGroups: string[];
}
const AgeGroup = ({ ageGroups }: AgeGroupProps) => {
  return (
    <FlexRowLeft>
      <Label>Children age group:</Label>
      {ageGroups.map((group, index) => (
        <LabelData key={index}>{group}</LabelData>
      ))}
    </FlexRowLeft>
  );
};

export default AgeGroup;
