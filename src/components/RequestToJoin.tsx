import { UserAddOutlined } from '@ant-design/icons';
import Tooltip from 'antd/lib/tooltip';

const RequestToJoin = () => {
  return (
    <Tooltip title="Request to Join" color="blue">
      <UserAddOutlined key="join" />
    </Tooltip>
  );
};

export default RequestToJoin;
