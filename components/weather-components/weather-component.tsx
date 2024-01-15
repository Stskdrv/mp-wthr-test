'use client';
import React, { useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '../ui/card';
import { Button } from '../ui/button';
import { RefreshCwIcon } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useRouter } from 'next/navigation';

const WeatherComponent = ({weather}: any) => {
    const router = useRouter();

    const [temUnitType, setTempUnitType] = useState('EU');

    const toggleUnits = () =>
        setTempUnitType(temUnitType === 'EU' ? 'US' : 'EU');

    return (
        <div>
            <Card className='w-[80vw]'>
                <CardHeader>
                    <CardTitle className='my-2'>
                        Current weather at {weather.currentDay.details.Location}
                    </CardTitle>
                    <div className='flex justify-between'>
                        <CardDescription>
                            Here you can see curent weather for your locaton.
                        </CardDescription>
                        <Button
                            onClick={() => router.refresh()}
                            title='Udpate location'>
                            <RefreshCwIcon className='w-4 h-4' />
                        </Button>
                    </div>
                    <div className='flex items-center space-x-4 rounded-md border p-4 w-[350px] self-center'>
                        <div className='flex-1 space-y-1'>
                            <p className='text-sm font-medium leading-none'>
                                Switch the unit of temperature:
                            </p>
                            <p className='text-sm text-muted-foreground'>
                                Choose between °C and °F
                            </p>
                        </div>
                        <div className='flex justify-around gap-1'>
                            <p>°C</p>
                            <Switch
                                checked={temUnitType === 'US'}
                                onClick={toggleUnits}
                            />
                            <p>°F</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className='flex justify-between'>
                        {weather.currentDay.weatherData.map((el: any) => (
                            <div
                                key={el.time}
                                className='mb-4 w-[200px] text-center gap-2 self-center bg-slate-200 p-4 rounded-lg'>
                                <div className='space-y-1'>
                                    <p className='text-sm font-medium leading-none'>
                                        {el.time} time
                                    </p>
                                    <p className='text-sm text-muted-foreground'>
                                        🌡️ Temp:{' '}
                                        {temUnitType === 'EU'
                                            ? `${el.temp} °C`
                                            : `${(
                                                  (el.temp * 9) / 5 +
                                                  32
                                              ).toFixed(1)} °F`}
                                    </p>
                                    <p className='text-sm text-muted-foreground'>
                                        💨 Wind: {el.wind} m\h
                                    </p>
                                </div>
                            </div>
                        ))}
                        <div className='mb-4 w-[250px] text-center self-center bg-slate-200 p-4 rounded-lg'>
                            <p>Additional information:</p>
                            <div className='space-y-1'>
                                <p className='text-sm text-muted-foreground'>
                                    📍 Location{' '}
                                    {weather.currentDay.details.Location}
                                </p>
                                <p className='text-sm text-muted-foreground'>
                                    🌄Sunrise time:{' '}
                                    {weather.currentDay.details.Sunrise}
                                </p>
                                <p className='text-sm text-muted-foreground'>
                                    🌇Sunset time:{' '}
                                    {weather.currentDay.details.Sunset}
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default WeatherComponent;
