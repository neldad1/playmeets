import { Button } from 'antd';
import { Link } from 'react-router-dom';
import EmptyIcon from '../assets/empty.svg';
import {
  EmptyListContainer,
  EmptyListImage,
  EmptyListMessage,
} from './Components.styled';

interface EmptyListProps {
  message?: string;
  link?: string;
  actionTitle?: string;
}
const EmptyList = ({
  message = 'No events found within your state.',
  link = '/create-event',
  actionTitle = 'Create Now',
}: EmptyListProps) => {
  return (
    <EmptyListContainer>
      <EmptyListImage
        src={EmptyIcon}
        alt="Empty List"
        style={{ width: '100px', height: '100px' }}
      />
      <EmptyListMessage>{message}</EmptyListMessage>
      {Boolean(link.length) && (
        <Link to={link}>
          <Button type="primary">{actionTitle}</Button>
        </Link>
      )}
    </EmptyListContainer>
  );
};

export default EmptyList;
