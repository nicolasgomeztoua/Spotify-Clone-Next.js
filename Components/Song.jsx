import { useRecoilState } from "recoil";
import useSpotify from "../hooks/useSpotify";
import millisToMinutesAndSeconds from "../utils/time";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
const Song = ({ order, track }) => {
  let tracks = track.track;

  const spotify = useSpotify();
  const [currentTrackId, setCurrentTrackId] = useRecoilState(
    currentTrackIdState
  );
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const playSong = () => {
    setCurrentTrackId(tracks.id);
    setIsPlaying(true);
    spotify.play({
      urls: [tracks.uri],
    });
  };
  return (
    <div
      className="grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg cursor-pointer"
      onClick={playSong}
    >
      <div className="flex items-center space-x-4">
        <p>{order + 1}</p>
        <img
          className="h-10 w-10"
          src={tracks.album.images[0].url}
          alt="song album"
        ></img>

        <div>
          <p className="w-36 lg:w-64 truncate text-white">{tracks.name}</p>
          <p className="w-40">{tracks.artists[0].name}</p>
        </div>
      </div>

      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="hidden md:inline w-40"> {tracks.album.name}</p>
        <p>{millisToMinutesAndSeconds(tracks.duration_ms)}</p>
      </div>
    </div>
  );
};

export default Song;
