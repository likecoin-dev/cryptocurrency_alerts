var PageRouter = Backbone.Router.extend({

  routes: {
    "": "home_page",
    "login": "login_page"
  },

  initialize: function () {
   	
  },

  home_page: function () {
    var home_view = new HomeView();
    $('#main').html(home_view.el);
  },

	login_page: function () {
  	var login_view = new LogInView();
  	$('#main').html(login_view.el);
	}

});
 
