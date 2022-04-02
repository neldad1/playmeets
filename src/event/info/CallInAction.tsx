import { AppUser } from '../../common/Interfaces';
import { FlexRowCenter } from '../../components/Components.styled';
import Favourite from '../../components/Favourite';
import EventStatus from '../../components/EventStatus';

interface CallInActionProps {
  host: AppUser;
  eid: string;
  eventTitle: string;
}
const CallInAction = ({ host, eid, eventTitle }: CallInActionProps) => {
  return (
    <FlexRowCenter>
      <Favourite eid={eid} isBigger={true} />
      <EventStatus
        host={host}
        eid={eid}
        eventTitle={eventTitle}
        isBigger={true}
      />
    </FlexRowCenter>
  );
};

export default CallInAction;
