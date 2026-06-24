import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { locations } from "../constants";

interface LocationStore {
  activeLocation: any;
  history: any[];
  setActiveLocation: (location: any) => void;
  goBack: () => void;
}

const useLocationStore = create<LocationStore>()(
  immer((set) => ({
    activeLocation: locations.work,
    history: [],

    setActiveLocation: (location) =>
      set((state) => {
        // Prevent adding same location to history
        if (state.activeLocation.id !== location.id || state.activeLocation.name !== location.name) {
          state.history.push(state.activeLocation);
        }
        state.activeLocation = location;
      }),

    goBack: () =>
      set((state) => {
        if (state.history.length > 0) {
          state.activeLocation = state.history.pop();
        }
      }),
  }))
);

export default useLocationStore;