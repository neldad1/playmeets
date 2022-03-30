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

const NotificationContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  background-color: whitesmoke;
  padding: 1em;
`;

export { NotificationRectangle, NotificationContainer };
