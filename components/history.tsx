'use client'

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import moment from "moment";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "./ui/button";
import { RefreshCwIcon } from "lucide-react";


const HistoryComponent = ({ historyData }: any) => {
    const router = useRouter();

    return (
        <Card className='w-[80vw]'>
            <CardHeader>
                <CardTitle className='my-2'>
                    History.
                </CardTitle>
                <div className='flex justify-between'>
                    <CardDescription>
                        Here you can check your latest searches.
                    </CardDescription>
                    <Button onClick={() => router.refresh()} title='Udpate location'>
                        <RefreshCwIcon className='w-4 h-4' />
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className='flex flex-col gap-3 h-[70vh] overflow-auto'>
                    {historyData.map((el: any) => (
                        <div
                            key={el._id}
                            className='
                                mb-4 
                                w-[300px] 
                                min-h-[130px] 
                                text-center 
                                gap-2 
                                self-center 
                                bg-slate-200 
                                p-4 
                                rounded-lg
                            '
                        >
                            <div className='space-y-1'>
                                <p className='text-sm font-medium leading-none'>
                                    Date: {moment(el.createdAt).format('MMM Do YYYY')}
                                </p>
                                <p className='text-sm font-medium'>
                                    📍 Lattitude: {Number(el.data.lat).toFixed(3)}
                                </p>
                                <p className='text-sm font-medium'>
                                    📍 Longitude: {Number(el.data.lng).toFixed(3)}
                                </p>
                                <p className='text-sm font-medium'>
                                    🔍 Search query: {el.data.searchQuery.substring(0, 40)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
};

export default HistoryComponent;