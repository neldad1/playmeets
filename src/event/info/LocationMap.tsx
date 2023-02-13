import { MapFrame } from './EventDetails.styled';

interface LocationMapProps {
  place_id: string;
  name: string;
}
const LocationMap = ({ name, place_id }: LocationMapProps) => {
  // const { name, street, suburb, state, zipcode } = location;

  // const newStreet = replaceSpaceWithCharacter(street, '+');
  // const newSuburb = replaceSpaceWithCharacter(suburb, '+');

  // const source = `https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_FIREBASE_API_KEY}
  // &q=${name},${newStreet},${newSuburb},${state},${zipcode}`;

  const source = `https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_FIREBASE_API_KEY}
  &q=place_id:${place_id}`;

  return <MapFrame title={name} loading="lazy" src={source} />;
};

export default LocationMap;
