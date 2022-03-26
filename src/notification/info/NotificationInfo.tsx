import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDocument } from '../../common/Firebase';
import { NotificationData } from '../../common/Interfaces';
import { FlexBlock } from '../../components/Components.styled';
import NotificationRequest from './NotificationRequest';

const NotificationInfo = () => {
  const { notificationId } = useParams();
  const [notificationData, setNotificationData] = useState<NotificationData>(
    {} as NotificationData
  );

  useEffect(() => {
    getDocument('notifications', notificationId).then((notifDoc) => {
      if (notifDoc?.exists())
        setNotificationData(notifDoc.data() as NotificationData);
    });
  }, [notificationId]);
  return (
    <FlexBlock>
      <NotificationRequest
        message={notificationData.message}
        from={notificationData.from}
        nid={notificationId as string}
        eid={notificationData.event_id}
      />
    </FlexBlock>
  );
};

export default NotificationInfo;
