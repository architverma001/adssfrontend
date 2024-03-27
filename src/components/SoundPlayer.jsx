import React, { useEffect } from 'react';
import axios from 'axios';

const SoundPlayer = ({ flag }) => {
  useEffect(() => {
    const audio = new Audio('/buzzing-sound.mp3');

    const playAudio = () => {
      audio.play().catch(error => {
        // Autoplay was prevented, log the error
        console.error('Autoplay prevented: ', error);
      });
    };

    if (flag) {
      playAudio();
    }

    return () => {
      // Cleanup: pause and remove event listeners when component unmounts
      audio.pause();
      audio.currentTime = 0;
    };
  }, [flag]);

  return null;
};

export default SoundPlayer;
