import {
  getEvtPhotoUrlWithTransform,
  getSubstring,
  isObjectEmpty,
  replaceSpaceWithCharacter,
  toDaysAgo,
  toFirestoreEvt,
  toFormattedDateTimeString,
} from '../../common/Helpers';
import { FirstData, mockEvents } from '../mockData/mockEvents';

describe('Testing toFormattedDateTimeString()', () => {
  it('should return formatted date where day and month are in short', () => {
    expect(toFormattedDateTimeString(1649215220, true)).toEqual(
      'Wed, Apr 6, 3:20 AM'
    );
  });
  it('should return formatted date where day and month are in long', () => {
    expect(toFormattedDateTimeString(1649215220, false)).toEqual(
      'Wednesday, April 6, 3:20 AM'
    );
  });
});

describe('Testing toDaysAgo()', () => {
  it('should return today', () => {
    expect(toDaysAgo(1649215220)).toEqual('today');
  });
  it('should return 2 days ago', () => {
    expect(toDaysAgo(1649030553)).toEqual('2 days ago');
  });
});

describe('Testing toFirestoreEvt()', () => {
  it('should return the data similar to the passed value', () => {
    expect(toFirestoreEvt(mockEvents[0].data)).toEqual(FirstData);
  });
});

describe('Testing replaceSpaceWithCharacter()', () => {
  it('should replace space with +', () => {
    expect(replaceSpaceWithCharacter('1 2 3 4', '+')).toEqual('1+2+3+4');
  });
  it('should replace space with /', () => {
    expect(replaceSpaceWithCharacter('This is a test', '/')).toEqual(
      'This/is/a/test'
    );
  });
});

describe('Testing isObjectEmpty()', () => {
  it('should return true if object is empty', () => {
    expect(isObjectEmpty({})).toBeTruthy();
  });
  it('should return false if object has data', () => {
    expect(isObjectEmpty({ id: 1 })).toBeFalsy();
  });
});

describe('Testing getEvtPhotoUrlWithTransform()', () => {
  it('should return new url with the default transform value', () => {
    expect(
      getEvtPhotoUrlWithTransform('https://test@playmeets.com/upload/test.png')
    ).toEqual('https://test@playmeets.com/upload/c_fill,h_150,w_300/test.png');
  });
  it('should return new url with the specified transform value', () => {
    const transformVal = '/c_fill,e_brightness:-25';
    expect(
      getEvtPhotoUrlWithTransform(
        'https://test@playmeets.com/upload/test.png',
        transformVal
      )
    ).toEqual(
      'https://test@playmeets.com/upload/c_fill,e_brightness:-25/test.png'
    );
  });
});

describe('Testing getSubstring()', () => {
  it('should return the string value after the search text', () => {
    expect(getSubstring('I want to join Bounce Day', 'join ')).toEqual(
      'Bounce Day'
    );
  });
});
