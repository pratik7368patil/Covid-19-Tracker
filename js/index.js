const mainUrl = 'https://covid19.mathdro.id/api';

const countriesUrl = 'https://covid19.mathdro.id/api/countries/';

// fetching all data
fetch(mainUrl)
.then(res => res.json())
.then(data => getData(data));

// fetching countires data
fetch(countriesUrl)
.then(res => res.json())
.then(data => getCountires(data));


// fetching countries stats

const giveMeCountryData = function(countryName) {
	let url = 'https://covid19.mathdro.id/api/countries/' + countryName;
	//console.log(url);
	try {
		fetch(url)
		.then(res => res.json())
		.then(data => displayData(data, countryName));
	} catch(error) {
		console.log(error);
	}
}


const getCountires = function(countires) {
	displayCountries(countires);
}

const getData = function(data) {
	//console.log(data);
	displayData(data);
}

const displayData = function(data, location = 'World') {
	
	let confirm = document.getElementById('confirm_value');
	confirm.innerText = data.confirmed.value;
	
	let recovered = document.getElementById('recovered_value');
	recovered.innerText = data.recovered.value;
	
	let deaths = document.getElementById('deaths_value');
	deaths.innerText = data.deaths.value;

	let currentLocation = document.querySelectorAll('.current-location');

	for(let i=0; i<3; i++) {
		currentLocation[i].innerText = location;
	}

}

const displayCountries = function(data) {
	let countries = document.getElementById('get_location');

	const createNewOption = function(el) {
		let newOption = document.createElement('option')
		newOption.value = el.name;
		return newOption;
	}

	data.countries.map(el => countries.appendChild(createNewOption(el)));
}

const changeData = function() {
	let getLocation = document.getElementById('location');
	if(getLocation.value === '') {
		alert('Empty Country');
		return;
	}
	giveMeCountryData(getLocation.value);
}

// add event listeners to get custom country information

let getDataBtn = document.getElementById('get_location_data');
getDataBtn.addEventListener('click', changeData);