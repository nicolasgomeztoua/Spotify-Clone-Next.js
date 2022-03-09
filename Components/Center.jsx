import { ChevronDownIcon } from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState, playlistAtom } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";
import Songs from "./Songs";
const colors = [
  "from-pink-500",
  "from-blue-500",
  "from-indigo-500",
  "from-green-500",
  "from-yellow-500",
  "from-purple-500",
  "from-red-500",
];

const Center = () => {
  const { data: session } = useSession();
  const [randomNum, setRandomNum] = useState();
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistAtom);
  const spotify = useSpotify();

  useEffect(() => {
    setRandomNum(Math.floor(Math.random() * (6 - 0 + 1) + 0));
    return;
  }, [playlistId]);

  useEffect(() => {
    spotify
      .getPlaylist(playlistId)
      .then((data) => setPlaylist(data.body))
      .catch((err) => console.log("Error:", err));
    return;
  }, [spotify, playlistId]);
  console.log(playlist);
  return (
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-8">
        <div
          className="text-white flex items-center  bg-black space-x-3 opacity-90 hoveropacity-80 cursor-pointer rounded-full p-1 pr-2"
          onClick={signOut}
        >
          <img
            className="rounded-full w-10 h-10"
            src={session?.user.image}
            alt=""
          />
          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>
      <section
        className={` flex items-end space-x-7 bg-gradient-to-b to-black ${colors[randomNum]} h-80 text-white p-8`}
      >
        <img
          className="h-44 w-44 shadow-2xl"
          src={playlist?.images?.[0]?.url}
          alt="album cover"
        />
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl md-text-3xl xl-text-5xl font-bold ">
            {playlist?.name}
          </h1>
        </div>
      </section>
      <div>
        <Songs></Songs>
      </div>
    </div>
  );
};

export default Center;
