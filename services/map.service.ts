import axios from 'axios';
import { GOOGLE_GEOCODE_URL } from "@/lib/constants";

export const getMarkerTitle =  async ({lat, lng} : {lat: string, lng: string}) => {
    const url = `${GOOGLE_GEOCODE_URL}latlng=${lat},${lng}&sensor=true&key=${process.env.NEXT_PUBLIC_MAPS_API_KEY}`;

    const response = (await axios.get(url)).data;

    return response['plus_code']['compound_code'];
};