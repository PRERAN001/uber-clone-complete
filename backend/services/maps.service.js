const axios = require('axios');

module.exports.getlatandlon = async (place) => {
  try {
     const url = `https://api.maptiler.com/geocoding/${encodeURIComponent(place)}.json?key=${process.env.maptilerapi}`;

  const response = await axios.get(url);

  const coords = response.data.features[0].center;

  return {
    latitude: coords[1],
    longitude: coords[0]
  };

    } catch {
        return undefined;
  }
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