var LogInView = Backbone.View.extend({

	className: "login_container",

	events: {
		"submit .form1": 'signUpUser',
		"submit .form2": 'logInUser'
	},

	initialize: function() {
		this.render();
    console.log("login page initialized");
	},

	render: function() {
		console.log("in login render function")
		var source = $("#login_template").html();
		this.$el.html(source);

		$('#hero-unit').hide();
		$('footer').hide();


		return this;
	},

	signUpUser: function(e) {
		e.preventDefault();
		var user = new Parse.User();
		user.set("username", $("#uname").val());
		user.set("password", $("#password").val());
		user.set("email", $("#email").val());


		user.signUp(null, {
		  success: function(user) {
		  	//Navigate to home page
		    currentUser = Parse.User.current();
        start.navigate('', {trigger: true});
		    console.log('signedUp');
		  },
		  error: function(user, error) {
		    // Show the error message somewhere and let the user try again.
		    console.log("Error: " + error.code + " " + error.message);
		  }
		});

		$(this).trigger('reset');
	},

	logInUser: function(e) {
		e.preventDefault();
		var myname = $("#rname").val();
		var mypass = $("#rpassword").val();
		Parse.User.logIn(myname, mypass, {
		  success: function(user) {
		    // Go HOME dude
		    currentUser = Parse.User.current();
		    start.navigate("", { trigger: true });
		    console.log("Im Logged In");
		  },
		  error: function(user, error) {
		    // The login failed. Check error to see why.
		  }
		});

		$(this).trigger('reset');
	}


});


var HomeView = Backbone.View.extend({

	className: "currency_container", 

	events: {

	},

	initialize: function() {
		this.render();
    console.log("home page initialized");
	},

	render: function() {
		console.log("in home render function")
		var source = $("#currency_template").html();
		this.$el.html(source)

		$('#hero-unit').show();
		$('footer').show();

		return this;
	}

});

var PageRouter = Backbone.Router.extend({

  routes: {
    "": "home_page",
    "login": "login_page"
  },

  initialize: function () {
   	
  },

  home_page: function () {
  	console.log(currentUser);
  	if(!currentUser) return start.navigate('login', {trigger: true});
  	showUser(currentUser);
    var home_view = new HomeView();
    $('#main').html(home_view.el);
  },

	login_page: function () {
		if(currentUser) return start.navigate("", {trigger: true});
  	var login_view = new LogInView();
  	$('#main').html(login_view.el);
  	new LogInView();
	}

});
 

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