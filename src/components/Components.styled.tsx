import styled from 'styled-components';

const FlexRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
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

const FlexSpaceBetween = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const AvatarIcon = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 2em;
`;

export { FlexRow, Label, FileUpload, FlexBlock, FlexSpaceBetween, AvatarIcon };
