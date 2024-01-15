import WeatherInfo from "@/components/weather-components/weather-info";
import useAuthValidation from "@/hooks/useAuthValidatation";


const WeatherPage = () => {

  useAuthValidation();

  return (
    <div>
      <WeatherInfo />
    </div>
  )
};

export default WeatherPage;