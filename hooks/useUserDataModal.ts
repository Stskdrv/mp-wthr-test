import { create } from "zustand";


interface useUserDataStoreInterface {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useUserDataModal = create<useUserDataStoreInterface>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
}));

export default useUserDataModal;