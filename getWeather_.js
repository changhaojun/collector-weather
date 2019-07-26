const Axios = require('./axiosT');
const sortingData = require('./sortingData');

async function getWeather(citycode, cityList, weatherDict) {
    const res = await Axios(`/city/${citycode}`);
    const weatherData = sortingData.def(cityList, weatherDict, res);
    return weatherData;
}

module.exports = getWeather;