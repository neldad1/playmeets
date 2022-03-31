import { useContext } from 'react';
import { CurrentUserContext } from '../context/CurrentUser';
import ProfileInfo from '../user/ProfileInfo';
import { PagesContainer } from './Pages.styled';

const Profile = () => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <PagesContainer offset="1em">
      <ProfileInfo appUser={currentUser} />
    </PagesContainer>
  );
};
export default Profile;
