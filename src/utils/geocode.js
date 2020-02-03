const request = require('request')

const geocode = (address , callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?&access_token=pk.eyJ1Ijoic3VzaC1jIiwiYSI6ImNrNXJ0amcxYTBmZTAzb3AyeHI2cml4MmYifQ._W4lKYwZ4PaUd6gIOgCSBw&limit=1'
    
    request({url : url , json : true} , (error , response) => {
      
      if(error){
        callback('error' , undefined)
    }
    
    else if (response.body.features.length === 0) {
        callback('error' , undefined)
    }
    
    else{
      
      callback(undefined , {

        longitude : response.body.features[0].center[0],
        latitude : response.body.features[0].center[1],
        location : response.body.features[0].place_name
      })
      
    }
  
    })
  
  }
  
  module.exports = geocode
  