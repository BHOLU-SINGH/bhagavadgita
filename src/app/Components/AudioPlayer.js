// src/app/Components/AudioPlayer.js
'use client';

import { useEffect, useState, useMemo } from "react";
import { MdMusicNote, MdMusicOff } from "react-icons/md";

const AudioPlayer = () => {
  const audioFiles = useMemo(() => [ // Wrapped audioFiles in useMemo
    "/audio/Mahabharatainstrumentalmusic.mp3",
    "/audio/KrishnaBackgroundMusic1.mp3",
  ], []);

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [audio, setAudio] = useState(null); // Initialize audio as null
  const [isPlaying, setIsPlaying] = useState(true); // Start with playing

  useEffect(() => {
    if (typeof window !== 'undefined') { // Check if running in the browser
      const newAudio = new Audio(audioFiles[0]);
      setAudio(newAudio);
    }
  }, [audioFiles]);

  useEffect(() => {
    if (!audio) return; // Ensure audio is defined

    audio.src = audioFiles[currentTrackIndex];
    audio.loop = false;
    audio.volume = isPlaying ? 0.6 : 0;

    const handleEnded = () => {
      setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % audioFiles.length);
    };

    audio.addEventListener("ended", handleEnded);

    const playAudio = async () => {
      try {
        await audio.play();
      } catch (error) {
        console.error("Error playing audio:", error);
      }
    };

    playAudio();

    return () => {
      audio.pause();
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentTrackIndex, audio, audioFiles, isPlaying]); // Added isPlaying to dependencies

  const togglePlayback = () => {
    setIsPlaying((prev) => !prev); // Toggle playback state
  };

  return (
    <div>
      <button
        onClick={togglePlayback}
        style={{
          position: "fixed",
          bottom: "20px",
          left: "30px",
          width: "45px",
          height: "45px",
          backgroundColor: "#dd761c",
          color: "white",
          border: "none",
          borderRadius: "50px",
          padding: "10px",
          cursor: "pointer",
          fontSize: "18px",
          zIndex: "1000",
        }}
      >
        {isPlaying ? <MdMusicOff /> : <MdMusicNote />}
      </button>
      {/* Optional display of current track */}
      {/* <p>Now Playing: {audioFiles[currentTrackIndex]}</p> */}
    </div>
  );
};

export default AudioPlayer;