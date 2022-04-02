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
  margin: 0;
  margin-bottom: -0.75rem;
`;

const InfoDisplay = styled.span`
  font-size: 1em;
`;

const BannerContainer = styled.div<{ photoUrl: string }>`
  display: flex;
  border-radius: 0.25em;
  flex-direction: row;
  justify-content: space-between;
  background-color: lightgrey;
  padding: 1em;
  background-image: url(${({ photoUrl }) => photoUrl});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  color: #eee;
`;

const EvtTitle = styled.h1`
  font-size: 2em;
  margin: 0;
  color: #eee;
`;

const CommentTime = styled.label`
  font-size: 0.75em;
  color: grey;
  margin-top: -1rem;
`;

const MapFrame = styled.iframe`
  border: none;
  width: 40vw;
  height: 30vh;
  @media only screen and (max-width: 768px) {
    width: 90vw;
    height: 30vh;
  }
`;

const CommentTextArea = styled.textarea`
  padding: 1em;
  line-height: 2em;
  flex: 1;
  border-radius: 0.25rem;
  border-color: #aaa;
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
