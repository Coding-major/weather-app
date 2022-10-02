const express = require("express");
const bodyParser = require("body-parser")
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended: true}))



app.get("/", function (request, response) {
    response.sendFile(__dirname + "/index.html")
})


app.post("/", function (req, res) {
    const city = req.body.city
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=385b5dd8ba61a219b2ec7ad9597317b5&units=metric`
    https.get(url, function (response) {
        //console.log(response)
        console.log(response.statusCode);

        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            console.log(weatherData)
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const iconPicture = `https://openweathermap.org/img/wn/${icon}@2x.png`;
            
            console.log(temp);
            console.log(`the decription is ${description}`);
            res.write(`<h1>the temperature in ${city} is ${temp} degree celcius</h1>`);
            res.write(`<h2>the weather is currently ${description}</h2>`)
            res.write(`<img src=${iconPicture}>`);
            res.send()



            
            // we can also make an object to be in string format
            // const object = {
            //     name: "mustapha",
            //     school: "BUK",
            //     crush: "machine learning"
            // }
            // const stringChange = JSON.stringify(object);
            // console.log(stringChange);
        })
    })

})








app.listen(4000, function () {
    console.log("server is running on port 4000.")
}) 