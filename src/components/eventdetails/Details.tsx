import { FlexBlock } from '../content/Content.styled';
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
