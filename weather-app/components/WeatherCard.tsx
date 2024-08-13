import React from 'react';
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiDayThunderstorm, WiDust } from 'react-icons/wi';

const WeatherCard = ({ city, date, temperature, condition, hourlyForecast, dailyForecast }) => {
  const getWeatherIcon = (condition, size = "text-4xl") => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return <WiDaySunny className={size} />;
      case 'clouds':
        return <WiCloudy className={size} />;
      case 'rain':
        return <WiRain className={size} />;
      case 'snow':
        return <WiSnow className={size} />;
      case 'thunderstorm':
        return <WiDayThunderstorm className={size} />;
      default:
        return <WiDust className={size} />;
    }
  };

  return (
    <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-lg text-white max-w-lg w-full mx-auto">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-3xl font-bold">{city}</h2>
            <p className="text-sm">{date}</p>
          </div>
          <div className="text-5xl font-bold">{temperature}°C</div>
        </div>
        <div className="flex items-center mb-6">
          {getWeatherIcon(condition, "text-5xl")}
          <span className="ml-2 text-2xl">{condition}</span>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Hourly Forecast</h3>
          <div className="flex justify-between">
            {hourlyForecast.map((hour, index) => (
              <div key={index} className="text-center">
                <p className="text-sm">{hour.time}</p>
                <div className="my-1">{getWeatherIcon(hour.condition, "text-2xl")}</div>
                <p className="text-sm font-semibold">{hour.temperature}°C</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white border-opacity-20 p-6">
        <h3 className="text-xl font-semibold mb-2">5-Day Forecast</h3>
        <div className="grid grid-cols-5 gap-2">
          {dailyForecast.map((day, index) => (
            <div key={index} className="text-center">
              <p className="text-sm">{day.date}</p>
              <div className="my-1">{getWeatherIcon(day.condition, "text-2xl")}</div>
              <p className="text-xs">{day.tempMax}°/{day.tempMin}°</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;