
console.log('Everything working correctly')

const desc = {
    freezing_rain_heavy: ['rain', 'Freezing Rain, Heavy', 'i_rain_heavy'],
    freezing_rain: ['rain', 'Freezing Rain', 'i_rain_heavy'],
    freezing_rain_light: ['rain', 'Freezing Rain, Light', 'i_rain'],
    freezing_drizzle: ['driz', 'Freezing Drizzle', 'i_rain'],
    ice_pellets_heavy: ['ice', 'Ice Pellets, Heavy', 'i_ice'],
    ice_pellets: ['ice', 'Ice Pellets', 'i_ice'],
    ice_pellets_light: ['ice', 'Ice Pellets, Light', 'i_ice'],
    snow_heavy: ['snow', 'Heavy Snow', 'i_snow_heavy'],
    snow: ['snow', 'Snow', 'i_snow'],
    snow_light: ['snow', 'Light Snow', 'i_snow'],
    flurries: ['wind', 'Flurries', 'i_wind'],
    tstorm: ['clouds', 'Thunderstorms'],
    rain_heavy: ['rain', 'Heavy Rain', 'i_rain_heavy'],
    rain: ['rain', 'Rain', 'i_rain'],
    rain_light: ['rain', 'Light Rain', 'i_rain'],
    drizzle: ['rain', 'Drizzle', 'i_driz'],
    fog_light: ['fog', 'Light Fog', 'i_fog'],
    fog: ['fog', 'Fog', 'i_fog'],
    cloudy: ['clouds', 'Cloudy'],
    mostly_cloudy: ['clouds', 'Mostly Cloudy', 'i_clouds'],
    partly_cloudy: ['clouds', 'Partly Cloudy'],
    mostly_clear: ['clear', 'Mostly Clear'],
    clear: ['clear', 'Clear']
}

const bgData = [
    "linear-gradient(to bottom, #020111 10%, #3a3a52 100%)",
    "linear-gradient(to bottom, #20202c 0%, #515175 100%)",
    "linear-gradient(to bottom, #40405c 0%, #6f71aa 80%, #8a76ab 100%)",
    "linear-gradient(to bottom, #4a4969 0%, #7072ab 50%, #cd82a0 100%)",
    "linear-gradient(to bottom, #757abf 0%, #8583be 60%, #eab0d1 100%)",
    "linear-gradient(to bottom, #82addb 0%, #ebb2b1 100%)",
    "linear-gradient(to bottom, #94c5f8 1%, #a6e6ff 70%, #b1b5ea 100%)",
    "linear-gradient(to bottom, #b7eaff 0%, #94dfff 100%)",
    "linear-gradient(to bottom, #9be2fe 0%, #67d1fb 100%)",
    "linear-gradient(to bottom, #90dffe 0%, #38a3d1 100%)",
    "linear-gradient(to bottom, #57c1eb 0%, #246fa8 100%)",
    "linear-gradient(to bottom, #2d91c2 0%, #1e528e 100%)",
    "linear-gradient(to bottom, #2473ab 0%, #1e528e 70%, #5b7983 100%)",
    "linear-gradient(to bottom, #1e528e 0%, #265889 50%, #9da671 100%)",
    "linear-gradient(to bottom, #1e528e 0%, #728a7c 50%, #e9ce5d 100%)",
    "linear-gradient(to bottom, #154277 0%, #576e71 30%, #e1c45e 70%, #b26339 100%)",
    "linear-gradient(to bottom, #163C52 0%, #4F4F47 30%, #C5752D 60%, #B7490F 80%, #2F1107 100%)",
    "linear-gradient(to bottom, #071B26 0%, #071B26 30%, #8A3B12 80%, #240E03 100%)"
]


let sr, ss;
var d = new Date();
const hr = d.getHours()
const min = d.getMinutes()

function bgChange() {
    if (hr >= 4 && hr < 16) {
        document.body.style.background = bgData[hr - 4];
        if (hr - 4 > 6) {
            document.getElementsByClassName("stars")[0].style.display = "none"
        }
    }
    if (hr == 16 && (min >= 0 && min <= 30)) {
        document.body.style.background = bgData[hr - 4];
        document.getElementsByClassName("stars")[0].style.display = "none"
    }
    if (hr == 16 && (min > 30 && min <= 59)) {
        document.body.style.background = bgData[hr - 3];
        document.getElementsByClassName("stars")[0].style.display = "none"
    }
    if (hr == 17 && (min >= 0 && min <= 30)) {
        document.body.style.background = bgData[hr - 3];
        document.getElementsByClassName("stars")[0].style.display = "none"
    }
    if (hr == 17 && (min > 30 && min <= 59)) {
        document.body.style.background = bgData[hr - 2];
        document.getElementsByClassName("stars")[0].style.display = "none"
    }
    if (hr == 18 && (min >= 0 && min <= 30)) {
        document.body.style.background = bgData[hr - 2];
    }
    if (hr == 18 && (min > 30 && min <= 59)) {
        document.body.style.background = bgData[hr - 1];
    }

}
bgChange()

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            fetch('/weather/rdata?latitude=' + encodeURIComponent(position.coords.latitude) + '&longitude=' + encodeURIComponent(position.coords.longitude)).then((response) => {
                response.json().then((data) => {
                    if (data.error) {
                        console.log(data.error)
                    }
                    else {
                        console.log(data)
                        rchange(data)
                        ichange(data)
                    }
                })
            })
            fetch('/weather/ldata?latitude=' + encodeURIComponent(position.coords.latitude) + '&longitude=' + encodeURIComponent(position.coords.longitude)).then((response) => {
                response.json().then((data) => {
                    if (data.error) {
                        console.log(data.error)
                    }
                    else {
                        console.log(data)
                        document.getElementById("location").innerHTML = data.location;
                    }
                })
            })
            fetch('/weather/hdata?latitude=' + encodeURIComponent(position.coords.latitude) + '&longitude=' + encodeURIComponent(position.coords.longitude)).then((response) => {
                response.json().then((data) => {
                    if (data.error) {
                        console.log(data.error)
                    }
                    else {
                        console.log(data)
                        hchange(data)
                    }
                })
            })
        }, gerror, { enableHighAccuracy: true, timeout: 10 * 10 * 1000, maximumAge: 0 })
    } else {
        console.log("Geolocation is not supported by this browser.")
    }
}

function gerror(error) {
    var errors = {
        1: 'Permission denied',
        2: 'Position unavailable',
        3: 'Request timeout'
    };
    console.log("Error: " + errors[error.code]);
}

getLocation()

function search() {
    var addr = document.getElementById("srch").value;
    fetch('/weather/sdata?addr=' + encodeURIComponent(addr)).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
            }
            else {
                document.getElementById("load").style.display = "block";
                document.getElementById("load").innerHTML = "Searching and accessing Weather Data.. Please wait.";
                console.log(data)
                document.getElementById("location").innerHTML = data.location;
                var tmp = document.getElementsByClassName("anim")
                for (let i = 0; i < tmp.length; i++) {
                    tmp[i].style.display = "none"
                }
                tmp = document.getElementsByClassName("stat")
                for (let i = 0; i < tmp.length; i++) {
                    tmp[i].style.display = "none"
                }
                fetch('/weather/rdata?latitude=' + encodeURIComponent(data.latitude) + '&longitude=' + encodeURIComponent(data.longitude)).then((response) => {
                    response.json().then((rdata) => {
                        if (rdata.error) {
                            console.log(rdata.error)
                        }
                        else {
                            console.log(rdata)
                            rchange(rdata)
                            ichange(rdata)
                        }
                    })
                })

                fetch('/weather/hdata?latitude=' + encodeURIComponent(data.latitude) + '&longitude=' + encodeURIComponent(data.longitude)).then((response) => {
                    response.json().then((hdata) => {
                        if (hdata.error) {
                            console.log(hdata.error)
                        }
                        else {
                            console.log(hdata)
                            hchange(hdata)
                        }
                    })
                })
            }
        })
    })

}

function rchange(data) {
    document.getElementById("temp").innerHTML = data.temp.value;
    document.getElementById("weather_code").innerHTML = desc[data.weather_code.value][1];
    document.getElementById("feels_like").innerHTML = data.feels_like.value;
    document.getElementById("wind_speed").innerHTML = data.wind_speed.value;
    document.getElementById("wind_direction").innerHTML = data.wind_direction.value;
    document.getElementById("precipitation").innerHTML = data.precipitation.value;
    document.getElementById("humidity").innerHTML = data.humidity.value;
    document.getElementById("baro_pressure").innerHTML = data.baro_pressure.value;
    document.getElementById("visibility").innerHTML = data.visibility.value;
    document.getElementById("cloud_cover").innerHTML = data.cloud_cover.value;
    document.getElementById("load").style.display = "none";
}

function ichange(data) {
    let h = d.getHours()
    sr = new Date(data.sunrise.value)
    ss = new Date(data.sunset.value)
    sr = sr.getHours()
    ss = ss.getHours()
    const val = data.weather_code.value

    if (val === 'clear' || val === 'mostly_clear') {
        if (h >= sr && h < ss) {
            document.getElementById("clear_day").style.display = "block";
        }
        else {
            document.getElementById("clear_night").style.display = "block";
        }
    }
    else if (val === 'partly_cloudy' || val === 'cloudy') {
        if (h >= sr && h < ss) {
            document.getElementById("cloudy_day").style.display = "block";
        }
        else {
            document.getElementById("clouds").style.display = "block";
        }
    }
    else {
        document.getElementById(desc[val][0].toString()).style.display = "block";
    }
}

function hchange(data) {
    var ap = ['AM', 'PM']
    var h = d.getHours()
    var ele = document.getElementsByClassName("thrs");
    var tmp = document.getElementsByClassName("htmp");
    var fl = document.getElementsByClassName("hflike");
    var pc = document.getElementsByClassName("hpc");
    var code = document.getElementsByClassName("hwcode");
    for (let i = 0; i < 6; i++) {
        h++;
        if (h == 24) {
            h = 0;
        }
        let t = (h == 12 || h == 0) ? 12 : (h % 12)
        ele[i].innerHTML = t + ' ' + ap[parseInt(h / 12)];
        tmp[i].innerHTML = data[i + 1].temp.value;
        fl[i].innerHTML = data[i + 1].feels_like.value;
        pc[i].innerHTML = data[i + 1].precipitation_probability.value;
        code[i].innerHTML = desc[data[i + 1].weather_code.value][1];

        const val = data[i + 1].weather_code.value
        let k = d.getHours() + i + 1;
        if (val === 'clear' || val === 'mostly_clear') {
            if (k >= sr && k < ss) {
                document.getElementsByClassName("i_clear_day")[i].style.display = "block";
            }
            else {
                document.getElementsByClassName("i_clear_night")[i].style.display = "block";
            }
        }
        else if (val === 'partly_cloudy' || val === 'cloudy') {
            if (k >= sr && k < ss) {
                document.getElementsByClassName("i_cloud_day")[i].style.display = "block";
            }
            else {
                document.getElementsByClassName("i_clouds")[i].style.display = "block";
            }
        }
        else {
            document.getElementsByClassName(desc[val][2].toString())[i].style.display = "block"

        }
    }
    document.getElementById("precipitation_probability").innerHTML = data[0].precipitation_probability.value;
}

