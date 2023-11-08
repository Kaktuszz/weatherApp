export const geoCall = () => {};

export const weatherCall = (lat: number | null, lon: number | null) => {
  const defaultLatLon = "latitude=49.553516&longitude=25.594767";
  let api = "";
  if (lat === null || lon === null) {
    api = `https://api.open-meteo.com/v1/forecast?${defaultLatLon}&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,wind_speed_10m_max&timezone=auto`;
    console.log("Default Location");
  } else {
    api = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,wind_speed_10m_max&timezone=auto`;
    console.log("Local storage location");
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
