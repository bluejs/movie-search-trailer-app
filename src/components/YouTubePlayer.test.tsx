import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import { YouTubePlayer } from './YouTubePlayer';

describe('YouTubePlayer', () => {
  test('renders YouTube player with correct URL', () => {
    const videoKey = 'dQw4w9WgXcQ';
    render(<YouTubePlayer videoKey={videoKey} />);

    const player = screen.getByTestId('youtube-player');
    expect(player).toBeInTheDocument();
    waitFor(() =>
      expect(player).toHaveAttribute(
        'src',
        `https://www.youtube.com/watch?v=${videoKey}`,
      ),
    );
  });

  test('renders controls and plays video', () => {
    const videoKey = 'dQw4w9WgXcQ';
    render(<YouTubePlayer videoKey={videoKey} />);

    const player = screen.getByTestId('youtube-player');
    waitFor(() => expect(player).toHaveAttribute('controls', 'true'));
    waitFor(() => expect(player).toHaveAttribute('playing', 'true'));
  });

  test('sets player dimensions to 100%', () => {
    const videoKey = 'dQw4w9WgXcQ';
    render(<YouTubePlayer videoKey={videoKey} />);

    const player = screen.getByTestId('youtube-player');
    expect(player).toHaveStyle('width: 100%');
    expect(player).toHaveStyle('height: 100%');
  });
});
