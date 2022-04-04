import styled from 'styled-components';

const HeaderCont = styled.div`
  width: inherit;
  height: 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FullLogo = styled.img`
  width: 160px;
  height: 90px;
  float: left;
  padding-left: 2em;
`;

const MenuItemIcon = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  @media only screen and (max-width: 768px) {
    width: 30px;
    height: 30px;
  }
`;

const MenuItemText = styled.label`
  font-size: 14px;
  line-height: 1.5;
  color: #004aad;
`;

const MenuItemContainer = styled.div<{ direction: string }>`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  justify-content: ${({ direction }) =>
    direction === `column` ? `flex-end` : `left`};
  gap: ${({ direction }) => (direction === `column` ? `0` : `0.25em`)};
  align-items: center;
  @media only screen and (max-width: 768px) {
    flex-direction: row;
    justify-content: left;
    gap: 0.25em;
  }
`;

export { HeaderCont, FullLogo, MenuItemIcon, MenuItemText, MenuItemContainer };
