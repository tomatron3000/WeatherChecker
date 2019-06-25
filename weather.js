function getWeather()   {
    var longitude = document.getElementById("longitude").value;
    var latitude = document.getElementById("latitude").value;
    console.log(longitude);
    console.log(latitude);
    alert("Your longitude is: " + longitude + " and your latitude " + latitude + "!!!")
    getWeatherForLocation(latitude, longitude)
}





function getWeatherForLocation(latitude,    longitude)  {
    fetch('https://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid=ebdc14c87675ea153841603a14fe75e3&units=metric&mode=json')
	.then(function(response) {
        return  response.json();

    })
    .then(function(myJson)  {
        console.log(myJson);
        document.getElementById("weatherData").innerHTML=JSON.stringify(myJson);
        populateData(myJson)
    });
}


function  populateData(myJson)  {
    document.getElementById("desc").innerHTML=myJson.weather[0].description;
	document.getElementById("temp").innerHTML=myJson.main.temp  +  'c';
	document.getElementById("pressure").innerHTML=myJson.main.pressure  +  ' millibars';
	document.getElementById("humidity").innerHTML=myJson.main.humidity  +  '%';
	document.getElementById("windy").innerHTML=myJson.wind.speed  +  'mph';
	document.getElementById("cloud").innerHTML=myJson.clouds.all  +  '%';
	document.getElementById("location").innerHTML=myJson.name;
	document.getElementById("sunup").innerHTML=new Date(myJson.sys.sunrise*1000);
	document.getElementById("sundown").innerHTML=new Date(myJson.sys.sunrise*1000);
	document.getElementById("weatherpic").src=setWeatherImage(myJson.weather[0].description);
    // document.getElementById("weatherpic").src=img.src;
    console.log(myJson.weather[0].description)
    
}

function setWeatherImage(weatherType) {
    var img = new Image();

    switch(weatherType) {
        case "broken clouds" : img.src = './images/broken_clouds.png';
        break;
        case "overcast clouds" : img.src = './images/overcast_clouds.png';
        break;
        case "clear sky" : img.src = './images/clear_sky.png';
        break;
        case "rain" : img.src = './images/rain.png';
        break;
        case "few clouds" : img.src ='./images/few_clouds.png';
        break;
        case "scattered clouds" : img.src ='./images/scattered_clouds.png';
        break;
        case "shower rain" : img.src ='./images/shower_rain.png';
        break;
        case "thunderstorm" : img.src ='./images/thunderstorm';
        break;

        default: img.src= './images/clear_sky.png';
    }
    return img.src
}



