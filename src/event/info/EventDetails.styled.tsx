import styled from 'styled-components';

const FlexSpaceBetween = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  gap: 3em;
  @media only screen and (max-width: 768px) {
    display: block;
  }
`;

const Subtitle = styled.h3`
  font-size: 1.25em;
`;

const InfoDisplay = styled.span`
  font-size: 1.1em;
`;

const BannerContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: lightgrey;
  padding: 1em;
`;

const EvtTitle = styled.h1`
  font-size: 2em;
  margin: 0;
`;

const CommentTime = styled.label`
  font-size: 0.75em;
  color: grey;
`;

const MapFrame = styled.iframe`
  border: none;
  width: 45vw;
  height: 30vh;
  @media only screen and (max-width: 768px) {
    width: 95vw;
    height: 30vh;
  }
`;

const CommentTextArea = styled.textarea`
  line-height: 2em;
  flex: 1;
`;

const FlexEnd = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1em;
`;

const FlexStart = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 1em;
`;

export {
  Subtitle,
  InfoDisplay,
  BannerContainer,
  EvtTitle,
  CommentTime,
  MapFrame,
  FlexSpaceBetween,
  CommentTextArea,
  FlexEnd,
  FlexStart,
};
