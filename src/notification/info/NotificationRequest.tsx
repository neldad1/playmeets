import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useContext } from 'react';
import {
  NotificationStatus,
  NotificationType,
  UserEventResponse,
  UserEventStatus,
} from '../../common/Enums';
import { addDocument, getDocument, setDocument } from '../../common/Firebase';
import { getSubstring } from '../../common/Helpers';
import { NotificationData } from '../../common/Interfaces';
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

  const updateNotification = () => {
    getDocument('notifications', nid).then((notifDoc) => {
      if (!notifDoc) return;
      const notifData = notifDoc.data() as NotificationData;
      notifData.status = NotificationStatus.READ;
      setDocument('notifications', nid, notifData);
    });
  };

  const updateFromUser = (newNotificationId: string) => {
    if (!fromUser) return;

    const tempFromUser = fromUser;
    let { notifications, events } = tempFromUser.data;

    const userNotifications = [...notifications];
    userNotifications.push(newNotificationId);
    notifications = userNotifications;

    const userEvents = [...events];
    const event = userEvents.find((event) => event.eid === eid);
    if (event) {
      event.status = UserEventStatus.JOINED;
    }
    setDocument('users', tempFromUser.id, tempFromUser.data);
  };

  const addNotificationResponse = (result: UserEventResponse) => {
    if (!currentUser || !fromUser) return;

    updateNotification();

    const eventTitle = getSubstring(message, 'join ');
    const newNotification = {
      type: NotificationType.RESPONSE,
      to: fromUser.id,
      from: currentUser.id,
      event_id: eid,
      status: NotificationStatus.UNREAD,
      message: `${currentUser.data.displayName} has ${result} your request to join ${eventTitle}`,
    };
    addDocument('notifications', newNotification).then((notifDoc) => {
      if (notifDoc) updateFromUser(notifDoc.id);
    });

    updateCurrentUser();
  };

  const updateCurrentUser = () => {
    const { data } = currentUser;
    const tempNotifications = [...data.notifications];
    const index = tempNotifications.findIndex((notif) => notif === nid);
    tempNotifications.splice(index, 1);
    setDocument('users', currentUser.id, {
      ...data,
      notifications: tempNotifications,
    });
  };

  const onApproveButtonClick = () => {
    addNotificationResponse(UserEventResponse.APPROVED);
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
