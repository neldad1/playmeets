import { useContext } from 'react';
import { UsersWithinStateContext } from '../../context/UsersWithinState';
import { FlexBlock, FlexRow } from '../content/Content.styled';
import Avatar from '../user/Avatar';
import { Subtitle } from './EventDetails.styled';

interface AttendeesProps {
  attendees: string[];
}
const Attendees = ({ attendees }: AttendeesProps) => {
  const { getAppUserById } = useContext(UsersWithinStateContext);

  const avatars = attendees.map((attendee) => {
    const user = getAppUserById(attendee);
    return <Avatar key={user?.id} imgSrc={user?.data.photoUrl} />;
  });

  return (
    <FlexBlock>
      <Subtitle>Attendees</Subtitle>
      <FlexRow>{avatars}</FlexRow>
    </FlexBlock>
  );
};

export default Attendees;
