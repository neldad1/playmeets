import { useContext } from 'react';
import { toDaysAgo } from '../../common/Helpers';
import { CommentData } from '../../common/Interfaces';
import Avatar from '../../components/Avatar';
import { FlexBlock } from '../../components/Components.styled';
import { UsersWithinStateContext } from '../../context/UsersWithinState';
import { CommentTime, FlexStart, InfoDisplay } from './EventDetails.styled';

interface CommentItemProps {
  commentData: CommentData;
}

const CommentItem = ({ commentData }: CommentItemProps) => {
  const { getAppUserById } = useContext(UsersWithinStateContext);

  const user = getAppUserById(commentData.uid);
  return (
    <FlexStart>
      <Avatar
        imgSrc={user?.data.photoUrl}
        displayName={user?.data.displayName}
      />
      <FlexBlock>
        <InfoDisplay>{commentData.comment}</InfoDisplay>
        <CommentTime>{toDaysAgo(commentData.timestamp)}</CommentTime>
      </FlexBlock>
    </FlexStart>
  );
};

export default CommentItem;
