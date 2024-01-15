import { UserInterface } from "@/types/types";
import { create } from "zustand";


export interface useUserIdStoreInterface extends UserInterface {
    userId: string;
    setUserId: (userId: string) => void;
    setUserData: (userData: UserInterface) => void;
}

const useUserData = create<useUserIdStoreInterface>((set) => ({
    _id: '',
    userId: '',
    firstname: '',
    lastname: '',
    address: '',
    email: '',
    history: [],
    tel: '',
    onboarded: false,
    setUserId: (userId) => set({userId}),
    setUserData: (userData) => set({...userData})
}));

export default useUserData;