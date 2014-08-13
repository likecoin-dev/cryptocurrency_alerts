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

