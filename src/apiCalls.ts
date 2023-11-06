export const weatherCall =(lat: number | null, lon: number | null)=>{
    const defaultLatLon = "latitude=50.04&longitude=19.94"
    let api = ""
    if(lat === null || lon === null){
        api = `https://api.open-meteo.com/v1/forecast?${defaultLatLon}&hourly=temperature_2m,weather_code,cloud_cover,wind_speed_80m`;
    }else{
        api = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,weather_code,cloud_cover,wind_speed_80m`;
    }

    return async()=>{
        try{
            const response = await fetch(api);
            if(!response.ok){
                throw new Error('Network Error')
            }
            const result = await response.json();
            return(result);
        } catch (error){
            console.error('Error fetching data', error);
        }
    }

    
}