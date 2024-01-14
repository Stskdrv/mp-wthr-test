'use client'

import useHistoryModal from "@/hooks/useHistoryModal";
import Modal from "../ui/modal";

const HistoryModal = () => {
    const {
        isOpen,
        onClose,
    } = useHistoryModal();
    return (
        <Modal 
            title='Search history'
            description="Here you can navigate throught your past search queries"
            isOpen={isOpen}
            onClose={onClose}
        >
            History modal
        </Modal>
    )
};

export default HistoryModal;