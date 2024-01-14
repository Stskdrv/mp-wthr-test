'use client'

import useUserDataModal from "@/hooks/useUserDataModal";
import { useEffect } from "react";

const RootPage = () => {
    const { onOpen: onUserDataOpen, isOpen } = useUserDataModal();


    useEffect(() => {
        if (!isOpen) onUserDataOpen();
    }, [onUserDataOpen, isOpen]);

    return (
        null
    )
};


export default RootPage;
