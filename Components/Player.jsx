import { useSession } from "next-auth/react";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSpotify from "../hooks/useSpotify";
import useSongInfo from "../hooks/useSongInfo";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { SwitchHorizontalIcon } from "@heroicons/react/outline";
import {
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  ReplyIcon,
  RewindIcon,
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
        </div>

        <div>
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists?.[0]?.name}</p>
        </div>
        <div className="flex items-center justify-evenly">
          <SwitchHorizontalIcon className="button" />
          <RewindIcon className="button" />

          {isPlaying ? (
            <PauseIcon className="button w-10 h-10" />
          ) : (
            <PlayIcon className="button w-10 h-10" />
          )}
          <FastForwardIcon className="button" />
          <ReplyIcon className="button" />
        </div>
      </div>
    </div>
  );
};

export default Player;
