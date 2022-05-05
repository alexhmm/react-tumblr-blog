import create, { State } from 'zustand';

// Models
import { PageTitle } from '../models/shared.types';
import { Theme } from '../models/theme.enum';

export interface SharedState extends State {
  theme: string;
  pageTitle: PageTitle | null;
  title: string | undefined;
  setTheme: (theme: string) => void;
  setPageTitle: (pageTitle: PageTitle | null) => void;
  setTitle: (title: string) => void;
}

export const useSharedStore = create<SharedState>((set) => ({
  theme: localStorage.getItem('theme') || Theme.Light,
  pageTitle: null,
  title: process.env.REACT_APP_TITLE ?? undefined,
  setPageTitle: (pageTitle: PageTitle | null) => set({ pageTitle }),
  setTitle: (title: string) => set({ title }),
  setTheme: (theme: string) => {
    set({ theme });
    document.documentElement.setAttribute('class', theme);
    localStorage.setItem('theme', theme);
  },
}));
