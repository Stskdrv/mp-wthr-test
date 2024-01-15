'use client'


import UserDataModal from "@/components/modals/user-data-modal";
import { useEffect, useState } from "react";

 const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) null; // I've added this to prevent hydration errors in React

    return (
        <>
            <UserDataModal />
        </>
    );
}; 

export default ModalProvider;