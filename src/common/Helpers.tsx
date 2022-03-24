import { AppUser, EventData, UserData } from './Interfaces';

const toFormattedDateTimeString = (
  timestamp: number,
  isShowShort: boolean
): string => {
  const param = isShowShort ? 'short' : 'long';
  return new Intl.DateTimeFormat('en-US', {
    weekday: param,
    month: param,
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'UTC',
  }).format(timestamp * 1000);
};

const toDaysAgo = (timestamp: number): string => {
  const valueInDays = (timestamp - Date.now() / 1000) / (3600 * 24);
  return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
    Math.round(valueInDays),
    'day'
  );
};

const toFirestoreEvt = (data: EventData): EventData => {
  return {
    title: data.title,
    createdBy: data.createdBy,
    timestamp: data.timestamp,
    photo: data.photo ?? null,
    slots: data.slots,
    location: {
      name: data.location.name,
      street: data.location.street,
      suburb: data.location.suburb,
      city: data.location.city,
      state: data.location.state,
      zipcode: data.location.zipcode,
    },
    attendees: data.attendees ?? null,
    details: data.details,
  };
};

const getUserData = (users: AppUser[], uid: string): UserData | undefined => {
  let user;
  if (users) {
    user = users.find((user) => user.id === uid);
  }
  return user?.data;
};

const replaceSpaceWithCharacter = (
  inputStr: string,
  charReplacement: string
): string => {
  return inputStr.replace(/\s+/g, charReplacement);
};

const isObjectEmpty = (obj: Object) => !Object.keys(obj).length;

const UPLOAD_STR = 'upload';
const IMG_TRANSFORM = '/c_fill,h_150,w_300';
const getEvtPhotoUrlWithTransform = (photoUrl: string) => {
  const uploadIndex = photoUrl.indexOf(UPLOAD_STR);
  const newPhotoUrl =
    photoUrl.slice(0, uploadIndex + UPLOAD_STR.length) +
    IMG_TRANSFORM +
    photoUrl.slice(uploadIndex + UPLOAD_STR.length);
  return newPhotoUrl;
};

export {
  toFormattedDateTimeString,
  toDaysAgo,
  toFirestoreEvt,
  getUserData,
  replaceSpaceWithCharacter,
  isObjectEmpty,
  getEvtPhotoUrlWithTransform,
};
