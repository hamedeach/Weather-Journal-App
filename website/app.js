/* Global Variables */
//weather API 
// api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}
const weatherAPI_Key = '5508a205aec7e6ad6f041ac4789357c0';
// temp. measure unit 
const WeatherAPI_Unit ='&units=metric';


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1) + '.' + d.getDate() + '.' + d.getFullYear();


// get the generate button by id from the document
const btnGenerate = document.getElementById('generate');
btnGenerate.addEventListener('click', btnGenerateClickFunc);


// generate button click function.
async function btnGenerateClickFunc() {

    const cityZipCode = getTxtValue('zip');
    if (cityZipCode === false) {
        alert('Invalid Zip code !');
        return;
    }



    //build API URL
    const weatherAPI_URL = `https://api.openweathermap.org/data/2.5/weather?zip=${cityZipCode}&appid=${weatherAPI_Key}${WeatherAPI_Unit}`;
    // get the wather data from the API 
    const cityTemp = await getWeatherData(weatherAPI_URL);
    if (cityTemp === false) return;

    const theContent = getTxtValue('feelings');
    if (theContent === false) {
        //  warn the user if empty content (optional)
        alert('empty feelings  !');
        return;
    }

    // post weather data to the server
    const postLocalRes = await postWeatherData('/postWeather', newDate, cityTemp, theContent);
    if (postLocalRes === false) {

        //    return
    }

    const getLocalRes = await getLocalServerData('/getWeather');
    if (getLocalRes === false) {

        //    return
    }
    console.log(getLocalRes.localdata);
    updateUI(getLocalRes.localdata);




};

// the value of any txt element by the element ID
function getTxtValue(txtId) {
    const txtElement = document.getElementById(txtId);
    if (txtElement === null) return false;
    if (txtElement.value === '') return false;
    return txtElement.value;
};

//get the weather data async function from the weather Web API using fetch
async function getWeatherData(url) {
    if (url === '') { return false; }
    try {
        const api_Response = await fetch(url);
        console.log(api_Response);
        if (api_Response.status !== 200 && api_Response.status !== "ok") {
            alert(`Can not get weather data ! \n API Status message : ${api_Response.statusText}`);
            return false;
        }
        console.log(`INFO  : API Status Message  ${api_Response.statusText}`);
        const weatherData = await api_Response.json();
        console.log(`INFO : Received Weather Data :`);
        console.log(weatherData);
        const temp = weatherData.main.temp;
        console.log(`INFO : the tempruture is ${temp}`);
        return temp;
    }
    catch (error) {
        console.log('Error : ', error);

    }


};

// function used to post data to the server
async function postWeatherData(url, thedate = newDate, citytemp = 0.0, thecontent = '') {
    if (url === '') return false;
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers:
            { 'Content-Type': 'application/json', },
        body: JSON.stringify({
            date: thedate,
            temp: citytemp,
            content: thecontent
        })
    });
    try {
        const serverResponse = await response.json();
        console.log(serverResponse);
        if (serverResponse.status !== "ok") {
            alert(`failed to post !`);
            return false;
        }
        console.log(`INFO  : Post weather data OK`);
    }
    catch (error) {
        console.log(`Error  : Post weather data Error : ${error}`);
        return false;
    }
};

// get the weather data from node server 
async function getLocalServerData(url) {
    if (url === '') return false;
    const response = await fetch(url);
    console.log(response);
    try {
        const serverResponse = await response.json();
        console.log(serverResponse);

        if (serverResponse.status !== "ok") {
            alert(`failed to get !`);
            return false;
        }
        console.log(`INFO  : get weather data OK`);
        return serverResponse;
    }
    catch (error) {
        console.log(`Error  : Post weather data Error : ${error}`);
        return false;
    }

};

//function used to updated the UI
function updateUI(serverdata) {
    if (!serverdata) {
        alert("Invalid server data !");
        return false;
    }
    try{
    document.querySelector('#date').innerHTML  = `Date : ${serverdata.projectData.date}`;
    document.querySelector('#temp').innerHTML  = `Temperature : ${serverdata.projectData.temp}`;
    document.querySelector('#content').innerHTML  =`I Feel ${serverdata.projectData.content}`;
    }
    catch(error){
        console.log("ERROR : ", error);
        return false ;
    }
};



