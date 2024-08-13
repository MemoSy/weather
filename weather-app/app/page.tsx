"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import WeatherCard from "../components/WeatherCard";
import axios from "axios";

export default function Home() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async (lat: any, lon: any) => {
      const options = {
        method: "GET",
        url: `https://open-weather13.p.rapidapi.com/city/latlon/${lat}/${lon}`,
        headers: {
          "x-rapidapi-key":
            "aae53c1e09mshfc5e10995d46484p13a71ajsn4b72b17035ee",
          "x-rapidapi-host": "open-weather13.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        const data = response.data;
        console.log(data);

        const currentDate = new Date();
        const formattedData = {
          city: data.name,
          date: currentDate.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          temperature: Math.round(data.main.temp - 273.15), // Convert Kelvin to Celsius
          condition: data.weather[0].main,
          hourlyForecast: generateMockHourlyForecast(data.main.temp),
          dailyForecast: generateMockDailyForecast(data.main.temp),
        };
        // @ts-ignore
        setWeatherData(formattedData);
        setLoading(false);
      } catch (error) {
        console.error(error);
        // @ts-ignore
        setError("Failed to fetch weather data. Please try again.");
        setLoading(false);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherData(position.coords.latitude, position.coords.longitude);
        },
        (err) => {
          setError(
            // @ts-ignore
            "Failed to get your location. Please allow location access and refresh the page."
          );
          setLoading(false);
        }
      );
    } else {
      // @ts-ignore
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
    }
  }, []);

  // Helper function to generate mock hourly forecast
  const generateMockHourlyForecast = (baseTemp: any) => {
    const hours = ["Now", "1 PM", "2 PM", "3 PM", "4 PM"];
    return hours.map((hour, index) => ({
      time: hour,
      temperature: Math.round(baseTemp - 273.15 + (Math.random() * 2 - 1)),
      condition: ["Clear", "Clouds", "Rain"][Math.floor(Math.random() * 3)],
    }));
  };

  // Helper function to generate mock daily forecast
  const generateMockDailyForecast = (baseTemp: any) => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
    return days.map((day, index) => ({
      date: day,
      tempMax: Math.round(baseTemp - 273.15 + Math.random() * 5),
      tempMin: Math.round(baseTemp - 273.15 - Math.random() * 5),
      condition: ["Clear", "Clouds", "Rain"][Math.floor(Math.random() * 3)],
    }));
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
      <Head>
        <title>Weather App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="p-4">
        {weatherData && (
          <WeatherCard
            // @ts-ignore
            city={weatherData.city}
            // @ts-ignore
            date={weatherData.date}
            // @ts-ignore
            temperature={weatherData.temperature}
            // @ts-ignore
            condition={weatherData.condition}
            // @ts-ignore
            hourlyForecast={weatherData.hourlyForecast}
            // @ts-ignore
            dailyForecast={weatherData.dailyForecast}
          />
        )}
      </main>
    </div>
  );
}
