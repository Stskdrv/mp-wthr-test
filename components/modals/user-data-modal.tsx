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
            title='Detailed Profile Information'
            description="Here you can check or update your personal info"
            isOpen={isOpen}
            onClose={onClose}
        >
            Personal modal
        </Modal>
    )
};

export default HistoryModal;