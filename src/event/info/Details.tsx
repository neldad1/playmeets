import { FlexBlock } from '../../components/Components.styled';
import { InfoDisplay } from './EventDetails.styled';

interface DetailsProps {
  details: string;
}
const Details = ({ details }: DetailsProps) => {
  return (
    <FlexBlock>
      <InfoDisplay>{details}</InfoDisplay>
    </FlexBlock>
  );
};

export default Details;
