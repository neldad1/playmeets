import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../common/Firebase';
import { AvatarIcon } from './User.styled';

const Avatar = () => {
  const [user] = useAuthState(auth);
  const [url, setUrl] = useState(user?.photoURL as string);

  const defaultUrl = require('../../assets/defaultAvatar.png');
  return <AvatarIcon src={url} alt="" onError={() => setUrl(defaultUrl)} />;
};

export default Avatar;
