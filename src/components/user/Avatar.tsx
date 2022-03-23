import { useEffect, useState } from 'react';
import { AvatarIcon } from './User.styled';
import defaultAvatar from '../../assets/defaultAvatar.png';
import { UserData } from '../../common/Interfaces';

interface AvatarProps {
  imgSrc?: string;
  userData?: UserData;
}

const Avatar = ({ imgSrc, userData }: AvatarProps) => {
  const [url, setUrl] = useState(imgSrc || '');

  useEffect(() => {
    if (!Boolean(url.length) && userData) setUrl(userData.photoUrl);
  }, [url]);

  return <AvatarIcon src={url} onError={() => setUrl(defaultAvatar)} />;
};

export default Avatar;
