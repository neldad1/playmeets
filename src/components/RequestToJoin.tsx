import { UserAddOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import Tooltip from 'antd/lib/tooltip';
import { SyntheticEvent } from 'react';

const RequestToJoin = () => {
  const onButtonClick = (event: SyntheticEvent) => {
    event.preventDefault();
  };
  return (
    <Tooltip title="Request to Join" color="blue">
      <Button icon={<UserAddOutlined key="join" />} onClick={onButtonClick} />
    </Tooltip>
  );
};

export default RequestToJoin;
