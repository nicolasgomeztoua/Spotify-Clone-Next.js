import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon,
  Wrench,
} from "@heroicons/react/outline";
import { signOut } from "next-auth/react";

export const sideBarDataIcons = [
  {
    title: "Home",
    icon: HomeIcon,
  },
  {
    title: "Search",
    icon: SearchIcon,
  },
  {
    title: "Your Library",
    icon: LibraryIcon,
  },
  {
    title: "Create Playlist",
    icon: PlusCircleIcon,
  },
  {
    title: "Liked Songs",
    icon: HeartIcon,
  },
  {
    title: "Your Episodes",
    icon: RssIcon,
  },
];
