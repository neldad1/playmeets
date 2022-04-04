import { AppUser } from '../../common/Interfaces';
import { FlexRowCenter } from '../../components/Components.styled';
import Favourite from '../../components/Favourite';
import EventStatus from '../../components/EventStatus';
import { useContext } from 'react';
import { CurrentUserContext } from '../../context/CurrentUser';
import { EditOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { useNavigate } from 'react-router-dom';

interface CallInActionProps {
  host: AppUser;
  eid: string;
  eventTitle: string;
}
const CallInAction = ({ host, eid, eventTitle }: CallInActionProps) => {
  const currentUser = useContext(CurrentUserContext);
  const navigate = useNavigate();

  return (
    <FlexRowCenter>
      <Favourite eid={eid} isBigger={true} />
      <EventStatus
        host={host}
        eid={eid}
        eventTitle={eventTitle}
        isBigger={true}
      />
      {host.id === currentUser.id && (
        <Tooltip title="Edit this event" color="blue" placement="bottom">
          <EditOutlined
            className="antd-icon-action"
            onClick={() => navigate(`/events/${eid}/edit`)}
          />
        </Tooltip>
      )}
    </FlexRowCenter>
  );
};

export default CallInAction;
