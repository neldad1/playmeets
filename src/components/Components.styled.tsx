import styled from 'styled-components';

const FlexRowLeft = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
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
`;

const FileUpload = styled.input`
  outline: none;
  text-decoration: none;
`;

const FlexBlock = styled.div`
  gap: 1em;
  display: flex;
  flex-direction: column;
`;

const AvatarIcon = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 2em;
`;

export { FlexRowLeft, FlexRowCenter, Label, FileUpload, FlexBlock, AvatarIcon };
