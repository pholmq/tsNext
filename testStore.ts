import create from "zustand";

interface LoginState {
  name: string;
  setName: (name: string) => void;
  phoneNumber: string;
  setPhoneNumber: (phoneNumber: string) => void;
  address: string;
  setAddress: (address: string) => void;
  hobbies: string[];
  setHobbies: (hobbies: string[]) => void;
}

const useStore = create<LoginState>((set) => ({
  name: "",
  setName: (name) =>
    set((state) => ({
      ...state,
      name
    })),

  phoneNumber: "",
  setPhoneNumber: (phoneNumber) =>
    set((state) => ({
      ...state,
      phoneNumber
    })),

  address: "",
  setAddress: (address) =>
    set((state) => ({
      ...state,
      address
    })),

  hobbies: [],
  setHobbies: (hobbies) =>
    set((state) => ({
      ...state,
      hobbies
    }))
}));

export default useStore;
