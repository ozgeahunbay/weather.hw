const today = $('.today');
const fiveDay = $('#five-day');
const future = $('#future-forecast');
const searchForm = $('#search-form')
const cityName = $('#city-name')
const submit = $('.btn')
const apiKey = '26cb7515d14eaa721f74b546cec12665';

function readCitiesFromStorage() {
    let stringdata = localStorage.getItem('cityName')
    let citySearch = JSON.parse(stringdata) || []
    console.log(citySearch)

}



function saveCitiesToStorage(citySearch) {
    let savedCity = JSON.stringify(citySearch);
    localStorage.setItem('cityName', savedCity)
}

let chosenCity = []

if (!localStorage.getItem('cityName')) localStorage.setItem('cityName', JSON.stringify([]))



function sugCity1() {
    const nameofcity = $('#city-name').val()
    const sug1 = $('<p>');
    sug1.text(nameofcity);
    $('.sug1').append(sug1)
    //console.log(nameofcity)
}
function sugCity2() {
    const nameofcity = $('#city-name').val()
    const sug2 = $('<p>');
    sug2.text(nameofcity);
    $('.sug2').append(sug2)

}
function sugCity3() {
    const nameofcity = $('#city-name').val()
    const sug3 = $('<p>');
    sug3.text(nameofcity);
    $('.sug3').append(sug3)

}
function sugCity4() {
    const nameofcity = $('#city-name').val()
    const sug4 = $('<p>');
    sug4.text(nameofcity);
    $('.sug4').append(sug4)

}
function currentWeatherApi() {

    const city = $('#city-name').val()
    //console.log(city)
    chosenCity.push(city)
    saveCitiesToStorage(chosenCity)

    //const requestURL= `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`
    const requestURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)

            todayWeather(data)
            //fiveDayWeather(data)
            //let newData=data.results;

        })

}
//getGeoApi()

function todayWeather(data) {
    console.log(data.weather[0].icon)
    const currentCityName = $('<h2>');
    const today = dayjs();
    const weatherIcon = $('<img class= "weathericon">');
    const currentCityTemp = $('<p>');
    const currentCityHumidity = $('<p>');
    const currentCityWindSpeed = $('<p>');
    currentCityName.html(data.name);
    currentCityTemp.html(Math.round(((data.main.temp - 273.15) * 1.8) + 32));
    weatherIcon.attr('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
    currentCityHumidity.html(data.main.humidity)
    currentCityWindSpeed.html(data.wind.speed)


    $('.today').append(currentCityName,
        weatherIcon,
        today,

        '<div>',
        'Temperature:',
        currentCityTemp, '°F',
        '</div>',


        '<div>',
        'Humidity: ',
        currentCityHumidity,
        '</div>',

        '<div>',
        'Wind Speed: ',
        currentCityWindSpeed,
        '</div>'
    )
}

function fiveDayWeatherApi() {
    const city = $('#city-name').val()
    const requestURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
    fetch(requestURL)
        .then(function (response) {
            // return response.json();
            return response.json();

        })
        .then(function (data) {
            console.log(data)
            localStorage.setItem('weather', JSON.stringify(data))
            fiveDayForecast();
        })

}


function fiveDayForecast() {
    const date1 = $('<p>')
    const date2 = $('<p>')
    const date3 = $('<p>')
    const date4 = $('<p>')
    const date5 = $('<p>')
    let weather = JSON.parse(localStorage.getItem('weather'))
    date1.html(weather.list[3].dt_txt)
    date2.html(weather.list[11].dt_txt)
    date3.html(weather.list[19].dt_txt)
    date4.html(weather.list[27].dt_txt)
    date5.html(weather.list[35].dt_txt)
    //const day1= JSON.stringify($('.day2').val())
    //console.log(day1)
    const temp1 = $('<p>')
    const temp2 = $('<p>')
    const temp3 = $('<p>')
    const temp4 = $('<p>')
    const temp5 = $('<p>')

    temp1.html(Math.round(((weather.list[3].main.temp - 273.15) * 1.8) + 32));
    temp2.html(Math.round(((weather.list[11].main.temp - 273.15) * 1.8) + 32));
    temp3.html(Math.round(((weather.list[19].main.temp - 273.15) * 1.8) + 32));
    temp4.html(Math.round(((weather.list[27].main.temp - 273.15) * 1.8) + 32));
    temp5.html(Math.round(((weather.list[35].main.temp - 273.15) * 1.8) + 32));

    const icon1 = $('<img>')
    const icon2 = $('<img>')
    const icon3 = $('<img>')
    const icon4 = $('<img>')
    const icon5 = $('<img>')

    icon1.attr('src', `https://openweathermap.org/img/wn/${weather.list[3].weather[0].icon}@2x.png`)
    icon2.attr('src', `https://openweathermap.org/img/wn/${weather.list[11].weather[0].icon}@2x.png`)
    icon3.attr('src', `https://openweathermap.org/img/wn/${weather.list[19].weather[0].icon}@2x.png`)
    icon4.attr('src', `https://openweathermap.org/img/wn/${weather.list[27].weather[0].icon}@2x.png`)
    icon5.attr('src', `https://openweathermap.org/img/wn/${weather.list[35].weather[0].icon}@2x.png`)

    const humid1 = $('<p>')
    const humid2 = $('<p>')
    const humid3 = $('<p>')
    const humid4 = $('<p>')
    const humid5 = $('<p>')

    humid1.html(weather.list[3].main.humidity)
    humid2.html(weather.list[11].main.humidity)
    humid3.html(weather.list[19].main.humidity)
    humid4.html(weather.list[27].main.humidity)
    humid5.html(weather.list[35].main.humidity)

    const wind1 = $('<p>')
    const wind2 = $('<p>')
    const wind3 = $('<p>')
    const wind4 = $('<p>')
    const wind5 = $('<p>')

    wind1.html(weather.list[3].wind.speed)
    wind2.html(weather.list[11].wind.speed)
    wind3.html(weather.list[19].wind.speed)
    wind4.html(weather.list[27].wind.speed)
    wind5.html(weather.list[35].wind.speed)

    // console.log(weather.list[3].weather[0].icon)

    $('.day2').append(date1, icon1, 'Temperature:', temp1, '°F', 'humidity:', humid1, 'wind speed:', wind1)
    $('.day3').append(date2, icon2, 'Temperature:', temp2, '°F', 'humidity:', humid2, 'wind speed:', wind2)
    $('.day4').append(date3, icon3, 'Temperature:', temp3, '°F', 'humidity:', humid3, 'wind speed:', wind3)
    $('.day5').append(date4, icon4, 'Temperature:', temp4, '°F', 'humidity:', humid4, 'wind speed:', wind4)
    $('.day6').append(date5, icon5, 'Temperature:', temp5, '°F', 'humidity:', humid5, 'wind speed:', wind5)
    const day1 = JSON.stringify(date1.val())
    console.log(day1)
    console.log(weather);
}


//getGeoApi()
//submit.addEventListener('click', getGeoApi())
$('.btn').click(function () {
    $('.today').empty();
    $('.day2').empty();
    $('.day3').empty();
    $('.day4').empty();
    $('.day5').empty();
    $('.day6').empty();
    $('.sug1').empty();
    $('.sug2').empty();
    $('.sug3').empty();
    $('.sug4').empty();
    currentWeatherApi();
    fiveDayWeatherApi();
    sugCity1();
    sugCity2();
    sugCity3();
    sugCity4();
})

$('.sug1').click(function () {
    $('.today').empty();
    $('.day2').empty();
    $('.day3').empty();
    $('.day4').empty();
    $('.day5').empty();
    $('.day6').empty();
    $('.sug1').empty();
    $('.sug2').empty();
    $('.sug3').empty();
    $('.sug4').empty();
    currentWeatherApi();
    fiveDayWeatherApi();
    sugCity1();
    sugCity2();
    sugCity3();
    sugCity4();
})



$('.sug2').click(function () {
    $('.today').empty();
    $('.day2').empty();
    $('.day3').empty();
    $('.day4').empty();
    $('.day5').empty();
    $('.day6').empty();
    $('.sug1').empty();
    $('.sug2').empty();
    $('.sug3').empty();
    $('.sug4').empty();
    currentWeatherApi();
    fiveDayWeatherApi();
    sugCity1();
    sugCity2();
    sugCity3();
    sugCity4();
})

$('.sug3').click(function () {
    $('.today').empty();
    $('.day2').empty();
    $('.day3').empty();
    $('.day4').empty();
    $('.day5').empty();
    $('.day6').empty();
    $('.sug1').empty();
    $('.sug2').empty();
    $('.sug3').empty();
    $('.sug4').empty();
    currentWeatherApi();
    fiveDayWeatherApi();
    sugCity1();
    sugCity2();
    sugCity3();
    sugCity4();
})

$('.sug4').click(function () {
    $('.today').empty();
    $('.day2').empty();
    $('.day3').empty();
    $('.day4').empty();
    $('.day5').empty();
    $('.day6').empty();
    $('.sug1').empty();
    $('.sug2').empty();
    $('.sug3').empty();
    $('.sug4').empty();
    currentWeatherApi();
    fiveDayWeatherApi();
    sugCity1();
    sugCity2();
    sugCity3();
    sugCity4();
})



