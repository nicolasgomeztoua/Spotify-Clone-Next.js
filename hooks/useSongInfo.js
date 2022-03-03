
import { useRecoilState } from "recoil";
import useSpotify from "./useSpotify";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import { useEffect, useState } from "react";

function useSongInfo() {
  const spotify = useSpotify();
  const [currentIdTrack, setCurrentTrackId] = useRecoilState(
    currentTrackIdState
  );
  const [songInfo, setSongInfo] = useState(null);

  useEffect(() => {
    const fetchSongInfo = async () => {
      if (currentIdTrack) {
        const trackInfo = await fetch(
          `https://api.spotify.com/v1/traks/${currentIdTrack}`,
          {
            headers: {
              Authorization: `Bearer ${spotify.getAccessToken()}`,
            },
          }
        ).then((data) => {
          data.json();
        });
        setSongInfo(trackInfo);
      }
    };
    fetchSongInfo();
  }, []);

  return songInfo;
}

export default useSongInfo;
