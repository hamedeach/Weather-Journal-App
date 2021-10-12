/* Global Variables */
//weather API 
// api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}
const weatherAPI_Key = '5508a205aec7e6ad6f041ac4789357c0';


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();


// get the generate button by id from the document
const btnGenerate = document.getElementById('generate');
btnGenerate.addEventListener('click', btnGenerateClickFunc);


// generate button click function.
function btnGenerateClickFunc() {

    const cityZipCode = getTxtValue('zip');
    if (cityZipCode === false) {
        alert('Invalid Zip code !');
        return;
    }



    //build API URL
    const weatherAPI_URL = `https://api.openweathermap.org/data/2.5/weather?zip=${cityZipCode}&appid=${weatherAPI_Key}`;
    // get the wather data from the API 
    const cityTemp =  getWeatherData(weatherAPI_URL);
    if (cityTemp ===false)return;

    const theContent = getTxtValue('feelings');
    if (theContent === false) {
      // to warn the user if empty content !!
    }


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
        console.log(api_Response.status);
        if(api_Response.status !==200  && api_Response.status !=="ok")
        {
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







