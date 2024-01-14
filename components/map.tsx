'use client';

import { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const  Map = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
        version: 'weekly',
      });

      const userPosition = await new Promise<Position>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      }).then((pos) => {
        const { latitude: lat, longitude: long } = pos.coords;
        return { lat, long };
      });

      const { Map } = await loader.importLibrary('maps');

      const { Marker } = await loader.importLibrary('marker') as google.maps.MarkerLibrary;

      const position = {
        lat: userPosition.lat,
        lng: userPosition.long,
      };

      console.log(position, 'position');
      

      const mapOptions: google.maps.MapOptions = {
        center: {
          lat: position.lat,
          lng: position.lng,
        },
        zoom: 17,
        mapId: 'MY_TEST_ID',
      };

      const map = new Map(mapRef.current as HTMLDivElement, mapOptions);

      const marker = new Marker({
        map,
        position,
      })
    };

    initMap();
  }, []);

  return <div className="h-[600px]" ref={mapRef} />;
}

export default Map;