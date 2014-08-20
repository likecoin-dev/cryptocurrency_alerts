Parse.initialize("q5Xdc0dSvnGaiBaMwsKjL4YqxcYm4AxryYeye9Y6", "Q0XnK0NrdWzbmlXavUs005d23Y976wIBcHsXZYSr");

var currentUser = Parse.User.current();

var showUser = function (user) {
  var name = user.get('username');
  $('.userfield').text(name);
};

$('.logout').on('click', function () {
  Parse.User.logOut();
  currentUser = Parse.User.current();
  start.navigate('login', {trigger: true});
});

$('.alerts').on('click', function (e) {
	$('#alertspace_container').toggle();
});

var start = new PageRouter();
Backbone.history.start();

$('#setalerts').on('submit', function (e) {
	e.preventDefault();
	console.log('form submitted');
	var alert_trigger = new Alert({
		currency: $('input[name="currency"]:checked').val(),
		limit: $('input[name="limit"]:checked').val(),
		price: $('input[name="price"]').val(),
		user: Parse.User.current(),
    ACL: new Parse.ACL(Parse.User.current())
	});
	alert_trigger.save(null, {
    success: function() {
    	console.log("alert saved");
      $('#setalerts').trigger('reset');
    }
  });
});

