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
		currency: $('.currency option:selected').val(),
		limit: $('.limit option:selected').val(),
		price: $('input[name="price"]').val(),
		alert_type: $('.alert_type option:selected').val(),
		user: Parse.User.current(),
    ACL: new Parse.ACL(Parse.User.current())
	});
	alert_trigger.save(null, {
    success: function() {
    	console.log("alert saved");
      $('#setalerts').trigger('reset');

      var template = Handlebars.compile($('#saved_alerts').html());
      var rendered = template(alert_trigger.toJSON());
      $("#alert_bottom_container").append(rendered);
    }
  });
});

var query = new Parse.Query(Alert);
query.equalTo("user", currentUser);
query.find({
  success: function(results) {
    // alert("Successfully retrieved ");
    var template = Handlebars.compile($("#saved_alerts").html());
    _.each(results, function (a) {

      

      // var currency = a.get("currency");
      // var limit = a.get("limit");
      // var price = a.get("price");
      // var alert_type = a.get("alert_type");

      // console.log(currency, limit, price, alert_type);


      $("#alert_bottom_container").prepend(template(a.toJSON()));

    });
  },
  error: function(error) {
    // alert("Error");
  }
});

$(document).on('click', ".x", function () {
  var self = $(this);
  var id = $(this).attr("id");
  query.equalTo("objectId", id);
  query.find({
    success: function(results) {
      results[0].destroy({
        success: function(myObject) {
          // The object was deleted from the Parse Cloud.
          self.parent().fadeOut();
        },
        error: function(myObject, error) {
          // The delete failed.
          // error is a Parse.Error with an error code and description.
        }
      });
    },
    error: function(error) {
      alert("Error");
    }
  });
});


