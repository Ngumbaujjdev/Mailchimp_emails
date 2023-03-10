const express=require("express")
//fetch https module
const https=require("https")
//body parser require to get the form
const bodyParser=require("body-parser")

//initialize app
const app=express()
//app to use body parser
app.use(bodyParser.urlencoded({extended:true}))

app.get("/" ,function(req,res){
    res.sendFile(__dirname +"/index.html")
    
})
//receiving data from the form
app.post("/",function(req,res){
    //getting the bodyform
    
    //from html
let myQuery=req.body.cityName
let appId="5374ab36a9447498c8f8e01895fbeaae"
let myUnit="metric"
let url=`https://api.openweathermap.org/data/2.5/weather?q=${myQuery}&appid=${appId}&units=${myUnit}`
https.get(url ,function(response){
    //gettin the error code
    console.log(response.statusCode)
    //printing the data sent back
    response.on("data",function(data){
        //turn data to object
      const weatherData=  JSON.parse(data)
      //accessing the JSON individuals
      const temp=weatherData.main.temp
      const description=weatherData.weather[0].description
      //multiple sends
      res.write(`<p>the weather is currentle ${description}</p>`)
      res.write(`<h1>the temprature in ${myQuery} is ${temp} degree celcius</h1>`)

      res.send()
    })
})


})
//root route

//callback
app.listen(3000,function(){
    console.log("server running on port 3000.")
})