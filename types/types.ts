export interface UserInterface {
    _id: string;
    firstname: string;
    lastname: string;
    address: string;
    email: string;
    history: HistoryInterface[];
    tel: string;
    onboarded: boolean;
}


export interface UserResponseInterface extends Omit<UserInterface, 'history' | 'onboarded'> {
    id: string;
}


export interface HistoryInterface {
    user: UserInterface;
    query: string;
    createdAt: Date;
}

export interface WeatherInterface {
    location: Location;
    current: Current;
    forecast: Forecast;
}
export interface Location {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
}
export interface Current {
    last_updated_epoch: number;
    temp_c: number;
    is_day: number;
    condition: Condition;
    wind_kph: number;
    pressure_mb: number;
    precip_mm: number;
    precip_in: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
    vis_km: number;
    vis_miles: number;
    uv: number;
    gust_mph: number;
    gust_kph: number;
}
export interface Condition {
    text: string;
    icon: string;
    code: number;
}
export interface Forecast {
    forecastday?: (ForecastdayEntity)[] | null;
}
export interface ForecastdayEntity {
    date: string;
    date_epoch: number;
    day: Day;
    astro: Astro;
    hour?: (HourEntity)[] | null;
}
export interface Day {
    maxtemp_c: number;
    maxtemp_f: number;
    mintemp_c: number;
    mintemp_f: number;
    avgtemp_c: number;
    avgtemp_f: number;
    maxwind_mph: number;
    maxwind_kph: number;
    totalprecip_mm: number;
    totalprecip_in: number;
    totalsnow_cm: number;
    avgvis_km: number;
    avgvis_miles: number;
    avghumidity: number;
    daily_will_it_rain: number;
    daily_chance_of_rain: number;
    daily_will_it_snow: number;
    daily_chance_of_snow: number;
    condition: Condition;
    uv: number;
}
export interface Astro {
    sunrise: string;
    sunset: string;
}
export interface HourEntity {
    time_epoch: number;
    time: string;
    temp_c: number;
    is_day: number;
    condition: Condition;
    wind_kph: number;
    pressure_mb: number;
    pressure_in: number;
    precip_mm: number;
    precip_in: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
    windchill_c: number;
    windchill_f: number;
    heatindex_c: number;
    heatindex_f: number;
    dewpoint_c: number;
    dewpoint_f: number;
    will_it_rain: number;
    chance_of_rain: number;
    will_it_snow: number;
    chance_of_snow: number;
    vis_km: number;
    vis_miles: number;
    gust_mph: number;
    gust_kph: number;
    uv: number;
}
