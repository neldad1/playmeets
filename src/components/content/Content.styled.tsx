import styled from 'styled-components';

const FlexRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
`;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  margin: 5% auto;
  justify-content: space-evenly;
  border: 1px solid;
  gap: 1em;

  @media only screen and (max-width: 768px) {
    width: 100%;
    margin: 0;
    padding: 1em;
  }
`;

const Logo = styled.img`
  width: 5em;
  height: 5em;
`;

const Label = styled.label`
  margin-right: 1em;
`;

const EventPhoto = styled.img`
  width: 300px;
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

export {
  FlexColumn,
  FlexRow,
  Logo,
  Label,
  EventPhoto,
  FileUpload,
  FlexBlock,
  FlexSpaceBetween,
};
