const request = require('request')

const weather = (lat,long,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=6fffcc9b10a8273c550608fb54eda400&query='+lat+','+long
    request({url, json:true},(error,{body})=>{
        if(error){
            callback('oops! something went wrong. check your internet connection',undefined)
        }
 
        else{
            callback(undefined,'it is '+body.current.weather_descriptions[0] + '\nit is currently ' + body.current.temperature + ' degrees out there. But it feels like '+ body.current.feelslike)
        }
    })
}

module.exports = weather