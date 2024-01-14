'use client'

import Modal from "@/components/ui/modal";
import useUserDataModal from '@/hooks/useUserDataModal';
import useUserId from '@/hooks/useUserData';
import UserForm from "../user-form";
import useUserData from "@/hooks/useUserData";


const UserDataModal = () => {

    const {
        isOpen,
        onClose,
    } = useUserDataModal();

    return (
        <Modal
            title='Detailed Profile Information'
            description="Here you can check or update your personal info"
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="space-y-4 py-2 pb-4">
                <UserForm />
            </div>
        </Modal>
    )
};

export default UserDataModal;