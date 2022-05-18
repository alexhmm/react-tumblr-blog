import create, { State } from 'zustand';

// Models
import { PageTitle } from '../models/shared.types';
import { Theme } from '../models/theme.enum';

export interface SharedState extends State {
  pageTitle: PageTitle | null;
  search: boolean;
  theme: string;
  title: string | undefined;
  touchId: string | undefined;
  setPageTitle: (pageTitle: PageTitle | null) => void;
  setSearch: (search: boolean) => void;
  setTheme: (theme: string) => void;
  setTitle: (title: string) => void;
  setTouchId: (touch_id: string | undefined) => void;
}

export const useSharedStore = create<SharedState>((set) => ({
  pageTitle: null,
  search: false,
  theme: localStorage.getItem('theme') || Theme.Light,
  title: process.env.REACT_APP_TITLE ?? undefined,
  touchId: undefined,
  setPageTitle: (pageTitle: PageTitle | null) => set({ pageTitle }),
  setSearch: (search: boolean) => set({ search }),
  setTitle: (title: string) => set({ title }),
  setTheme: (theme: string) => {
    set({ theme });
    document.documentElement.setAttribute('class', theme);
    localStorage.setItem('theme', theme);
  },
  setTouchId: (touchId: string | undefined) => set({ touchId }),
}));
