import { EnvironmentOutlined } from '@ant-design/icons';
import { FlexRowLeft } from '../../components/Components.styled';
import { InfoDisplay } from './EventDetails.styled';

interface AddressProps {
  fullAddr: string;
}
const Address = ({ fullAddr }: AddressProps) => {
  return (
    <FlexRowLeft nowrap>
      <EnvironmentOutlined className="antd-icon" />
      <InfoDisplay>{fullAddr}</InfoDisplay>
    </FlexRowLeft>
  );
};

export default Address;
