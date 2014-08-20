var Alert = Parse.Object.extend ({

	className: "Currency_alerts",

	idAttribute: "objectId",

	defaults: {
		currency: '',
		limit: '',
		price: ''

	}

});

var Allalerts = Parse.Collection.extend ({
	model: Alert 
	
});

