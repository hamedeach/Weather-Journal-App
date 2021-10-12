// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
/* Dependencies */
const bodyParser = require('body-parser')
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const portNo = 8080;
const server = app.listen(portNo, listenCallBack);
function listenCallBack(){
    console.log(`Info : Server is running on localhost:${portNo}`);
  };

// get route
app.get('/getWeather',(request, response)=> {
    response.send(projectData);
  });


// POST route
app.post('/postWeather' ,(request, response)=> {
    console.log(request.body);
    projectData = {...request.body};
    response.send();
  });