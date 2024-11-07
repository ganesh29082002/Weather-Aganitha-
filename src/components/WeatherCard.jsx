import weatheer1 from '../assets/weatheer1.jpg'


const WeatherCard = ({ temperature, windspeed, weatherCode }) => {
  
    //here i add  one image only to save time we can change it according to weather
    const getWeatherImage = (code) => {
      switch (code) {
        case 1:
          return weatheer1;
        case 2:
          return weatheer1;
        case 3:
          return weatheer1;
        case 7:
          return weatheer1; 
        case 8:
          return weatheer1;
        default:
          return weatheer1; 
      }
    };
  
    return (
      <div className="mt-4 p-4 bg-gray-50 rounded shadow">
        <h2 className="text-xl font-semibold">Current Weather</h2>
        <div className="flex flex-col items-center justify-between">
          <img 
            src={getWeatherImage(weatherCode)} 
            alt="weather Image" 
            className="w-16 h-16 object-cover"
          />
          <div className="ml-4 p-3">
            <p>Temperature: {temperature}°C</p>
            <p>windspeed: {windspeed}%</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default WeatherCard;
  