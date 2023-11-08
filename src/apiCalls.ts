export const geoCall =()=>{
    
}

export const weatherCall =(lat: number | null, lon: number | null)=>{
    const defaultLatLon = "latitude=52.237049&longitude=21.017532"
    // const localGeoloc = localStorage.getItem("geolocation");
    let api = ""
    // if(localGeoloc !== null){
    //     const latLon = JSON.parse(localGeoloc);
    //     const latitude = latLon.latitude
    //     const longitude = latLon.longitude
    //     api = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,weather_code,cloud_cover,wind_speed_80m`;
    // }
    // else
     if(lat === null || lon === null){
        api = `https://api.open-meteo.com/v1/forecast?${defaultLatLon}&hourly=temperature_2m,weather_code,cloud_cover,wind_speed_80m`;
        console.log("Default Location");
    }else{
        api = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,weather_code,cloud_cover,wind_speed_80m`;
        console.log("Local storage location");
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