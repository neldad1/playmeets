import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  NotificationStatus,
  NotificationType,
  UserEventResponse,
  UserEventStatus,
} from '../../common/Enums';
import { addDocument, getDocument, setDocument } from '../../common/Firebase';
import { getSubstring, isObjectEmpty } from '../../common/Helpers';
import {
  EventData,
  NotificationData,
  UserEvent,
} from '../../common/Interfaces';
import { FlexRowCenter, Label } from '../../components/Components.styled';
import { CurrentUserContext } from '../../context/CurrentUser';
import { UsersWithinStateContext } from '../../context/UsersWithinState';
import { FlexColumn } from '../../pages/Pages.styled';

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
    };
    addDocument('notifications', newNotification).then((notifDoc) => {
      console.log('new notif: ', notifDoc?.id);
      if (notifDoc) updateFromUser(notifDoc.id, result);
    });
  };

  const updateNotification = () => {
    getDocument('notifications', nid).then((notifDoc) => {
      if (!notifDoc) return;
      const notifData = notifDoc.data() as NotificationData;
      notifData.status = NotificationStatus.READ;
      setDocument('notifications', nid, notifData);
    });
  };

  const updateFromUser = (
    newNotificationId: string,
    result: UserEventResponse
  ) => {
    if (!fromUser) return;

    const { notifications, events } = fromUser.data;

    let userNotifications: string[] = [];
    if (notifications) userNotifications = [...notifications];
    userNotifications.push(newNotificationId);

    let userEvents: UserEvent[] = [];
    if (events) userEvents = [...events];
    const index = userEvents.findIndex((event) => event.eid === eid);
    if (index === -1) return;

    if (result === UserEventResponse.APPROVED) {
      userEvents[index].status = UserEventStatus.JOINED;
    } else {
      userEvents.splice(index, 1);
    }

    setDocument('users', fromUser.id, {
      ...fromUser.data,
      notifications: userNotifications,
      events: userEvents,
    });
  };

  const updateEvent = () => {
    if (!fromUser) return;

    getDocument('events', eid).then((eventDoc) => {
      if (!eventDoc) return;
      const eventData = eventDoc.data() as EventData;
      let attendees: string[] = [];
      if (eventData.attendees) attendees = [...eventData.attendees];
      attendees.push(fromUser.id);
      setDocument('events', eid, { ...eventData, attendeees: attendees });
    });
  };

  const updateCurrentUser = () => {
    const { data } = currentUser;

    let tempNotifications: string[] = [];
    if (!data.notifications) return;

    console.log(nid);
    tempNotifications = data.notifications.filter((notif) => notif !== nid);
    console.log(tempNotifications);
    setDocument('users', currentUser.id, {
      ...data,
      notifications: tempNotifications,
    }).then(() => navigate('/notifications'));
  };

  const createResponse = (result: UserEventResponse) => {
    if (!currentUser || !fromUser) return;

    updateNotification();
    addNotificationResponse(result);
    if (result === UserEventResponse.APPROVED) updateEvent();
    updateCurrentUser();
  };

  const onApproveButtonClick = () => {
    createResponse(UserEventResponse.APPROVED);
  };

  const onRejectButtonClick = () => {
    createResponse(UserEventResponse.REJECTED);
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
