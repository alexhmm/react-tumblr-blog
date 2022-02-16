import create, { State } from 'zustand';

// Models
import { Subtitle } from '../models/shared.types';
import { Theme } from '../models/theme.enum';

export interface SharedState extends State {
  theme: string;
  subtitle: Subtitle | null;
  title: string | undefined;
  setTheme: (theme: string) => void;
  setSubtitle: (subtitle: Subtitle | null) => void;
  setTitle: (title: string) => void;
}

export const useSharedStore = create<SharedState>((set) => ({
  theme: localStorage.getItem('theme') || Theme.Light,
  subtitle: null,
  title: process.env.REACT_APP_TITLE ? process.env.REACT_APP_TITLE : undefined,
  setSubtitle: (subtitle: Subtitle | null) => set({ subtitle }),
  setTitle: (title: string) => set({ title }),
  setTheme: (theme: string) => {
    set({ theme });
    document.documentElement.setAttribute('class', theme);
    localStorage.setItem('theme', theme);
  }
}));

export default useSharedStore;
