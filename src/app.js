const express = require("express");
const path = require("path");
const hbs = require("hbs");
const getGeoCodeURL = require("./utils/geocode.js");
const getWeatherInformation = require("./utils/weatherData.js");

const app = express();
console.log('express', __dirname, __filename);
let publicDirectoryPath =  path.join(__dirname, "../public");
let directoryPathForViews =  path.join(__dirname, "../templates/views");
let directoryPathForPartials =  path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", directoryPathForViews);
hbs.registerPartials(directoryPathForPartials);

app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=> {
	res.render('index', {
		title: "Weather",
		name: "Vishal Mali"
	});
});

app.get('/about', (req, res)=> {
	res.render('about', {
		title: "Weather About",
		name: "Vishal Mali About"
	});
});

app.get('/help', (req, res)=> {
	res.render('help', {
		title: "Weather Help",
		name: "Vishal Mali Help"
	});
});

app.get('/weather', (req, res)=> {
	console.log();
	if(req.query.address) {
		getGeoCodeURL(req.query.address.toString(), (error, dataFetched) => {
		if(error) {
			res.send({error});
		} else {
			const { latitude, longitude, location } = dataFetched;
			getWeatherInformation(latitude + "," + longitude, (error, weatherData) => {
				if(error) {
					res.send({error});
				} else {
					res.send({ forecast: weatherData, location, address: req.query.address });
				}
			});
		}
		});
	} else {
		res.send({
			error: "please add address in url"
		});
	}
});

app.get('/about/*', (require, response) => {
	response.render('error404', {
		title: "Error 404",
		message: "About Article Page Not Found",
		name: "Vishal Mali"
	});
})

app.get('/help/*', (require, response) => {
	response.render('error404', {
		title: "Error 404",
		message: "Help Article Page Not Found",
		name: "Vishal Mali"
	});
})

app.get('*', (req, res)=> {
	res.render('error404',{
		title: "Error 404",
		message: "Error 404 Page Not Found",
		name: "Vishal Mali"
	});
})

app.listen(3000, ()=> {
	console.log("Server running");
})