const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

// console.log(__dirname)
// console.log(__filename)

const app = express() // express plug-in

const publicDirectory = path.join(__dirname,'../public') 
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine' , 'hbs') // incorporate hbs 
app.set('views' , viewPath)//define path for view
hbs.registerPartials(partialsPath) //register partials


app.use(express.static(publicDirectory)) //setup static directory

app.get('' , (req , res) => {
    res.render('index' , {
        name : 'sushmit' ,
        title : 'football'
    })
})

app.get('/about' , (req , res) => {
    res.render('about' , {
        name : 'andrews' ,
        title : 'football'
    })
})

app.get('/help' , (req , res) => {
    res.render('help' , {
        name : 'andrews' ,
        title : 'football'
    })
})

 app.get('/weather' , (req,res) => {
    
    if(!req.query.address){
        return res.send('plz give the address')
    }

    geocode(req.query.address , (error , data) => {
            
        if(error){
            console.log('error')
            return res.send({error})
        }
        
        console.log(' i am in')

        forecast(data.latitude , data.longitude , (error , forecastData) => {

            if(error){
                return res.send({error})
            }

            console.log('got the temperature')

            res.send({
               forecastData ,
               location:  data.location ,
               address :  req.query.address          
            })
                
        })

    })

    // res.send({ 
    //     name : 'sushmit',
    //     location : 'Chennai'   
    // })
 })

 app.get('*' , (req,res) => {
    res.render('404' , {
        name : 'sushmit',
        location : 'Chennai' ,
        errorMessage : 'error'  
    })
 })

app.listen(3000 , () => {
    console.log('server is up and running')
})