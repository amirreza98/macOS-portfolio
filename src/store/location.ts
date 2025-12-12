import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { locations } from "../constants";

// نوع location را از خود locations استخراج می‌کنیم
export type Location = (typeof locations)[keyof typeof locations];

const DEFAULT_LOCATION: Location = locations.work;

interface LocationStore {
  activeLocation: Location;
  setActiveLocation: (location: Location) => void;
  resetActiveLocation: () => void;
}

const useLocationStore = create<LocationStore>()(
  immer((set) => ({
    activeLocation: DEFAULT_LOCATION,

    setActiveLocation: (location: Location) =>
      set((state) => {
        state.activeLocation = location;
      }),

    resetActiveLocation: () =>
      set((state) => {
        state.activeLocation = DEFAULT_LOCATION;
      }),
  }))
);

export default useLocationStore;
