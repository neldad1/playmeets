import { EnvironmentOutlined } from '@ant-design/icons';
import { Location } from '../../common/Interfaces';
import { FlexRowLeft } from '../../components/Components.styled';
import { InfoDisplay } from './EventDetails.styled';

interface AddressProps {
  location: Location;
}
const Address = ({ location }: AddressProps) => {
  const { street, suburb, state, zipcode } = location;
  const addr = `${street}, ${suburb}, ${state} ${zipcode}`;
  return (
    <FlexRowLeft nowrap>
      <EnvironmentOutlined className="antd-icon" />
      <InfoDisplay>{addr}</InfoDisplay>
    </FlexRowLeft>
  );
};

export default Address;
