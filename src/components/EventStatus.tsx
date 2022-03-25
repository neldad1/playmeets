import {
  CheckOutlined,
  PauseOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import Tooltip from 'antd/lib/tooltip';
import { SyntheticEvent, useContext } from 'react';
import { NotificationType, UserEventStatus } from '../common/Enums';
import { addDocument, setDocument } from '../common/Firebase';
import { AppUser } from '../common/Interfaces';
import { CurrentUserContext } from '../context/CurrentUser';

interface EventStatusProps {
  host: AppUser;
  eid: string;
  eventTitle: string;
}
const EventStatus = ({ host, eid, eventTitle }: EventStatusProps) => {
  const currentUser = useContext(CurrentUserContext);

  const onPlusClick = (event: SyntheticEvent) => {
    event.preventDefault();
    const newNotification = {
      type: NotificationType.REQUEST,
      to: host.id,
      from: currentUser.id,
      event_id: eid,
      message: `${currentUser.data.displayName} has requested to join ${eventTitle}`,
    };
    addDocument('notifications', newNotification).then((notifDoc) => {
      if (notifDoc) {
        let notifs = host.data.notifications;
        if (!notifs) {
          notifs = [notifDoc.id];
        } else {
          notifs.push(notifDoc.id);
        }
        host.data.notifications = notifs;

        let userEvents = host.data.events;
        if (!userEvents) {
          userEvents = [{ eid, status: UserEventStatus.PENDING }];
        } else {
          userEvents.push({ eid, status: UserEventStatus.PENDING });
        }
        host.data.events = userEvents;
        setDocument('users', host.id, host.data);
      }
    });
  };

  let toolTip = 'Request to Join';
  let element = (
    <UserAddOutlined
      key="join"
      onClick={onPlusClick}
      className="antd-icon-action"
    />
  );

  if (currentUser.data.events) {
    const userEvent = currentUser.data.events.find((evt) => evt.eid === eid);
    if (userEvent) {
      switch (userEvent.status) {
        case UserEventStatus.PENDING:
          element = (
            <PauseOutlined key="pending" className="antd-icon-action" />
          );
          toolTip = 'Request is pending';
          break;
        case UserEventStatus.JOINED:
          element = <CheckOutlined key="joined" className="antd-icon-action" />;
          toolTip = 'Joined';
          break;
      }
    }
  }

  return (
    <Tooltip title={toolTip} color="blue" placement="bottom">
      {element}
    </Tooltip>
  );
};

export default EventStatus;
