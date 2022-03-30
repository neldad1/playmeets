import { useEffect, useState } from 'react';
import { getDocuments } from '../../common/Firebase';
import { CommentData, EvtComment } from '../../common/Interfaces';
import { FlexBlock } from '../../components/Components.styled';
import CommentItem from './CommentItem';
import EmptyComment from './EmptyComment';
import { Subtitle } from './EventDetails.styled';

interface CommentsProps {
  eid: string;
  eventTitle: string;
  host: string;
}
const Comments = ({ eid, eventTitle, host }: CommentsProps) => {
  const [commentList, setCommentList] = useState<EvtComment[]>([]);

  useEffect(() => {
    if (!Boolean(commentList.length)) {
      getDocuments('comments', 'eid', eid).then((docs) => {
        const appComments: EvtComment[] = [];
        docs.forEach((doc) => {
          appComments.push({ id: doc.id, data: doc.data() as CommentData });
        });
        setCommentList(appComments);
      });
    }
  }, []);

  const addComment = (newComment: EvtComment) => {
    setCommentList([...commentList, newComment]);
  };

  if (commentList.length > 0) {
    commentList.sort((comment1, comment2) => {
      const ts1 = comment1.data.timestamp;
      const ts2 = comment2.data.timestamp;
      if (ts1 > ts2) return -1;
      else return 1;
    });
  }

  const commentElements = commentList.map((comment) => (
    <CommentItem key={comment.id} commentData={comment.data} />
  ));

  return (
    <FlexBlock>
      <Subtitle>Comments</Subtitle>
      <EmptyComment
        eid={eid}
        eventTitle={eventTitle}
        to={host}
        onAddComment={addComment}
      />
      {commentElements}
    </FlexBlock>
  );
};

export default Comments;
