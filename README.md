# Starting Point

The starting point is an empty HTML file. We are going to build on top of this.

First we need to pull the code down from github. In the Git CMD program switch to the c drive if not already set:-

    c:

Next we are going to pull down the basic site from github.com.

    git config --global http.sslVerify false
    git clone https://github.com/DonFrog/WeatherChecker.git



# First Steps
Add a title so the tab in the browser has a proper name. In the HTML file, in the `<head>` section add a title tag:-

    <title>WeatherChecker v1.0</title>

Next we are going to use the CSS file to control page layout and looks.  First, we will change the background color. Open the map.css file. Add the following to the file:-

    body {  
	    background-color: lightblue;  
    }
Instead of lightblue, go to [https://www.quackit.com/css/css_color_codes.cfm](https://www.quackit.com/css/css_color_codes.cfm) and pick a colour. You can use:-
-   a name like red 
-   a HEX value - like #ff0000
-   an RGB value - like rgb(255,0,0)

Next - add the CSS file to the web page. In the `<head>` section add this tag:-

    <link rel="stylesheet" href="./map.css" />

# Adding a Heading
In the `<body>` section add the following to give us a large heading at the top of the page:-

    <h1>Get the Weather for Anywhere!</h1>
    
This should appear on the left of the page. 

Next, we want to center it on the page - so we will create a little snippet in the map.css file that will force any text using it to be moved to the center:-

    .center  {
	    text-align: center;
    }
We now need to update the `<h1>` tag we created earlier by adding a class property:-

    <h1 class="center">Get the Weather for Anywhere!</h1>

# Gathering Data
## Build a Form

We are going to add two text fields and a button to the page. Below the `<h1>` tag add the following to add some text and an input field for longitude.

    Enter longitude
    <input type="text" name="longitude" id="longitude">
Repeat the above for latitude.
Next add a button we will use to gather data:-

    <button id="submitBtn">Submit</button>

## Add CSS to form
Above "Enter longitude" add a `<div>` tag. 
Below the `<button>` tag add a closing `</div>` tag.
This should look like this:-

    <div>
	    Enter longitude
	    <input type="number" name="longitude" id="longitude" value="-5.9301">
	    Enter Latitude
	    <input type="number" name="latitude" id="latitude" value="54.597">
	    <button id="submitBtn">Submit</button>
    </div>
 Check you can only enter numbers in the fields.
 
Now update the `<div>` to add a class:-

    <div class='weatherForm'>
   
 Go to the map.css file and add the following below `.center`: -

     .weatherForm  {
	    background-color: whitesmoke;
	    border-style: solid;
	    border-color: black;
	    padding: 10px;
	    margin-left: 200px;
		margin-right: 200px;
    }
This will create a black border around the text fields and button, with an off-white background and some spacing (padding) around the fields.

## Add Javascript to Button
In the index.html page we need to use javascript to allow the button to perform an action. The first step is to add a link to the javascript file we will use. 

In the `<head>` section add the following:-

    <script type="text/javascript" src="weather.js" type="text/javascript"></script>
This tells the browser what the file is called, where it resides and the filetype.

Update the button to call javascript when clicked:-

    <button onclick="getWeather()" id="submitBtn">Submit</button>
So when the button is clicked on the webpage a javascript function called `getWeather()` is invoked.

In the weather.js file add the following:-

    function getWeather()  {
    	var longitude = document.getElementById("longitude").value;
    	var latitude = document.getElementById("latitude").value;
    	console.log(longitude);
    	console.log(latitude);
    	alert("Your longitude is: " + longitude + " and your latitude " + latitude + "!!!")
    }
  Now when you click the button, it should display an alert that shows any values added for longitude/latitude.

  ## Use OpenWeather API
We're going to use the free openweather.org api to get the current weather at our location.
Go to [https://home.openweathermap.org/users/sign_up](https://home.openweathermap.org/users/sign_up) and create an account. 
When you have an account go to the API Key page and make a note of the key.

In weather.js add the following code:-

    function  getWeatherForLocation(latitude,  longitude)  {
    	fetch('https://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid=API_KEY_HERE&units=metric&mode=html')
    	.then(function(response)  {
	    	return  response.text();
    	})
    	.then(function(myText)  {
	    	console.log(myText);
	    	document.getElementById("weatherData").innerHTML=myText;
    	});
    }
Replace API_KEY_HERE with your openweather key.

Next call this function from the getWeather() function. So it should now look like this:-

    function  getWeather()  {
    	var  longitude  =  document.getElementById("longitude").value;
    	var  latitude  =  document.getElementById("latitude").value;
    	console.log(longitude);
    	console.log(latitude);
    	alert("Your longitude is: "  +  longitude  +  " and your latitude "  +  latitude  +  "!!!")
    	getWeatherForLocation(latitude,  longitude)
    }
Now when you click the submit button you should see some information about the current weather at that location and an image.

# Making the Weather Look Better
We had previously relied on the open weather api generating the format of the data we got back. Now we are going to take care of this ourselves manually so that it looks better for the users.

## Get JSON Data Instead of HTML
On the second line of the getWeatherForLocation function change `&mode=html` to `&mode=json`
Next change the line `return  response.text();` to `return  response.json();`
In the next two lines change `myText` to `myJson`
Finally change:-

    document.getElementById("weatherData").innerHTML=myText;

to 

    document.getElementById("weatherData").innerHTML=JSON.stringify(myJson);

Now when you click the submit button after the alert you should get a large amount of text back.  Correctly formatted it looks like this:-

    {
    "coord":  {
	    "lon":  -5.93,
	    "lat":  54.6
    },
    "weather":  [
	    {
		    "id":  804,
		    "main":  "Clouds",
		    "description":  "overcast clouds",
		    "icon":  "04d"
	    }
    ],
    "base":  "stations",
    "main":  {
	    "temp":  11.88,
	    "pressure":  1005,
	    "humidity":  71,
	    "temp_min":  11.67,
	    "temp_max":  12
    },
	"visibility":  10000,
	"wind":  {
	    "speed":  4.6,
	    "deg":  310
    },
	"clouds":  {
	    "all":  100
    },
	"dt":  1560430369,
    "sys":  {
	    "type":  1,
	    "id":  1376,
	    "message":  0.006,
	    "country":  "GB",
	    "sunrise":  1560397652,
	    "sunset":  1560459602
    },
    "timezone":  3600,
    "id":  2655984,
    "name":  "Belfast",
    "cod":  200
    }

We are going to use parts of this data to build our own weather report.
The values you see above for dt (datetime) and sunrise/sunset are in a format called unix epoch time. This is the number of seconds since 1970-01-01 00:00:00 UTC. This means you don't have to worry about timezones or daylight savings time. You can read more about it at  
[https://en.wikipedia.org/wiki/Unix_time](https://en.wikipedia.org/wiki/Unix_time)

To convert to human readable datetimes look at [https://www.epochconverter.com/](https://www.epochconverter.com/)

## Build a Table
Above the closing `</body>` tag add the following code. This is HTML for a table we can add the data into to ensure that remains laid out correctly.

    <br>
    <div>
    <table class="weatherTable">
    <tbody>
    <tr>
    <td>Weather Description</td>
    <td id="desc"></td>
    </tr>
    <tr>
    <td>Temperature</td>
    <td id="temp"></td>
    </tr>
    <tr>
    <td>Pressure</td>
    <td id="pressure"></td>
    </tr>
    <tr>
    <td>Humidity</td>
    <td id="humidity"></td>
    </tr>
    <tr>
    <td>Wind Speed</td>
    <td id="windy"></td>
    </tr>
    <tr>
    <td>Cloud Cover %</td>
    <td id="cloud"></td>
    </tr>
    <tr>
    <td>Location</td>
    <td id="location"></td>
    </tr>
    <tr>
    <td>Sunrise</td>
    <td id="sunup"></td>
    </tr>
    <tr>
    <td>Sunset</td>
    <td id="sundown"></td>
    </tr>
    <tr>
    <td>Weather Icon</td>
    <td id="weatherpic"></td>
    </tr>
    </tbody>
    </table>
    </div>

`<br>` is a self closing tag.

## Populate Table with Data
In weather.js below `document.getElementById("weatherData").innerHTML=JSON.stringify(myJson);` add the following line:-

    populateData(myJson)

This calls the function you should add to the bottom of the file:-

    function  populateData(myJson)  {
	    document.getElementById("desc").innerHTML=myJson.weather[0].description;
    	document.getElementById("temp").innerHTML=myJson.main.temp  +  'c';
    	document.getElementById("pressure").innerHTML=myJson.main.pressure  +  ' millibars';
    	document.getElementById("humidity").innerHTML="DIY"
    	document.getElementById("windy").innerHTML="DIY"
    	document.getElementById("cloud").innerHTML="DIY"
    	document.getElementById("location").innerHTML="DIY"
    	document.getElementById("sunup").innerHTML="DIY"
    	document.getElementById("sundown").innerHTML="DIY"
    	//document.getElementById("weatherpic").innerHTML="IYD"
    }

Stretch goal. Can you fill in the values marked with DIY? 
Even stretchier goal - If You Dare - can you make an image appear of the weather in the last line of the function? 

## Add a Map To Make Things Easier
Not many people know the longitude and latitude, so let's add a map to help everyone.

In the `<head>` of the index.html file add the following line:-

    <link rel="stylesheet"  href="https://openlayers.org/en/v4.6.5/css/ol.css"  type="text/css"  />

Then, below the HTML you added earlier for the table (but above the `</body>` tag) add:-

    <br>
    <div class="center"  id="map">
        <!-- Your map will be shown inside this div-->
        <script src="https://openlayers.org/en/v4.6.5/build/ol.js"  type="text/javascript"></script>
        <!-- Openlayesr JS file -->
        <script type="text/javascript"  src="map.js"  type="text/javascript"></script>
    </div>

This first script file reaches out to openlayers.org to provide mapping data. The second is our configuration file to draw the map on the page. As part of that we have included some code to retrieve the longitude and latitude of wherever is clicked on the map.

Next, we will tie the two systems together. We have already written a function, populateData() that will add update our table, so at the bottom of the map.js file, update it to call the function inside the .then call:-

    .then(function(myJson)  {
        console.log(JSON.stringify(myJson));
        populateData(myJson)
    });

## Test It Out
Reload the page, try clicking on the map. Does the table update?

Stretch Goal 1 - can you update the default map location and/or zoom? (to the Colosseum in Rome)
Stretch Goal 2 - can you update the size of the map on the page? 
