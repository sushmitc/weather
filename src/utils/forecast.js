const request = require('request')

const forecast = (latitude , longitude , callback) => {
  const url = 'https://api.darksky.net/forecast/fbf52d0dd1ccead38cb80c212e1c4e7d/' + latitude + ',' +  longitude + '?units=si'

  request({url: url , json: true},(error,response) => {

    if(error){
        callback('error', undefined)
    }else if(response.body.error){
        callback('error' , undefined)
    }else{
        callback(undefined, response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' outside. ' + 'There is ' + response.body.currently.precipProbability + '% chance of rain')
    }
  })
}

module.exports = forecast
