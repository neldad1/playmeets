import { Link } from 'react-router-dom';
import { AppNotification } from '../common/Interfaces';
import { NotificationRectangle } from './Notification.styled';

interface NotificationProps {
  appNotification: AppNotification;
}
const Notification = ({ appNotification }: NotificationProps) => {
  const { status, message } = appNotification.data;
  return (
    <Link to={`/notifications/${appNotification.id}`}>
      <NotificationRectangle status={status}>{message}</NotificationRectangle>
    </Link>
  );
};

export default Notification;
