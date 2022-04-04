import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  NotificationStatus,
  NotificationType,
  UserEventResponse,
  UserEventStatus,
} from '../common/Enums';
import { addDocument, getDocument, setDocument } from '../common/Firebase';
import { getSubstring } from '../common/Helpers';
import { EventData, UserEvent } from '../common/Interfaces';
import { FlexRowCenter, Label } from '../components/Components.styled';
import { CurrentUserContext } from '../context/CurrentUser';
import { UsersWithinStateContext } from '../context/UsersWithinState';
import { FlexColumn } from '../pages/Pages.styled';

interface NotificationRequestProps {
  message: string;
  from: string;
  nid: string;
  eid: string;
}
const NotificationRequest = ({
  message,
  from,
  nid,
  eid,
}: NotificationRequestProps) => {
  const { getAppUserById } = useContext(UsersWithinStateContext);
  const currentUser = useContext(CurrentUserContext);

  const fromUser = getAppUserById(from);
  const navigate = useNavigate();

  const addNotificationResponse = (result: UserEventResponse) => {
    if (!fromUser) return;

    const eventTitle = getSubstring(message, 'join ');
    const newNotification = {
      type: NotificationType.RESPONSE,
      to: fromUser.id,
      from: currentUser.id,
      eid: eid,
      status: NotificationStatus.UNREAD,
      message: `${currentUser.data.displayName} has ${result} your request to join ${eventTitle}`,
      timestamp: Math.round(Date.now() / 1000),
    };
    addDocument('notifications', newNotification).then((notifDoc) => {
      if (notifDoc) updateFromUser(result, notifDoc.id);
    });
  };

  const updateFromUser = (
    result: UserEventResponse,
    responseNotifId: string
  ) => {
    if (!fromUser) return;

    const { events, notifications } = fromUser.data;

    //update or remove the event
    let userEvents: UserEvent[] = [];
    if (events) {
      userEvents = [...events];
    }
    const index = userEvents.findIndex((event) => event.eid === eid);
    if (index === -1) return;

    if (result === UserEventResponse.APPROVED) {
      userEvents[index].status = UserEventStatus.JOINED;
    } else {
      userEvents.splice(index, 1);
    }

    //add the response notification
    let userNotifs: string[] = [];
    if (notifications) {
      userNotifs = [...notifications];
    }
    userNotifs.push(responseNotifId);

    //set the new user data in firestore
    setDocument('users', fromUser.id, {
      ...fromUser.data,
      events: userEvents,
      notifications: userNotifs,
    }).then(() => navigate('/notifications'));
  };

  const updateEvent = () => {
    if (!fromUser) return;

    getDocument('events', eid).then((eventDoc) => {
      if (!eventDoc) return;
      const eventData = eventDoc.data() as EventData;
      let attendees: string[] = [];
      if (eventData.attendees) {
        attendees = [...eventData.attendees];
      }
      attendees.push(fromUser.id);
      setDocument('events', eid, { ...eventData, attendees }).then(() =>
        navigate('/notifications')
      );
    });
  };

  const onApproveButtonClick = () => {
    addNotificationResponse(UserEventResponse.APPROVED);
    updateEvent();
  };

  const onRejectButtonClick = () => {
    addNotificationResponse(UserEventResponse.REJECTED);
  };

  return (
    <FlexColumn>
      <Label>{message}</Label>
      <FlexRowCenter>
        <Button icon={<CheckOutlined />} onClick={onApproveButtonClick}>
          Approve
        </Button>
        <Button icon={<CloseOutlined />} onClick={onRejectButtonClick}>
          Reject
        </Button>
      </FlexRowCenter>
    </FlexColumn>
  );
};

export default NotificationRequest;
