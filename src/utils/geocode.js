const request = require('request')

const geocode = (address,callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoidGFzaGl0cHMiLCJhIjoiY2tmMTg0a25qMHBybzJ0cGs1a3c0bmc0aCJ9.XfyIKk6f5dXvTO5yxBxkIA&limit=1'
    request({url, json:true},(error,response)=>{
        if(error){
            callback('oops! something went wrong. check your internet connection',undefined)
        }
        else if(response.body.features.length === 0){
            callback('location not found. try another nsearch',undefined)
        }
        else{
            callback(undefined,{
                    latitude: response.body.features[0].center[1],
                    longitude: response.body.features[0].center[0],
                    location:  response.body.features[0].place_name
                })
        }
    })
}

module.exports = geocode