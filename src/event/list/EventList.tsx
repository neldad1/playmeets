import { AppEvent } from '../../common/Interfaces';
import { FlexRow } from '../../components/Components.styled';
import EventCard from '../card/EventCard';

interface EventListProps {
  list: AppEvent[];
}

const EventList = ({ list }: EventListProps) => {
  console.log(list);
  return (
    <FlexRow>
      {list.map((appEvt) => (
        <EventCard key={appEvt.id} appEvt={appEvt} />
      ))}
    </FlexRow>
  );
};

export default EventList;
