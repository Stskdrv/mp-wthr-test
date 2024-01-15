import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import moment from 'moment';
import { DayWeatherInterface, TimeDictionaryInterface, WeatherInterface } from "@/types/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);


const timeDictionary: TimeDictionaryInterface = {
  Morning: '06:00',
  Day: '12:00',
  Evening: '18:00',
  Night: '23:00'
};

export const prepareWeatherResponse = (response: WeatherInterface) => {
  const currentDayWeather = response.forecast.forecastday![0];
  const currentDayWeatherHourly = response.forecast.forecastday![0].hour;

  const weatherReduce = (dataArr: any[] | null | undefined) => {
    return dataArr!.reduce((acc: any, el: any) => {
      const time = el.time.split(' ')[1];

      for (const timeLabel in timeDictionary) {
        if (timeDictionary[timeLabel as keyof TimeDictionaryInterface] === time) {
          const iconCode = el.condition.icon.match(/(\d+)\.png$/)[1];
          acc.push({
            time: timeLabel as keyof TimeDictionaryInterface,
            temp: el.temp_c,
            icon: iconCode,
            wind: el.wind_kph,
          });
          break;
        }
      }
      return acc;
    }, []);
  };

  const weatherData = weatherReduce(currentDayWeatherHourly)

  const details = {
    Location: response.location.name,
    Sunrise: currentDayWeather.astro.sunrise,
    Sunset: currentDayWeather.astro.sunset,
    Pressure: response.current.pressure_mb,
  };

  const recordData = {
    mintemp: currentDayWeather.day.maxtemp_c,
    maxtemp: currentDayWeather.day.mintemp_c,
    wind: response.current.wind_kph,
  };

  const forecast = response.forecast.forecastday!.reduce((acc, el) => {
    const day: DayWeatherInterface = {
      date: moment(el.date).format("MMM Do"),
      data: weatherReduce(el.hour),
    };

    acc.push(day);
    return acc;
  }, [] as DayWeatherInterface[]);

  forecast.shift();


  return {
    currentDay: {
      weatherData,
      details,
      recordData,
    },
    forecast
  };
};

export const getUserPosition = async () => {
  return await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  }).then((pos: any) => {
    const { latitude: lat, longitude: lng } = pos.coords;
    return { lat, lng };
  });
};

