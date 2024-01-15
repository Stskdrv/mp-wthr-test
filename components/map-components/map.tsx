'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Locate } from 'lucide-react';
import toast from 'react-hot-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import LoaderComponent from '@/components/ui/loader';
import ErrorComponent from '@/components/ui/error-component';
import { getWeather } from '@/services/weather.service';
import WeatherComponent from '@/components/weather-components/weather-component';
import useUserData from '@/hooks/useUserData';
import { fetchUser } from '@/lib/actions/user.actions';
import { getMarkerTitle } from '@/services/map.service';
import { useRouter } from 'next/navigation';
import { LOADING } from '@/lib/constants';
import useInitMap from '@/hooks/useInitMap';


const Map = ({ search, userId }: { search?: boolean, userId: string }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(LOADING.INITIAL);
  const { setUserData } = useUserData();
  const router = useRouter();

  const title = search ? 'Search new places' : 'Live location map';

  const getUserData = useCallback(
    async () => {
      try {
        const userData = await fetchUser(userId);

        setUserData(userData);

      } catch (e) {
        toast('Error fetching user info')
        console.error('Error fetching username!');
      };
    },
    [setUserData, userId],
  );

  const getWeatherData = useCallback(
    async (position: { lat: string, lng: string }) => {
      const data = await getWeather(position);
      return data;
    },
    [],
  );

  const {
    initMap, 
    weather, 
    currentLocation
    } = useInitMap({
      mapRef,
      searchInputRef,
      getWeatherData,
      getMarkerTitle, 
      userId}
  );

  useEffect(() => {
    try {
      getUserData();
      setIsLoading(LOADING.PENDING);
      initMap();
      setIsLoading(LOADING.FULFILLED);
    } catch (e: any) {
      setIsLoading(LOADING.REJECTED);
      throw new Error(e);
    }
  }, []);

  if (isLoading === LOADING.PENDING) return (
    <>
      <LoaderComponent />
      {
        search &&
        <Input
          type="text"
          placeholder="Search for a location"
          ref={searchInputRef}
          className='w-[300px]'
        />
      }
      <div className="h-[600px] rounded-lg shadow-lg" ref={mapRef} />
    </>

  );

  if (isLoading === LOADING.REJECTED) return
  <>
    <ErrorComponent />
    {
      search &&
      <Input
        type="text"
        placeholder="Search for a location"
        ref={searchInputRef}
        className='w-[300px]'
      />
    }
    <div className="h-[600px] rounded-lg shadow-lg" ref={mapRef} />
  </>;

  if (isLoading === LOADING.FULFILLED) return (
    <>
      <Card className='w-[80vw] mb-7'>
        <CardHeader>
          <CardTitle className='my-2'>{title}</CardTitle>
          {!search && <div className='flex justify-between'>
            <CardDescription>📍Your current location: <strong>{currentLocation}</strong></CardDescription>
            <Button onClick={() => router.refresh()} title='Udpate location'>
              <Locate className='w-4 h-4' />
            </Button>
          </div>}
          {
            search &&
            <Input
              type="text"
              placeholder="Search for a location"
              ref={searchInputRef}
              className='w-[300px]'
            />
          }
        </CardHeader>
        <CardContent>
          <div className="h-[600px] rounded-lg shadow-lg" ref={mapRef} />
        </CardContent>
      </Card>
      {
        weather && <WeatherComponent weather={weather} />
      }
    </>
  )
  return (
    <div className='hidden'>
      <div className="h-[600px] rounded-lg shadow-lg" ref={mapRef} />
      <Input
        type="text"
        placeholder="Search for a location"
        ref={searchInputRef}
        className='w-[300px]'
      />
    </div>
  )
};

export default Map;