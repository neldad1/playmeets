import { replaceSpaceWithCharacter } from '../../common/Helpers';
import { Location } from '../../common/Interfaces';
import { MapFrame } from './EventDetails.styled';

interface LocationMapProps {
  location: Location;
}
const LocationMap = ({ location }: LocationMapProps) => {
  const { name, street, suburb, state, zipcode } = location;

  const newStreet = replaceSpaceWithCharacter(street, '+');
  const newSuburb = replaceSpaceWithCharacter(suburb, '+');

  const source = `https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_FIREBASE_API_KEY}
  &q=${name},${newStreet},${newSuburb},${state},${zipcode}`;
  return <MapFrame title={name} loading="lazy" src={source} />;
};

export default LocationMap;
