import { useRecoilValue } from "recoil";
import { playlistAtom } from "../atoms/playlistAtom";
import Song from "./Song";
const Songs = () => {
  const playlist = useRecoilValue(playlistAtom);
  return (
    <div className="text-white px-8 flex flex-col space-y-1 pb-28">
      <p>
        {playlist?.tracks.items.map((track, index) => (
          <Song key={track.track.id} track={track} order={index} />
        ))}
      </p>
    </div>
  );
};

export default Songs;
