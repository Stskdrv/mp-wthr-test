import { create } from "zustand";


interface useHistoryModalStoreInterface {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useHistoryModal = create<useHistoryModalStoreInterface>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
}));

export default useHistoryModal;