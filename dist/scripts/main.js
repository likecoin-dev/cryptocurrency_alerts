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
 


/**
 * Dark theme for Highcharts JS
 * @author Torstein Honsi
 */

// Load the fonts
Highcharts.createElement('link', {
   href: 'http://fonts.googleapis.com/css?family=Unica+One',
   rel: 'stylesheet',
   type: 'text/css'
}, null, document.getElementsByTagName('head')[0]);

Highcharts.theme = {
   colors: ["#2b908f", "#90ee7e", "#f45b5b", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
      "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
   chart: {
      backgroundColor: {
         linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
         stops: [
            [0, '#2a2a2b'],
            [1, '#3e3e40']
         ]
      },
      style: {
         fontFamily: "'Unica One', sans-serif"
      },
      plotBorderColor: '#606063'
   },
   title: {
      style: {
         color: '#E0E0E3',
         textTransform: 'uppercase',
         fontSize: '20px'
      }
   },
   subtitle: {
      style: {
         color: '#E0E0E3',
         textTransform: 'uppercase'
      }
   },
   xAxis: {
      gridLineColor: '#707073',
      labels: {
         style: {
            color: '#E0E0E3'
         }
      },
      lineColor: '#707073',
      minorGridLineColor: '#505053',
      tickColor: '#707073',
      title: {
         style: {
            color: '#A0A0A3'

         }
      }
   },
   yAxis: {
      gridLineColor: '#707073',
      labels: {
         style: {
            color: '#E0E0E3'
         }
      },
      lineColor: '#707073',
      minorGridLineColor: '#505053',
      tickColor: '#707073',
      tickWidth: 1,
      title: {
         style: {
            color: '#A0A0A3'
         }
      }
   },
   tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      style: {
         color: '#F0F0F0'
      }
   },
   plotOptions: {
      series: {
         dataLabels: {
            color: '#B0B0B3'
         },
         marker: {
            lineColor: '#333'
         }
      },
      boxplot: {
         fillColor: '#505053'
      },
      candlestick: {
         lineColor: 'white'
      },
      errorbar: {
         color: 'white'
      }
   },
   legend: {
      itemStyle: {
         color: '#E0E0E3'
      },
      itemHoverStyle: {
         color: '#FFF'
      },
      itemHiddenStyle: {
         color: '#606063'
      }
   },
   credits: {
      style: {
         color: '#666'
      }
   },
   labels: {
      style: {
         color: '#707073'
      }
   },

   drilldown: {
      activeAxisLabelStyle: {
         color: '#F0F0F3'
      },
      activeDataLabelStyle: {
         color: '#F0F0F3'
      }
   },

   navigation: {
      buttonOptions: {
         symbolStroke: '#DDDDDD',
         theme: {
            fill: '#505053'
         }
      }
   },

   // scroll charts
   rangeSelector: {
      buttonTheme: {
         fill: '#505053',
         stroke: '#000000',
         style: {
            color: '#CCC'
         },
         states: {
            hover: {
               fill: '#707073',
               stroke: '#000000',
               style: {
                  color: 'white'
               }
            },
            select: {
               fill: '#000003',
               stroke: '#000000',
               style: {
                  color: 'white'
               }
            }
         }
      },
      inputBoxBorderColor: '#505053',
      inputStyle: {
         backgroundColor: '#333',
         color: 'silver'
      },
      labelStyle: {
         color: 'silver'
      }
   },

   navigator: {
      handles: {
         backgroundColor: '#666',
         borderColor: '#AAA'
      },
      outlineColor: '#CCC',
      maskFill: 'rgba(255,255,255,0.1)',
      series: {
         color: '#7798BF',
         lineColor: '#A6C7ED'
      },
      xAxis: {
         gridLineColor: '#505053'
      }
   },

   scrollbar: {
      barBackgroundColor: '#808083',
      barBorderColor: '#808083',
      buttonArrowColor: '#CCC',
      buttonBackgroundColor: '#606063',
      buttonBorderColor: '#606063',
      rifleColor: '#FFF',
      trackBackgroundColor: '#404043',
      trackBorderColor: '#404043'
   },

   // special colors for some of the
   legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
   background2: '#505053',
   dataLabelsColor: '#B0B0B3',
   textColor: '#C0C0C0',
   contrastTextColor: '#F0F0F3',
   maskColor: 'rgba(255,255,255,0.3)'
};

// Apply the theme
Highcharts.setOptions(Highcharts.theme);



btc_bid = [];
btc_ask = [];
btc_last = [];

var bitcoinRef = new Firebase("https://publicdata-cryptocurrency.firebaseio.com/bitcoin");

bitcoinRef.child("ask").on("value", showAskPrice);
bitcoinRef.child("last").on("value", showLastPrice); 
bitcoinRef.child("bid").on("value", showBidPrice);

function addBitCoin_dataPoint() { 
    var x = (new Date()).getTime(); // current time
    var o = btc_bid[btc_bid.length-1];
    var y = parseFloat(o.value);   
    bid_series.addPoint([x, y], false, true);
		
		var o1 = btc_ask[btc_ask.length-1];
    var y1 = parseFloat(o1.value);
    ask_series.addPoint([x, y1], false, true); 

		var o2 = btc_last[btc_last.length-1];
    var y2 = parseFloat(o2.value);
    last_series.addPoint([x, y2], true, true);
} 

var bid_series = null;
var ask_series = null;
var last_series = null; 

$(function () {
	    Highcharts.setOptions({
	        global : { useUTC : false }
	    });

	    // Create the chart
	    $('.btc_chart').highcharts('StockChart', {
	        chart : {
	            events : {
	                load : function () {
	                    // set up the updating of the chart each second
	                    bid_series = this.series[0];
	                    ask_series = this.series[1];
	                    last_series = this.series[2];
	                    setInterval(addBitCoin_dataPoint , 2000);
	                }
	            }
	        } ,
	        rangeSelector: {
	            buttons: [{
	                count: 1,
	                type: 'minute',
	                text: '1M'
	            }, {
	            //     count: 5,
	            //     type: 'minute',
	            //     text: '5M'
	            // }, {
	                type: 'all',
	                text: 'All'
	            }],
	            inputEnabled: false,
	            selected: 0
	        },
	        title : {
	            text : 'Bitcoin Live Data'
	        },
	        exporting: {
	            enabled: false
	        },
	        series : [{
	            name : 'Bid Price',
	            data : [0,0]
        	}
        	,
        	{
	            name : 'Ask Price',
	            data : [0,0]
	        },
	        {
	            name : 'Last Price',
	            data : [0,0]
        	}
        	]
    });

});


function generateData() {
    // generate an array of random data
    var data = []; // holds our points
    var time = (new Date()).getTime();
    var i = -9; // order of magnitude
    var yCount = btc_bid.length;

    for (i; i <= 0; i += 1) {
				if ( yCount < Math.abs(i) ){
						// Not enought point, can't add to array
				}else {
						data.push([
		           time + i * 1000, // push an x (time
		           btc_bid[Math.abs(i)]
		        ]);
				} 
    }
    return data;
}

var template = ''; 

var fire_data = '';

function showAskPrice(snapshot) {

		template = Handlebars.compile($("#btc_feed").html());

		fire_data = {
				price: snapshot.name(),
				value: snapshot.val()
		}
		if(btc_ask.length != 0){
				var ask_length = btc_ask.length - 1;
				var ask_last = btc_ask[ask_length].value;

				if(snapshot.val() > ask_last){
						fire_data.value_color = 'value_color_green';
				} else if (snapshot.val() < ask_last){
						fire_data.value_color = 'value_color_red';
				}
		}

		$(".btc_ask_action").prepend(template(fire_data));
		btc_ask.push(fire_data);
}


function showLastPrice(snapshot) {
		var template = Handlebars.compile($("#btc_feed").html());

		fire_data = {
				price: snapshot.name(),
				value: snapshot.val()
		}

		if(btc_last.length != 0){
				var bid_length = btc_last.length - 1;
				var bid_last = btc_last[bid_length].value;

				if(snapshot.val() > bid_last){
						fire_data.value_color = 'value_color_green';
				} else if (snapshot.val() < bid_last){
						fire_data.value_color = 'value_color_red';
				}
		}

		$(".btc_last_action").prepend(template(fire_data));
		btc_last.push(fire_data);
}


function showBidPrice(snapshot) {
		var template = Handlebars.compile($("#btc_feed").html());

		fire_data = {
				price: snapshot.name(),
				value: snapshot.val()
		}

		if(btc_bid.length != 0){
				var bid_length = btc_bid.length - 1;
				var bid_last = btc_bid[bid_length].value;

				if(snapshot.val() > bid_last){
						fire_data.value_color = 'value_color_green';
				} else if (snapshot.val() < bid_last){
						fire_data.value_color = 'value_color_red';
				}
		}

		$(".btc_bid_action").prepend(template(fire_data));
		btc_bid.push(fire_data);

}
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