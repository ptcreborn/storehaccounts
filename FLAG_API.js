


// get the ip and return the country code, country name and flag

var FLAG_API = {
	getCodefromIP: function(parentElem) {
		let flag_img = '';
		let country_name = '';
		let country_code = '';
		
		let regionNames = new Intl.DisplayNames(['en'], {type: 'region'});
regionNames.of('US');  // "United States"
		
		fetch('https://api.country.is').then(function(response) {
			return response.json();
		}).then(function(data) {
			flag_img = 'https://flagsapi.com/' + data.country + '/shiny/64.png';
			country_code = data.country;
			country_name = regionNames.of(country_code);
			
			parentElem.innerHTML = "<img style='vertical-align: middle; width: 24px !important;height: 24px !important;object-fit: cover;' src='" + flag_img + "'/><span style='font-weight: 600;'>" + country_name + " (" + country_code + ")</span>";
		});
	}
}
