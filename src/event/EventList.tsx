import { AppEvent } from '../common/Interfaces';
import { FlexRowCenter } from '../components/Components.styled';
import EventCard from './card/EventCard';

interface EventListProps {
  list: AppEvent[];
}

const EventList = ({ list }: EventListProps) => {
  return (
    <FlexRowCenter>
      {list.map((appEvt) => (
        <EventCard key={appEvt.id} appEvt={appEvt} />
      ))}
    </FlexRowCenter>
  );
};

export default EventList;
