'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { getMarkerTitle } from '@/services/map.service';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from '../ui/input';
import toast from 'react-hot-toast';
import useUserData from '@/hooks/useUserData';
import { postHistory } from '@/lib/actions/history.actions';
import { fetchUser } from '@/lib/actions/user.actions';
import { Locate } from 'lucide-react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { LOADING } from '@/lib/constants';
import LoaderComponent from '../ui/loader';
import ErrorComponent from '../ui/error-component';
import { getWeather } from '@/services/weather.service';
import WeatherComponent from '../weather-components/weather-component';


const Map = ({ search, userId }: { search?: boolean, userId: string }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(LOADING.INITIAL);
  const [weather, setWeather] = useState<any>(null);

  const [currentLocation, setCurrentLoacation] = useState<string>('');
  const { setUserData } = useUserData();
  const router = useRouter();


  const title = search ? 'Search new places' : 'Live location map';

  const getUserData = useCallback(
    async () => {
      try {
        const userData = await fetchUser(userId);
        console.log(userData, 'userData');

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
      console.log(data);
      return data;
    },
    [],
  );



  useEffect(() => {
    try {
      getUserData();
      setIsLoading(LOADING.PENDING);

      const initMap = async () => {
        const loader = new Loader({
          apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
          version: 'weekly',
          libraries: ['places'], // Include the 'places' library
        });


        const userPosition = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        }).then((pos: any) => {
          const { latitude: lat, longitude: lng } = pos.coords;
          return { lat, lng };
        });


        const { Map } = await loader.importLibrary('maps');

        const { Marker } = await loader.importLibrary('marker') as google.maps.MarkerLibrary;

        const position = {
          lat: userPosition.lat,
          lng: userPosition.lng,
        };
        const mapOptions: google.maps.MapOptions = {
          center: userPosition,
          zoom: 12,
          mapId: 'MY_TEST_ID',
        };

        const map = new Map(mapRef.current as HTMLDivElement, mapOptions);

        const pointLocation = (await getMarkerTitle(userPosition));
        setCurrentLoacation(pointLocation.substring(pointLocation.indexOf(' ')));

        const marker = new Marker({
          map,
          position,
          title: pointLocation,
        });

        // Create a search input and link it to the Places Autocomplete service
        const autocomplete = new google.maps.places.Autocomplete(searchInputRef.current as HTMLInputElement);

        // Add a listener to handle the place selection
        autocomplete.addListener('place_changed', async () => {
          const selectedPlace = autocomplete.getPlace();

          if (!selectedPlace.geometry) {
            console.error('Place selection did not have geometry');
            toast.error('Place selection did not have geometry');
            return;
          };

          const selectedPlaceLocationData = {
            lat: String(selectedPlace.geometry.location?.lat()),
            lng: String(selectedPlace.geometry.location?.lng()),
            searchQuery: searchInputRef.current!.value,
          }
          console.log(selectedPlaceLocationData, 'selectedPlaceLocationData');

          // Update the map and marker with the selected location
          map.setCenter(selectedPlace.geometry.location!);
          marker.setPosition(selectedPlace.geometry.location);
          marker.setTitle(searchInputRef.current!.value);

          const weatherData = await getWeatherData({
            lat: String(selectedPlace.geometry.location?.lat()),
            lng: String(selectedPlace.geometry.location?.lng())
          });
          setWeather(weatherData);
          await postHistory({ data: selectedPlaceLocationData, userId }).then(() => setIsLoading(LOADING.FULFILLED));
        });
      }

      initMap();
      setIsLoading(LOADING.FULFILLED);
    } catch (e: any) {
      setIsLoading(LOADING.REJECTED);
      throw new Error(e);
    }
  }, [weather]);


  console.log(weather, 'weather');

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