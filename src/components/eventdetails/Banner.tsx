import { Location, UserData } from '../../common/Interfaces';
import { FlexBlock, FlexRow, Label } from '../content/Content.styled';
import Avatar from '../user/Avatar';
import Address from './Address';
import CallInAction from './CallInAction';
import DateAndTime from './DateAndTime';
import { BannerContainer, EvtTitle } from './EventDetails.styled';

interface BannerProps {
  timestamp: number;
  location: Location;
  title: string;
  userData?: UserData;
}

const Banner = ({ timestamp, location, title, userData }: BannerProps) => {
  let hostName = 'unknown';
  if (userData) hostName = userData.displayName;
  return (
    <BannerContainer>
      <FlexBlock>
        <EvtTitle>{title}</EvtTitle>
        <FlexRow>
          <Avatar userData={userData} />
          <FlexBlock>
            <Label>created by</Label>
            <Label>{hostName}</Label>
          </FlexBlock>
        </FlexRow>
      </FlexBlock>
      <FlexBlock>
        <DateAndTime timestamp={timestamp} />
        <Address location={location} />
        <CallInAction />
      </FlexBlock>
    </BannerContainer>
  );
};

export default Banner;
