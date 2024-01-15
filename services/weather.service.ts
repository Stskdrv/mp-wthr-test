import axios from "axios";
import { WEATHER_BASE_URL } from "@/lib/constants";
import { prepareWeatherResponse } from "@/lib/utils";


export const getWeather = async ({ lat, lng, city }: { lat?: string, lng?: string, city?: string }) => {
    const url = `${WEATHER_BASE_URL}?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${lat ? + lat + ',' : ''}${lng || ''}${city || ''}&days=2`;

    const response = (await axios.get(url)).data;
    const formattedResponse = prepareWeatherResponse(response);
    console.log(formattedResponse);


    return formattedResponse;
};