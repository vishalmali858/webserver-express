const request = require("postman-request");

getWeatherInformation = (langLat, callback) => {
	const url = "http://api.weatherstack.com/current?access_key=e4a75ad8c13d5e4391a1b5506cb5c73a&query="+ langLat +"&units=f";
	let dataToBeSent = '';
	request({
		url,
		json: true
	}, (errorResponse1, dataFetched1) => {
		let dataParsedWeatherBody = dataFetched1.body;
		if(errorResponse1) {
			callback("Unable to connect weather service", undefined);
		} else if(dataParsedWeatherBody && dataParsedWeatherBody.error) {
			callback(dataParsedWeatherBody.error.info, undefined);
		} else {
			let dataParsedWeather = dataParsedWeatherBody.current;
			const { temperature, weather_descriptions, feelslike, precip } = dataParsedWeather;
			if(temperature) {
				dataToBeSent = weather_descriptions[0] + ". The current temperature is " + temperature + " and it feels like " + feelslike + " .There is " + precip +"% of rain.";
			}
			callback(undefined, dataToBeSent);
		}
	});
}

module.exports = getWeatherInformation;