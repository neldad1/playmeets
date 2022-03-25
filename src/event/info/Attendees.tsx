import { useContext } from 'react';
import Avatar from '../../components/Avatar';
import { FlexBlock, FlexRowLeft } from '../../components/Components.styled';
import { UsersWithinStateContext } from '../../context/UsersWithinState';
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
      <FlexRowLeft>{avatars}</FlexRowLeft>
    </FlexBlock>
  );
};

export default Attendees;
