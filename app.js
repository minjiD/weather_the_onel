//jQuery
$(function() {
    //menubar
    $('#favicon').on("click", function() {
        if($(".menu").css('display') == 'none'){
            $(".menu").show();
            $("#favicon-img").attr("fill", "#fff");
        } else {
            $(".menu").hide();
            $("#favicon-img").attr("fill", "#000");
        }
    });

    //menu show/hide
    $('.menu > li > a').on("click", function() {
        if($(".sub ul li").css('display') == 'none'){
            $(".sub ul li").show(800);
        } else {
            $(".sub ul li").hide(800);
        }
    });
});


//JavaScript
// 현재 위치 값 가져와서 날씨 출력
const apiKey = "f2c0f2bad85dad24f33c9bfd386df110";

//London weather
function onLondonWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`;

    fetchUrl(url);
}

//Seoul weather
function onSeoulWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=${apiKey}&units=metric`;

    fetchUrl(url);
}

//losAngeles weather
function onlosAngelesWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=Los Angeles&appid=${apiKey}`;

    fetchUrl(url);
}

//current location
function onGeoOk(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    // console.log(lat + ", " + lon);

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=kr&appid=${apiKey}&units=metric`;

    fetchUrl(url);
}

function fetchUrl(url) {
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        // console.log(data);
        // console.log(data.name, data.weather[0].main, data.main.temp);
        resData(data); // 내보낼 데이터 담기
    })
    .catch(error => {
        console.error(error);
    });
}

function resData(data) {
    const bg = document.querySelector("#wrap");

    //background image
    if(data.weather[0].main === "Clouds") {
        // console.log("Clouds");
        bg.style.backgroundImage = "url('./img/cloudy.jpg')";
    }else if(data.weather[0].main === "Rains") {
        // console.log("Rains");
        bg.style.backgroundImage = "url('./img/rain.jpg')";
    }else if(data.weather[0].main === "Clear") {
        // console.log("Clear");
        bg.style.backgroundImage = "url('./img/sunny.jpg')";
    }else if(data.weather[0].main === "Haze") {
        // console.log("Haze");
        bg.style.backgroundImage = "url('./img/haze.jpg')";
    }else if(data.weather[0].main === "Snow") {
        // console.log("Snow");
        bg.style.backgroundImage = "url('./img/snow.jpg')";
    }else{
        // console.log("else");
        bg.style.backgroundImage = "url('./img/sunny.jpg')";
    }

    //add elements to section
    let sections = document.querySelector("section");
    let locations = document.createElement("p");
    let temps = document.createElement("p");
    let weathers = document.createElement("p");

    locations.innerHTML = `${data.name}`;
    weathers.innerHTML = `${data.weather[0].main}`;
    temps.innerHTML = `${data.main.temp}`;
    if(`${data.sys.country}` == "US" || `${data.sys.country}` == "USA") {
        temps.innerHTML += `&#8457;`; //&#8457; - 화씨 기호
    } else {
        temps.innerHTML += `&#8451;`; //&#8451; - 섭씨 기호
    }

    sections.append(locations);
    sections.append(weathers);
    sections.append(temps);

    //section style
    sections.style.color = "white";
    sections.style.fontSize = "90px";
    sections.style.position = "absolute";
    sections.style.right = "90px";
    sections.style.bottom = "90px";
    sections.style.textShadow = "black 5px 3px 5px";
}

//error
function onGeoError() {
    alert("Geolocation Error");
}

//call
navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

//London
const london = document.getElementById("london");
london.addEventListener("click", function() {
    $("#body").empty();
    $(".menu").hide();
    navigator.geolocation.getCurrentPosition(onLondonWeather, onGeoError);
});

//Seoul
const seoul = document.getElementById("seoul");
seoul.addEventListener("click", function() {
    $("#body").empty();
    $(".menu").hide();
    navigator.geolocation.getCurrentPosition(onSeoulWeather, onGeoError);
});

//Los Angeles
const losAngeles = document.getElementById("los-angeles");
losAngeles.addEventListener("click", function() {
    $("#body").empty();
    $(".menu").hide();
    navigator.geolocation.getCurrentPosition(onlosAngelesWeather, onGeoError);
});