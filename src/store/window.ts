import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "../constants/index.ts";


export interface WindowData {
  id?: number | string;
  name?: string;
  icon?: string;
  kind?: string;
  fileType?: string;
  imageUrl?: string;
  href?: string;
  description?: string[];
  [key: string]: any;
}

export interface WindowItem {
  isOpen: boolean;
  zIndex: number;
  data: WindowData | null;
}

export type WindowKey = keyof typeof WINDOW_CONFIG;

export interface WindowStore {
  windows: Record<WindowKey, WindowItem>;
  nextIndex: number;

  openWindow: (key: WindowKey, data?: WindowData | null) => void;
  closeWindow: (key: WindowKey) => void;
  focusWindow: (key: WindowKey) => void;
}

// ===== STORE ===== //

const useWindowStore = create<WindowStore>()(
  immer((set) => ({
    windows: WINDOW_CONFIG,
    nextIndex: INITIAL_Z_INDEX + 1,

    openWindow: (windowKey, data = null) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;

        const maxZ = Math.max(
          ...Object.values(state.windows).map((w) => w.zIndex)
        );

        win.isOpen = true;
        win.zIndex = maxZ + 1;
        win.data = data ?? win.data;

        state.nextIndex = win.zIndex + 1;
      }),

    closeWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;

        win.isOpen = false;
        win.zIndex = INITIAL_Z_INDEX;
        win.data = null;
      }),

    focusWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;

        const maxZ = Math.max(
          ...Object.values(state.windows).map((w) => w.zIndex)
        );

        win.zIndex = maxZ + 1;
        state.nextIndex = win.zIndex + 1;
      }),
  }))
);

export default useWindowStore;
