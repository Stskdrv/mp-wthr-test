'use client'

import { useCallback, useEffect, useState } from "react";
import { getUserPosition } from "@/lib/utils";
import { getWeather } from "@/services/weather.service";

import LoaderComponent from "@/components/ui/loader";
import ErrorComponent from "@/components/ui/error-component";
import WeatherComponent from "@/components/weather-components/weather-component";
import { LOADING } from "@/lib/constants";


const WeatherInfo = () => {
  const [isLoading, setIsLoading] = useState(LOADING.INITIAL);

  const getWeatherData = useCallback(
    async () => {
      const currentPosition = await getUserPosition();
      const data = await getWeather(currentPosition);

      return data;
    },
    [],
  );

  const [weather, setWeather] = useState<any>(null);


  useEffect(() => {
    setIsLoading(LOADING.PENDING);
    getWeatherData()
      .then(res => setWeather(res))
      .then(() => setIsLoading(LOADING.FULFILLED))
      .catch((e) => {
        setIsLoading(LOADING.REJECTED);
        throw new Error(e);
      })
  }, []);

  if (isLoading === LOADING.PENDING) return <LoaderComponent />;

  if (isLoading === LOADING.REJECTED) return <ErrorComponent />;

  if (isLoading === LOADING.FULFILLED) return <WeatherComponent weather={weather} />;

  return null;
}

export default WeatherInfo;