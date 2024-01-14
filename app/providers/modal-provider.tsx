'use client'

import HistoryModal from "@/components/modals/history-modal";
import { useEffect, useState } from "react";

 const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) null; // I've added this to prevent hydration errors in React

    return (
        <>
            <HistoryModal />
        </>
    );
}; 

export default ModalProvider;