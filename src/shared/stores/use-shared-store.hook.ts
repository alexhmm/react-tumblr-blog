import create, { State } from 'zustand';

// Models
import { Subtitle } from '../models/shared.types';
import { Theme } from '../models/theme.enum';

export interface SharedState extends State {
  menu: boolean;
  theme: string;
  subtitle: Subtitle | null;
  title: string | undefined;
  setMenu: (menu: boolean) => void;
  setTheme: (theme: string) => void;
  setSubtitle: (subtitle: Subtitle | null) => void;
  setTitle: (title: string) => void;
}

export const useSharedStore = create<SharedState>((set) => ({
  menu: false,
  theme: localStorage.getItem('theme') || Theme.Light,
  subtitle: null,
  title: process.env.REACT_APP_TITLE ?? undefined,
  setMenu: (menu: boolean) => set({ menu }),
  setSubtitle: (subtitle: Subtitle | null) => set({ subtitle }),
  setTitle: (title: string) => set({ title }),
  setTheme: (theme: string) => {
    set({ theme });
    document.documentElement.setAttribute('class', theme);
    localStorage.setItem('theme', theme);
  }
}));
