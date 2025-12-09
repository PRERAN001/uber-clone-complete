const axios = require('axios');

module.exports.getlatandlon=async(location)=>{
    const url=`https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${process.env.lonandlatapi}&q=${location}`
    const response=await axios.get(url)
    return {latitude:response.data.coord.lat,longitude:response.data.coord.lon}   
}
module.exports.getnearbyplaces=async(query)=>{
    const url=`https://api.maptiler.com/geocoding/${encodeURIComponent(query)}.json?key=${process.env.geoapifyapi}&limit=5&autocomplete=true`
    const response = await axios.get(url);
    return response.data
}
module.exports.getcurrentlocation=()=>{
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                });
            },
            (error) => {
                reject(error);
            }
        );
    });
}