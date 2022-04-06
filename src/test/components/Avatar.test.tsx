/* eslint-disable testing-library/no-debugging-utils */
import { render, screen } from '@testing-library/react';
import Avatar from '../../components/Avatar';

describe('Testing <Avatar /> component', () => {
  it('should render the correct imgSrcUrl, size', () => {
    render(<Avatar imgSrc="http://test.image.com/test.png" size={40} />);
    expect(screen.getByTestId('avatar-icon').getAttribute('src')).toEqual(
      'http://test.image.com/test.png'
    );
    expect(screen.getByTestId('avatar-icon').getAttribute('size')).toEqual(
      '40'
    );
  });
  it('should render the default avatar url', () => {
    render(<Avatar />);
    expect(screen.getByTestId('avatar-icon').getAttribute('src')).toEqual(
      'defaultAvatar.png'
    );
  });
});
