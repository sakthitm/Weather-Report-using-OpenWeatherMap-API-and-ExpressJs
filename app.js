const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
//  res.send("Server is up and running");

    res.sendFile(__dirname+"/index.html");

});

app.post("/",function(req,res){
    
    const query = req.body.cityName;
    const appKey = "bef968f6cbb8ee1723e56ec01d9b1261";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + appKey + "&units=" + unit;
    https.get(url,function(response){
      console.log(response.statusCode);

      response.on("data",function(data){
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const desc = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const iconUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
        console.log(temp);
        res.write("<p>The weather is "+desc+" in " + query + ".</p>");
        res.write("<h1>The temperature in "+ query + " is "+temp+ " degrees celcius.</h1>");
        res.write("<img src=" + iconUrl + ">");
        res.send();
      });
    });
});





app.listen(3000,function(){
  console.log("Server is running on port 3000");
});
