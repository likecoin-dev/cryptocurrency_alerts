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