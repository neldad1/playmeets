import { EnvironmentFilled } from '@ant-design/icons';
import { FlexRowLeft } from '../components/Components.styled';
import { LabelData } from './User.styled';

interface LocationProps {
  city: string;
  state: string;
}
const Location = ({ city, state }: LocationProps) => {
  return (
    <FlexRowLeft>
      <EnvironmentFilled />
      <LabelData>
        {city}, {state}
      </LabelData>
    </FlexRowLeft>
  );
};

export default Location;
