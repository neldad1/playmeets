import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import Tooltip from 'antd/lib/tooltip';
import { SyntheticEvent, useContext, useEffect, useState } from 'react';
import { setDocument } from '../common/Firebase';
import { CurrentUserContext } from '../context/CurrentUser';

interface FavouriteProps {
  eid: string;
}
const Favourite = ({ eid }: FavouriteProps) => {
  const [isFavourite, setIsFavourite] = useState(false);

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    if (currentUser)
      if (currentUser.data.favourites)
        if (!Boolean(currentUser.data.favourites.indexOf(eid)))
          setIsFavourite(true);
  }, [currentUser]);

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
    <Tooltip title="Add to Fave" color="blue" placement="bottom">
      {isFavourite ? (
        <HeartFilled
          key="fave-filled"
          className="antd-icon-action"
          onClick={onUnFaveClick}
        />
      ) : (
        <HeartOutlined
          key="fave-outlined"
          className="antd-icon-action"
          onClick={onFaveClick}
        />
      )}
    </Tooltip>
  );
};

export default Favourite;
