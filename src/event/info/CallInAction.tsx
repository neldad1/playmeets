import { HeartOutlined, UserAddOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { FlexRow } from '../../components/Components.styled';

const CallInAction = () => {
  return (
    <FlexRow>
      <Tooltip title="Add event to fave." placement="bottom">
        <HeartOutlined className="antd-icon-action" />
      </Tooltip>
      <Tooltip title="Request to join." placement="bottom">
        <UserAddOutlined className="antd-icon-action" />
      </Tooltip>
    </FlexRow>
  );
};

export default CallInAction;
