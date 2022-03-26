import { Select } from 'antd';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import { AuStates } from '../common/DataObjects';

const { Option } = Select;

interface LocationStatesProps {
  onLocationStateChange(locationState: string): void;
  size: string;
}
const LocationStates = ({
  onLocationStateChange,
  size,
}: LocationStatesProps) => {
  return (
    <Select
      size={size as SizeType}
      className="antd-select"
      placeholder="Select your state."
      onChange={(val: string) => onLocationStateChange(val)}
    >
      {AuStates.map((state: string, index: number) => (
        <Option key={index} value={state}>
          {state}
        </Option>
      ))}
    </Select>
  );
};

export default LocationStates;
