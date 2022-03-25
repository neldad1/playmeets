import { useEffect, useState } from 'react';
import { getDocuments } from '../../common/Firebase';
import { CommentData, EvtComment } from '../../common/Interfaces';
import { FlexBlock } from '../../components/Components.styled';
import CommentItem from './CommentItem';
import { Subtitle } from './EventDetails.styled';

interface CommentsProps {
  eid: string;
}
const Comments = ({ eid }: CommentsProps) => {
  const [commentList, setCommentList] = useState<EvtComment[]>([]);

  useEffect(() => {
    if (!Boolean(commentList.length)) {
      getDocuments('comments', 'event_id', eid).then((docs) => {
        const appComments: EvtComment[] = [];
        docs.forEach((doc) => {
          appComments.push({ id: doc.id, data: doc.data() as CommentData });
        });
        setCommentList(appComments);
      });
    }
  }, []);

  const commentElements = commentList.map((comment) => (
    <CommentItem key={comment.id} commentData={comment.data} />
  ));

  return (
    <FlexBlock>
      <Subtitle>Comments</Subtitle>
      {commentElements}
    </FlexBlock>
  );
};

export default Comments;
