import styled from 'styled-components';

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const AuthFlexRow = styled.div`
  display: flex;
  justify-content: space-betweenc;
`;

const AuthFlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  margin: 5% auto;
  justify-content: space-evenly;
  border: 1px solid;
`;

const Logo = styled.img`
  width: 5em;
  height: 5em;
`;

const Label = styled.label`
  margin-right: 1em;
`;

export { FlexColumn, AuthFlexColumn, AuthFlexRow, Logo, Label };
