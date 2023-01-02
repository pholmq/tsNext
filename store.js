import { createRef } from "react";
import create from "zustand";
import { getDefaultSpeedFact } from "./utils/time-date-functions";

export const useStore = create((set) => ({
    date: " ",
    setDate: (v) => set({ orbits: v }),
    posRef: createRef(),
    run: false,
    toggleRun: (v) => set({ run: v }),
    speedFact: getDefaultSpeedFact(),
    setSpeedFact: (v) => set({ speedFact: v }),
    orbits: true,
    toggleOrbits: (v) => set({ orbits: v }),
    arrows: false,
    toggleArrows: (v) => set({ arrows: v })
}));
