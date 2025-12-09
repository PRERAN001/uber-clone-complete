export const getlocation=async()=>{
    return new Promise((res,rej)=>{
        navigator.geolocation.getCurrentPosition(
            (position)=>{
                res({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                })
            },
            (error)=>{
                rej(error)
            }
        )
    })
}