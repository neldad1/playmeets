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
  eventTitle: string;
  host: AppUser;
}

const Banner = ({
  timestamp,
  location,
  eid,
  eventTitle,
  host,
}: BannerProps) => {
  let hostName = 'unknown';
  if (host) hostName = host.data.displayName;
  return (
    <BannerContainer>
      <FlexBlock>
        <EvtTitle>{eventTitle}</EvtTitle>
        <FlexRowLeft>
          <Avatar imgSrc={host.data.photoUrl} />
          <FlexBlock>
            <Label>created by</Label>
            <Label>{hostName}</Label>
          </FlexBlock>
        </FlexRowLeft>
      </FlexBlock>
      <CallInAction host={host} eid={eid} eventTitle={eventTitle} />
    </BannerContainer>
  );
};

export default Banner;
