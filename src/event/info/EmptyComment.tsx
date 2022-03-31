import { Button } from 'antd';
import { SyntheticEvent, useContext, useState } from 'react';
import { NotificationStatus, NotificationType } from '../../common/Enums';
import { addDocument, setDocument } from '../../common/Firebase';
import { EvtComment } from '../../common/Interfaces';
import Avatar from '../../components/Avatar';
import { FlexBlock } from '../../components/Components.styled';
import { CurrentUserContext } from '../../context/CurrentUser';
import { UsersWithinStateContext } from '../../context/UsersWithinState';
import { CommentTextArea, FlexEnd, FlexStart } from './EventDetails.styled';

interface EmptyCommentProps {
  eid: string;
  eventTitle: string;
  to: string;
  onAddComment(newComment: EvtComment): void;
}
const EmptyComment = ({
  eid,
  eventTitle,
  to,
  onAddComment,
}: EmptyCommentProps) => {
  const [comment, setComment] = useState('');

  const currentUser = useContext(CurrentUserContext);
  const { getAppUserById } = useContext(UsersWithinStateContext);
  const toUser = getAppUserById(to);

  const onAddCommentButtonClick = () => {
    if (!Boolean(comment.length)) return;

    const commentData = {
      eid,
      uid: currentUser.id,
      comment,
      timestamp: Math.round(Date.now() / 1000),
    };
    addDocument('comments', commentData).then((commentDoc) => {
      if (commentDoc) {
        onAddComment({ id: commentDoc.id, data: commentData });
        if (currentUser.id !== to) createNewNotification();
        setComment('');
      }
    });
  };

  const createNewNotification = () => {
    const message = `${currentUser.data.displayName} has left a comment on ${eventTitle}`;
    const notifData = {
      type: NotificationType.COMMENT,
      from: currentUser.id,
      to,
      eid,
      status: NotificationStatus.UNREAD,
      message,
    };
    addDocument('notifications', notifData).then((notifDoc) => {
      if (notifDoc && toUser) {
        const notif = {
          ...toUser.data,
          notifications: [...(toUser.data.notifications ?? []), notifDoc.id],
        };
        setDocument('users', to, notif);
      }
    });
  };

  return (
    <FlexBlock>
      <FlexStart>
        <Avatar imgSrc={currentUser?.data.photoUrl} />
        <CommentTextArea
          placeholder="Comment here..."
          value={comment}
          onChange={(evt: SyntheticEvent) =>
            setComment((evt.target as HTMLTextAreaElement).value)
          }
        />
      </FlexStart>
      <FlexEnd>
        <Button
          type="primary"
          onClick={onAddCommentButtonClick}
          disabled={!Boolean(comment.length)}
        >
          Add Comment
        </Button>
      </FlexEnd>
    </FlexBlock>
  );
};

export default EmptyComment;
