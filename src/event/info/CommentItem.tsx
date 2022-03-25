import { useContext } from 'react';
import { toDaysAgo } from '../../common/Helpers';
import { CommentData } from '../../common/Interfaces';
import Avatar from '../../components/Avatar';
import { FlexRow, FlexBlock } from '../../components/Components.styled';
import { UsersWithinStateContext } from '../../context/UsersWithinState';
import { CommentTime, InfoDisplay } from './EventDetails.styled';

interface CommentItemProps {
  commentData: CommentData;
}

const CommentItem = ({ commentData }: CommentItemProps) => {
  const { getAppUserById } = useContext(UsersWithinStateContext);

  const user = getAppUserById(commentData.user_id);
  return (
    <FlexRow>
      <Avatar imgSrc={user?.data.photoUrl} />
      <FlexBlock>
        <InfoDisplay>{commentData.comment}</InfoDisplay>
        <CommentTime>{toDaysAgo(commentData.timestamp)}</CommentTime>
      </FlexBlock>
    </FlexRow>
  );
};

export default CommentItem;