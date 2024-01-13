'use client'

import { Button } from "@/components/ui/button";

export default function Home() {
    return (
        <div className="flex justify-center m-[30vh]">
            <Button onClick={() => alert('LETs GO')}> Lets start test exercise </Button>
        </div>

    )
}
