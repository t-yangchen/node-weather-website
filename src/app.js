const path = require('path')
const hbs = require('hbs')
const express = require('express')
const app = express()
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')

//define the paths for Express config
const publicDir = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlebar engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDir))

app.get('/',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        author: 'tashi tps'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About me',
        author:'Tashi TPS'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'HELP',
        description:'this is the help page',
        author:'Tashi TPS'
    })
})

app.get('/weather',(req,res)=>{
    //console.log(req.query.address)
    if(!req.query.address){
        return res.send({
            error: 'you must provide an address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={}) =>{
        if(error){
            return res.send({
                error:error
            })
        }
    
            weather(latitude,longitude, (error,weatherData)=>{
                if(error)
                    return console.log('error',error)
                else{
                    res.send({
                        location: location,
                        forecast : weatherData,
                        address : req.query.address
                })

                }
            
            })
                    
            
    })
    
    
})
app.get('/help/*',(req,res) =>{
    res.render('404',{
        title:'404 page',
        author: 'tashi tps',
        errorMessage: 'help article Not Found'
    })
})
app.get('*',(req,res) =>{
    res.render('404',{
        title:'404 page',
        author: 'tashi tps',
        errorMessage: 'Page Not Found'
    })
})
app.listen(3000,()=>{
    console.log('server is up on port 3000')
})