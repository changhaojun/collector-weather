const moment = require('moment');

function getImg(type, weatherDict) {
    for(var key in weatherDict){
        if(type === key) {
            img = weatherDict[key];
            break;
        }
    }
    return img;
}

const sortingData = {
    def: function (cityList, weatherDict, res) {
        let weatherData = {
            daily: []
        };
        const data = res.data;
        const forecast = res.data.forecast;
        
        cityList.forEach(city => {
            if(res.cityInfo.citykey === city.code) {
                weatherData.cityid = city.data_id;
            }
        })
        weatherData.img = getImg(forecast[0].type, weatherDict);
        // const date = moment(res.time).format('YYYY-MM-DD');
        const date = res.date.substr(0, 4) + '-' + res.date.substr(4, 2) + '-' + res.date.substr(6, 2);
        weatherData.date = new Date(date);
        weatherData.updatetime = new Date(res.time);
        weatherData.city = res.cityInfo.city;
        weatherData.citycode = res.cityInfo.citykey;
        weatherData.week = forecast[0].date.substr(forecast[0].date.length-3, 3);
        weatherData.weather = forecast[0].type;
        weatherData.winddirect = forecast[0].fx;
        weatherData.windpower = forecast[0].fl;
        weatherData.temphigh=Number((forecast[0].high.split(' ')[1]).split('℃')[0]);
        weatherData.templow=Number((forecast[0].low.split(' ')[1]).split('℃')[0]);
        weatherData.temp = Math.ceil((weatherData.temphigh+weatherData.templow)/2);
        weatherData.humidity = Number(data.shidu.split('%')[0]);
        forecast.forEach(i => {
            let obj = {};
            obj.week = i.date.substr(forecast[0].date.length-3, 3);
            obj.sunrise = i.sunrise;
            obj.sunset = i.sunset;
            obj.night = {
                weather: i.type,
                templow: Number((i.low.split(' ')[1]).split('℃')[0]),
                winddirect: i.fx,
                windpower: i.fl,
                img: getImg(i.type, weatherDict)
    
            };
            obj.day = {
                weather: i.type,
                temphigh: Number((i.high.split(' ')[1]).split('℃')[0]),
                winddirect: i.fx,
                windpower: i.fl,
                img: getImg(i.type, weatherDict)
            };
            weatherData.daily.push(obj);
        });
        // console.log('weatherData:', weatherData);
        return weatherData;
    }
}

module.exports = sortingData;
