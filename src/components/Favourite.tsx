import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import Tooltip from 'antd/lib/tooltip';
import { SyntheticEvent, useState } from 'react';
import { setDocument } from '../common/Firebase';
import { AppUser } from '../common/Interfaces';

interface FavouriteProps {
  currentUser: AppUser;
  eid: string;
}
const Favourite = ({ currentUser, eid }: FavouriteProps) => {
  const [isFavourite, setIsFavourite] = useState(false);

  const onFaveClick = (event: SyntheticEvent) => {
    event.preventDefault();
    setDocument('users', currentUser.id, {
      ...currentUser.data,
      favourites: [...(currentUser.data.favourites ?? []), eid],
    });
    setIsFavourite(true);
  };

  const onUnFaveClick = (event: SyntheticEvent) => {
    event.preventDefault();
    const faves = currentUser.data.favourites.filter((fave) => fave !== eid);
    setDocument('users', currentUser.id, {
      ...currentUser.data,
      favourites: faves,
    });
    setIsFavourite(false);
  };

  return (
    <Tooltip title="Add to Fave" color="blue">
      {isFavourite ? (
        <HeartFilled key="fave-filled" onClick={onUnFaveClick} />
      ) : (
        <HeartOutlined key="fave-outlined" onClick={onFaveClick} />
      )}
    </Tooltip>
  );
};

export default Favourite;
