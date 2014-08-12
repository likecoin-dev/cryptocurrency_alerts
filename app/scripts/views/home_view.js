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
		return this;
	}

});
