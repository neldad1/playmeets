import { getEvtPhotoUrlWithTransform } from '../../common/Helpers';
import { AppUser, Location } from '../../common/Interfaces';
import Avatar from '../../components/Avatar';
import {
  FlexBlock,
  FlexRowLeft,
  Label,
} from '../../components/Components.styled';
import CallInAction from './CallInAction';
import { BannerContainer, EvtTitle } from './EventDetails.styled';

interface BannerProps {
  timestamp: number;
  location: Location;
  eid: string;
  eventPhoto: string;
  eventTitle: string;
  host: AppUser;
}

const Banner = ({
  timestamp,
  location,
  eventPhoto,
  eid,
  eventTitle,
  host,
}: BannerProps) => {
  let hostName = 'unknown';
  if (host) hostName = host.data.displayName;
  return (
    <BannerContainer
      photoUrl={getEvtPhotoUrlWithTransform(
        eventPhoto,
        '/c_fill,e_brightness:-25'
      )}
    >
      <FlexBlock>
        <EvtTitle>{eventTitle}</EvtTitle>
        <FlexRowLeft>
          <Avatar
            size={60}
            bordered
            imgSrc={host.data.photoUrl}
            displayName={host.data.displayName}
          />
          <FlexBlock>
            <Label>created by {hostName}</Label>
          </FlexBlock>
        </FlexRowLeft>
      </FlexBlock>
      <CallInAction host={host} eid={eid} eventTitle={eventTitle} />
    </BannerContainer>
  );
};

export default Banner;
