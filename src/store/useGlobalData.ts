import { ReactNode } from "react";
import { create } from "zustand";

type User = {
  id: string;
  name: string;
};

type Channel = {
  id: string;
  name: string;
};

type Hooks = {
  user?: (data: User) => ReactNode;
  channel?: (data: Channel) => ReactNode;
  atChannel?: () => ReactNode;
  atEveryone?: () => ReactNode;
  atHere?: () => ReactNode;
  usergroup?: (id: string) => ReactNode;
  emoji?: (emoji_text: string) => ReactNode;
  date?: (data: {
    timestamp: string;
    format: string;
    link?: string | undefined;
    fallback: string;
  }) => ReactNode;
};

type Data = {
  users: User[];
  channels: Channel[];
  user_groups: Channel[];
  hooks: Hooks;
  setUsers: (users: User[]) => void;
  setChannels: (channels: Channel[]) => void;
  setHooks: (hooks: Hooks) => void;
};

export type GlobalStore = Data;

const useBearStore = create<Data>((set) => ({
  users: [],
  channels: [],
  user_groups: [],
  hooks: {},
  setUsers: (users) => set({ users }),
  setChannels: (channels) => set({ channels }),
  setHooks: (hooks) => set({ hooks }),
}));

export const useGlobalData = () => {
  const { users, channels, user_groups, hooks, setChannels, setUsers, setHooks } = useBearStore();

  return {
    users,
    channels,
    user_groups,
    hooks,
    setChannels,
    setUsers,
    setHooks,
  };
};
