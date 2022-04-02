import styled from 'styled-components';

const FlexRowLeft = styled.div<{ nowrap?: boolean }>`
  display: flex;
  flex-wrap: wrap;
  flex-wrap: ${({ nowrap }) => nowrap && `nowrap`};
  gap: 1em;
  align-items: center;
`;

const FlexRowCenter = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
  align-items: center;
  justify-content: center;
`;

const Label = styled.label`
  margin-right: 1em;
  font-size: 18px;
`;

const FileUpload = styled.input`
  outline: none;
  text-decoration: none;
`;

const FlexBlock = styled.div`
  gap: 1em;
  display: flex;
  flex-direction: column;
  padding-bottom: 0.75em;
`;

const AvatarIcon = styled.img<{ size?: number }>`
  width: ${({ size = 30 }) => `${size}px`};
  height: ${({ size = 30 }) => `${size}px`};
  border-radius: 2em;
`;

export { FlexRowLeft, FlexRowCenter, Label, FileUpload, FlexBlock, AvatarIcon };
