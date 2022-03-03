import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { sideBarDataIcons } from "../data/sidebar";
import { playlistIdState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";

const Sidebar = () => {
  const { data: session, status } = useSession();
  const spotify = useSpotify();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

  useEffect(() => {
    if (spotify.getAccessToken()) {
      spotify.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotify]);

  return (
    <div
      className="text-gray-500 p-5 text-small border-r border-gray-900 
    overflow-y-scroll h-screen scrollbar-hide text-xs lg:text-sm sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex pb-36"
    >
      <div className="space-y-4">
        {sideBarDataIcons.map((item, index) => {
          return (
            <div key={item.title}>
              <button className="flex items-center space-x-2 hover:text-white ">
                <item.icon className="h-5 w-5" />
                <p>{item.title}</p>
              </button>

              {(index + 1) % 3 === 0 ? (
                <hr className="border-t-[0.1px] border-gray-900" />
              ) : null}
            </div>
          );
        })}
        {playlists.map((item, index) => {
          return (
            <p
              key={item.id}
              className="cursor-pointer hover:text-white"
              onClick={() => setPlaylistId(item.id)}
            >
              {item.name}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
