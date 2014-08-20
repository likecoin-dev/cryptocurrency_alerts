var PageRouter = Backbone.Router.extend({

  routes: {
    "": "home_page",
    "login": "login_page"
  },

  initialize: function () {
   	
  },

  home_page: function () {
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
 
