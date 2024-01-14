'use client'

import { Button } from "@/components/ui/button";
import useHistoryModal from "@/hooks/useHistoryModal";


const RootPage = () => {
    const {onOpen} = useHistoryModal();
    return (
        <div className="flex justify-center m-[30vh]">
            <Button onClick={() => onOpen()}> Lets start test exercise </Button>
        </div>

    )
};


export default RootPage;