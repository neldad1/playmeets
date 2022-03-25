import { ClockCircleOutlined } from '@ant-design/icons';
import { toFormattedDateTimeString } from '../../common/Helpers';
import { FlexRow } from '../../components/Components.styled';
import { InfoDisplay } from './EventDetails.styled';

interface DateAndTimeProps {
  timestamp: number;
}

const DateAndTime = ({ timestamp }: DateAndTimeProps) => {
  return (
    <FlexRow>
      <ClockCircleOutlined className="antd-icon" />
      <InfoDisplay>{toFormattedDateTimeString(timestamp, false)}</InfoDisplay>
    </FlexRow>
  );
};

export default DateAndTime;
