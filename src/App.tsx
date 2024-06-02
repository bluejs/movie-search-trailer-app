import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import 'reactjs-popup/dist/index.css';
import './app.scss';
import { Header } from './components/Header';
import { Modal } from './components/Modal';
import { YouTubePlayer } from './components/YouTubePlayer';
import { RootState, useAppDispatch } from './data/store';
import { clearTrailer } from './data/trailerSlice';
import { useModal } from './hooks';
import { Movies } from './pages/Movies';
import { Starred } from './pages/Starred';
import { WatchLater } from './pages/WatchLater';
import { TrailerState } from './types';

const App = () => {
  const dispatch = useAppDispatch();
  const trailerState = useSelector((state: RootState) => state.trailer.state);
  const videoKey = useSelector((state: RootState) => state.trailer.videoKey);
  const trailerModal = useModal();

  const closeTrailerHandler = () => {
    dispatch(clearTrailer());
  };

  useEffect(() => {
    if (trailerState !== TrailerState.Idle) {
      trailerModal.openModal();
    } else {
      trailerModal.closeModal();
    }
  }, [trailerModal, trailerState]);

  return (
    <div className="App">
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/starred" element={<Starred />} />
          <Route path="/watch-later" element={<WatchLater />} />
          <Route
            path="*"
            element={<h1 className="not-found">Page Not Found</h1>}
          />
        </Routes>
      </div>

      <Modal {...trailerModal.props} onClose={closeTrailerHandler}>
        {trailerState === TrailerState.Loading ? (
          <h6>Loading...</h6>
        ) : trailerState === TrailerState.Error || !videoKey ? (
          <h6>No trailer available. Try another movie</h6>
        ) : (
          <YouTubePlayer videoKey={videoKey} />
        )}
      </Modal>
    </div>
  );
};

export default App;
