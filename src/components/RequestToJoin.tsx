import { UserAddOutlined } from '@ant-design/icons';
import Tooltip from 'antd/lib/tooltip';
import { SyntheticEvent, useContext } from 'react';
import { NotificationTypes } from '../common/DataObjects';
import { addDocument, setDocument } from '../common/Firebase';
import { AppUser } from '../common/Interfaces';
import { CurrentUserContext } from '../context/CurrentUser';

interface RequestToJoinProps {
  to: AppUser;
  from: string;
  eid: string;
  eventTitle: string;
}
const RequestToJoin = ({ to, from, eid, eventTitle }: RequestToJoinProps) => {
  const currentUser = useContext(CurrentUserContext);

  const onButtonClick = (event: SyntheticEvent) => {
    event.preventDefault();
    const newNotification = {
      type: NotificationTypes[0],
      to: to.id,
      from,
      event_id: eid,
      message: `${currentUser.data.displayName} has requested to join ${eventTitle}`,
    };
    addDocument('notifications', newNotification).then((notifDoc) => {
      if (notifDoc) {
        let notifs = to.data.notifications;
        if (!notifs) {
          notifs = [notifDoc.id];
        } else {
          notifs.push(notifDoc.id);
        }
        to.data.notifications = notifs;
        setDocument('users', to.id, to.data);
      }
    });
  };

  return (
    <Tooltip title="Request to Join" color="blue">
      <UserAddOutlined key="join" onClick={onButtonClick} />
    </Tooltip>
  );
};

export default RequestToJoin;
