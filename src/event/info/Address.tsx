import { EnvironmentOutlined } from '@ant-design/icons';
import { Location } from '../../common/Interfaces';
import { FlexRow } from '../../components/Components.styled';
import { InfoDisplay } from './EventDetails.styled';

interface AddressProps {
  location: Location;
}
const Address = ({ location }: AddressProps) => {
  const { street, suburb, state, zipcode } = location;
  const addr = `${street}, ${suburb}, ${state} ${zipcode}`;
  return (
    <FlexRow>
      <EnvironmentOutlined className="antd-icon" />
      <InfoDisplay>{addr}</InfoDisplay>
    </FlexRow>
  );
};

export default Address;
