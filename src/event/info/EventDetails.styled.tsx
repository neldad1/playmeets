import styled from 'styled-components';

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
`;

const MapFrame = styled.iframe`
  border: none;
  width: 50em;
  height: 30.5em;
`;

export {
  Subtitle,
  InfoDisplay,
  BannerContainer,
  EvtTitle,
  CommentTime,
  MapFrame,
};
