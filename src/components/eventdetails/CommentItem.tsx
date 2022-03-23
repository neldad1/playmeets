import { getUserData, toDaysAgo } from '../../common/Helpers';
import { AppUser, CommentData } from '../../common/Interfaces';
import { FlexBlock, FlexRow } from '../content/Content.styled';
import Avatar from '../user/Avatar';
import { CommentTime, InfoDisplay } from './EventDetails.styled';

interface CommentItemProps {
  commentData: CommentData;
  appUsers: AppUser[];
}

const CommentItem = ({ commentData, appUsers }: CommentItemProps) => {
  const user = getUserData(appUsers, commentData.user_id);
  return (
    <FlexRow>
      <Avatar userData={user} />
      <FlexBlock>
        <InfoDisplay>{commentData.comment}</InfoDisplay>
        <CommentTime>{toDaysAgo(commentData.timestamp)}</CommentTime>
      </FlexBlock>
    </FlexRow>
  );
};

export default CommentItem;
