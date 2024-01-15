import { useState } from "react";

import { Loader } from '@googlemaps/js-api-loader';
import { postHistory } from "@/lib/actions/history.actions";
import toast from "react-hot-toast";
import { InitMapComponentPropsInterface } from "@/types/types";

export const useInitMap = ({
    mapRef,
    searchInputRef,
    getMarkerTitle,
    getWeatherData,
    userId,

}: InitMapComponentPropsInterface | any) => {

    const [currentLocation, setCurrentLoacation] = useState<string>('');
    const [weather, setWeather] = useState<any>(null);

    const initMap = async () => {
        const loader = new Loader({
            apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
            version: 'weekly',
            libraries: ['places'],
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

            // Update the map and marker with the selected location
            map.setCenter(selectedPlace.geometry.location!);
            marker.setPosition(selectedPlace.geometry.location);
            marker.setTitle(searchInputRef.current!.value);

            const weatherData = await getWeatherData({
                lat: String(selectedPlace.geometry.location?.lat()),
                lng: String(selectedPlace.geometry.location?.lng())
            });
            setWeather(weatherData);
            await postHistory({ data: selectedPlaceLocationData, userId });
        });
    }

    return {
        initMap,
        currentLocation,
        weather,
    };
}

export default useInitMap;