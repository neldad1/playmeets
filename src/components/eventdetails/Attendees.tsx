import { AppUser } from '../../common/Interfaces';
import { FlexBlock, FlexRow } from '../content/Content.styled';
import Avatar from '../user/Avatar';
import { Subtitle } from './EventDetails.styled';

interface AttendeesProps {
  users: AppUser[];
  attendees: string[];
}
const Attendees = ({ users, attendees }: AttendeesProps) => {
  let avatars;
  if (attendees) {
    avatars = attendees.map((attendee) => {
      const user = users.find((user) => user.id === attendee);
      if (user) return <Avatar key={user.id} userData={user.data} />;
    });
  }
  return (
    <FlexBlock>
      <Subtitle>Attendees</Subtitle>
      <FlexRow>{avatars}</FlexRow>
    </FlexBlock>
  );
};

export default Attendees;
