import { UserEvent } from '../common/Interfaces';
import { FlexRowLeft, Label } from '../components/Components.styled';
import { LabelData } from './User.styled';

interface EventsCountProps {
  events: UserEvent[];
}
const EventsCount = ({ events }: EventsCountProps) => {
  return (
    <FlexRowLeft>
      <Label>Events: </Label>
      <LabelData>{events?.length}</LabelData>
    </FlexRowLeft>
  );
};

export default EventsCount;
