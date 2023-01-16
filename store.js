import { createRef } from "react";
import create from "zustand";
import { getDefaultSpeedFact } from "./utils/time-date-functions";

export const useStore = create((set) => ({
    posRef: createRef(),
    run: false,
    speedFact: getDefaultSpeedFact(),
    orbits: true,
    orbitsLinewidth: 1,
    arrows: false,
    arrowScale: 1
}));
