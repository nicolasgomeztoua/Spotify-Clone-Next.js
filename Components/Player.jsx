import { useSession } from "next-auth/react";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSpotify from "../hooks/useSpotify";
import useSongInfo from "../hooks/useSongInfo";
import { useRecoilState } from "recoil";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { SwitchHorizontalIcon } from "@heroicons/react/outline";
import {
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  ReplyIcon,
  RewindIcon,
  VolumeOffIcon,
  VolumeUpIcon,
} from "@heroicons/react/solid";
const Player = () => {
  const spotify = useSpotify();
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentTrackId] = useRecoilState(
    currentTrackIdState
  );
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const songInfo = useSongInfo();

  const [volume, setVolume] = useState(50);
  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotify.getMyCurrentPlayingTrack().then((data) => {
        setCurrentTrackId(data.body?.item?.id);
        spotify.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data.body?.is_playing);
        });
      });
    }
  };

  useEffect(() => {
    if (spotify.getAccessToken() && !currentTrackId) {
      fetchCurrentSong();
      setVolume(50);
    }
  }, [currentTrackIdState, spotify, session]);

  const handlePlayPause = () => {
    spotify.getMyCurrentPlaybackState().then((data) => {
      if (data.body.is_playing) {
        spotify.pause();
        setIsPlaying(false);
      } else {
        spotify.play();
        setIsPlaying(true);
      }
    });
  };

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debouncedAdjustControls(volume);
    }
  }, [volume]);

  const debouncedAdjustControls = useCallback(
    debounce((volume) => {
      spotify.setVolume(volume);
    }, 500),
    []
  );

  return (
    <div className="sticky bottom-0">
      <div className="h-24 bg-gradient-to-b from-black to-gray-500 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8 ">
        {/* left */}
        <div className="flex items-center space-x-4">
          <img
            className="hidden md:inline h-10 w-10"
            src={songInfo?.album.images?.[0].url}
            alt="song"
          />

          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists?.[0]?.name}</p>
        </div>
        <div className="flex items-center justify-evenly">
          <SwitchHorizontalIcon className="button" />
          <RewindIcon className="button" />

          {isPlaying ? (
            <PauseIcon onClick={handlePlayPause} className="button w-10 h-10" />
          ) : (
            <PlayIcon onClick={handlePlayPause} className="button w-10 h-10" />
          )}
          <FastForwardIcon className="button" />
          <ReplyIcon className="button" />
        </div>
        <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
          <VolumeOffIcon
            onClick={() =>
              volume >= 10 ? setVolume(volume - 10) : setVolume(0)
            }
            className="button"
          />
          <input
            type="range"
            value={volume}
            min={0}
            max={100}
            onChange={(e) => {
              setVolume(Number(e.target.value));
            }}
          />
          <VolumeUpIcon
            onClick={() =>
              volume <= 90 ? setVolume(volume + 10) : setVolume(100)
            }
            className="button"
          />
        </div>
      </div>
    </div>
  );
};

export default Player;
