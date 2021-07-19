console.log("Client side javascript is loaded");

// fetch('http://puzzle.mead.io/puzzle').then((response)=> {
// 	response.json().then((data)=> {
// 		console.log(data, 'data');
// 	});
// });

// fetch('http://localhost:3000/weather?address=!').then((response)=> {
// 	response.json().then((data)=> {
// 		if(data.error) {
// 			console.log(data.error, 'error');
// 		} else {
// 			console.log(data, 'data');
// 		}
// 	});
// });

const weatherSelectionForm = document.querySelector("form");
console.log("weatherSelectionForm", weatherSelectionForm);

weatherSelectionForm.addEventListener('submit', function(event) {
	event.preventDefault();
	let inputAdded = event.target.querySelector("input").value;
	fetch('/weather?address=' + inputAdded).then((response)=> {
		let errorData = document.querySelector("#errorMessage");
		errorData.textContent = '';
		let weatherData = document.querySelector("#weatherData");
		weatherData.textContent = '';
		response.json().then((data)=> {
			if(data.error) {
				errorData.textContent = data.error ;
			} else {
				weatherData.textContent = data.location + "\n" + data.forecast;
			}
		});
	});
});