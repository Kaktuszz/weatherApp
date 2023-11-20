const GEO_CALL_API_KEY = import.meta.env.VITE_GEO_CALL_API_KEY;
const default_lat = "49.553516";
const default_lon = "25.594767"

export const geoCall = (city: string) => {
  let api = "";
  if (city) {
    api = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${GEO_CALL_API_KEY}`;
  }
  return async () => {
    try {
      const response = await fetch(api);
      if (!response.ok) {
        throw new Error("Network Error");
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error fetching coords", error);
    }
  };
};

export const reverseGeoCall = (lat: number | null, lon: number | null) => {
  let api = `https://api.openweathermap.org/geo/1.0/reverse?lat=&lon=&limit=1&appid=`;
  if (lat && lon) {
    api = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${GEO_CALL_API_KEY}`;
  }else if(lat === null || lon === null){
    api = `https://api.openweathermap.org/geo/1.0/reverse?lat=${default_lat}&lon=${default_lon}&limit=1&appid=${GEO_CALL_API_KEY}`
  }
  return async () => {
    try {
      const response = await fetch(api);
      if (!response.ok) {
        throw new Error("Network Error");
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error fetching city");
    }
  };
};

export const weatherCall = (lat: number | null, lon: number | null) => {
  let api = "";
  if (lat === null || lon === null) {
    api =  api = `https://api.open-meteo.com/v1/forecast?latitude=${default_lat}&longitude=${default_lon}&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,wind_speed_10m_max&timezone=auto`;
    console.log("Default Location");
  } else {
    api = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,wind_speed_10m_max&timezone=auto`;
    console.log("Geolocation");
  }

  return async () => {
    try {
      const response = await fetch(api);
      if (!response.ok) {
        throw new Error("Network Error");
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };
};
