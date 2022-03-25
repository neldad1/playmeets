import { ClockCircleOutlined } from '@ant-design/icons';
import { toFormattedDateTimeString } from '../../common/Helpers';
import { FlexRowLeft } from '../../components/Components.styled';
import { InfoDisplay } from './EventDetails.styled';

interface DateAndTimeProps {
  timestamp: number;
}

const DateAndTime = ({ timestamp }: DateAndTimeProps) => {
  return (
    <FlexRowLeft>
      <ClockCircleOutlined className="antd-icon" />
      <InfoDisplay>{toFormattedDateTimeString(timestamp, false)}</InfoDisplay>
    </FlexRowLeft>
  );
};

export default DateAndTime;
