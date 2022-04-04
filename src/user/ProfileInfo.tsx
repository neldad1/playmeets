import { useState } from 'react';
import { AppUser } from '../common/Interfaces';
import {
  FlexBlock,
  FlexRowCenter,
  FlexRowLeft,
  Label,
} from '../components/Components.styled';
import AgeGroup from './AgeGroup';
import EventsCount from './EventsCount';
import Location from './Location';
import { DisplayName, ProfileAvatar } from './User.styled';
import defaultAvatar from '../assets/defaultAvatar.png';
import UploadPhoto from '../components/UploadPhoto';
import { setDocument } from '../common/Firebase';

interface ProfileInfoProps {
  appUser: AppUser;
}
const ProfileInfo = ({ appUser }: ProfileInfoProps) => {
  const { photoUrl, name, displayName, city, state, ageGroup, events } =
    appUser.data;

  const [avatarUrl, setAvatarUrl] = useState(photoUrl);

  const setImgUrl = (photoUrl: string) => {
    setAvatarUrl(photoUrl);
    setDocument('users', appUser.id, { ...appUser.data, photoUrl });
  };

  if (!avatarUrl) setAvatarUrl(defaultAvatar);

  return (
    <FlexRowCenter>
      <FlexBlock>
        <ProfileAvatar
          src={avatarUrl}
          onError={() => setAvatarUrl(defaultAvatar)}
        />
        <UploadPhoto setImgUrl={setImgUrl} />
      </FlexBlock>
      <FlexBlock>
        <DisplayName>{displayName}</DisplayName>
        <Label>{name}</Label>
        <Location city={city} state={state} />
        <AgeGroup ageGroups={ageGroup} />
        <EventsCount events={events || []} />
      </FlexBlock>
    </FlexRowCenter>
  );
};

export default ProfileInfo;
