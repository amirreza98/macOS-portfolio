import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { RESUME_LOCATION } from "../constants";

// This helps us track which specific file is "open" inside the PDF viewer
interface LocationStore {
  activeLocation: any;
  setActiveLocation: (location: any) => void;
}

const useLocationStore = create<LocationStore>()(
  immer((set) => ({
    // Default to the main Resume object
    activeLocation: RESUME_LOCATION.children[0], 

    setActiveLocation: (location) =>
      set((state) => {
        state.activeLocation = location;
      }),
  }))
);

export default useLocationStore;