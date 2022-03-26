import styled from 'styled-components';

interface NotificationRectangleProps {
  status: number;
}
const NotificationRectangle = styled.p`
  font-weight: ${(props: NotificationRectangleProps) =>
    props.status ? `normal` : `bold`};
  font-size: 1em;
`;

export { NotificationRectangle };
