import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../Firebase';
import { AvatarIcon } from './User.styled';

const Avatar = () => {
  const [user] = useAuthState(auth);

  const url =
    user && user.photoURL ? (user.photoURL as string) : '/defaultAvatar.png';
  return <AvatarIcon src={url} alt="" />;
};

export default Avatar;
