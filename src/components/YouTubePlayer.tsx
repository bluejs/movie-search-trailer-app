import React from 'react';
import ReactPlayer from 'react-player';

export interface YoutubePlayerProps {
  videoKey: string;
}

/**
 * YouTubePlayer component that renders a YouTube video player.
 *
 * @param {YoutubePlayerProps} props - The props for the YouTubePlayer component.
 * @param {string} props.videoKey - The key of the YouTube video to play.
 * @returns {JSX.Element} The YouTubePlayer component.
 */
export const YouTubePlayer: React.FC<YoutubePlayerProps> = ({ videoKey }) => {
  const url = `https://www.youtube.com/watch?v=${videoKey}`;
  return (
    <ReactPlayer
      className="video-player"
      url={url}
      controls={true}
      playing={true}
      width="100%"
      height="100%"
      data-testid="youtube-player"
    />
  );
};
