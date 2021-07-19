const request = require("postman-request");

getGeoCodeURL = (address, callback) => {
	const geoCodeurl = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ address +".json?access_token=pk.eyJ1IjoidmlzaGFsbWFsaTg1OCIsImEiOiJja3I3OWJkNDEzbXV3Mm9xYTNvajAzenlzIn0.zAWxxemxgJA-tDegTwODkg&limit=1";
	console.log(geoCodeurl, 'geoCodeurl');
	request({
		url: geoCodeurl,
		json: true
	}, (errorResponse, dataFetched) => {
		getLatitudeAndLoungitude(errorResponse, dataFetched, (error, data) => {
			callback(error, data);
		});
	});
}

getLatitudeAndLoungitude = (errorResponse, dataFetched, callback) => {
	let dataParseGeoBody = dataFetched.body;
	if(errorResponse) {
		callback("Unable to connect location service", undefined);
	} else if(dataParseGeoBody && !dataParseGeoBody.features) {
		callback("Unable to find location, Please Try Again", undefined);
	} else if (dataParseGeoBody.features.length === 0) {
		callback("Unable to find location, Please Try Again", undefined);
	} else {
		let dataParsed = dataFetched.body.features[0];
		callback(undefined, {
			longitude: dataParsed.center[1],
			latitude: dataParsed.center[0],
			location: dataParsed.place_name
		});
	}
}

module.exports = getGeoCodeURL