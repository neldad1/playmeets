import styled from 'styled-components';

interface NotificationRectangleProps {
  status: number;
}
const NotificationRectangle = styled.p`
  font-weight: ${(props: NotificationRectangleProps) =>
    props.status ? `normal` : `bold`};
  font-size: 1em;
  cursor: pointer;
  margin: 0;
  line-height: 2.5em;
`;

const NotificationListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 0 auto;

  @media only screen and (max-width: 768px) {
    width: 90%;
    margin: 0;
  }
`;

const UnreadIndicator = styled.img`
  width: 2em;
`;

export { NotificationRectangle, NotificationListContainer, UnreadIndicator };
