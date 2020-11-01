const showAlert = (data, status) => {
	var alertEle = document.getElementById("alert_status");
	alertEle.className = `show ${status ? 'ok' : 'error'}`;

	alertEle.innerText = data;
	setTimeout(function(){ alertEle.className = alertEle.className.replace("show", ""); }, 3000);
}

const mainUrl = 'https://covid19.mathdro.id/api';

const countriesUrl = 'https://covid19.mathdro.id/api/countries/';

// fetching all data
(function() {
	try {
		fetch(mainUrl)
		.then(res => res.json())
		.then(data => {getData(data); showAlert('Got it!', true)});
	} catch(error) {
		showAlert('404 Error!', false);
	}
})();

// fetching countires data
(function() {
	try {
		fetch(countriesUrl)
		.then(res => res.json())
		.then(data => {getCountires(data); showAlert('Got it!', true)});
	} catch(error) {
		showAlert('404 Error!', false);
	}
})();

// fetching countries stats

const giveMeCountryData = function(countryName) {
	let url = 'https://covid19.mathdro.id/api/countries/' + countryName;
	//console.log(url);
	try {
		fetch(url)
		.then(res => res.json())
		.then(data => {displayData(data, countryName); showAlert('Got it!', true)});
	} catch(error) {
		showAlert('404 Error!', false);
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
	if(getLocation.value) {
		showAlert('Bad Country!', false);
	}
	if(getLocation.value === '') {
		showAlert('Please provide Country!', false);
		return;
	}
	giveMeCountryData(getLocation.value);
}

// add event listeners to get custom country information

let getDataBtn = document.getElementById('get_location_data');
getDataBtn.addEventListener('click', changeData);