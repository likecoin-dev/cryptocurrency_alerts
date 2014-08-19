
ltc_bid = [];
ltc_ask = [];
ltc_last = [];


var litecoinRef = new Firebase("https://publicdata-cryptocurrency.firebaseio.com/litecoin");

litecoinRef.child("bid").on("value", showBidPrice);
litecoinRef.child("ask").on("value", showAskPrice);
litecoinRef.child("last").on("value", showLastPrice);

function addLitecoin_dataPoint() { 
    var x = (new Date()).getTime(); // current time
    var o = ltc_bid[ltc_bid.length-1];
    var y = parseFloat(o.value);   
    ltc_bid_series.addPoint([x, y], false, true);
		
		var o1 = ltc_ask[ltc_ask.length-1];
    var y1 = parseFloat(o1.value);
    ltc_ask_series.addPoint([x, y1], false, true); 

		var o2 = ltc_last[ltc_last.length-1];
    var y2 = parseFloat(o2.value);
    ltc_last_series.addPoint([x, y2], true, true);
}

var ltc_bid_series;
var ltc_ask_series;
var ltc_last_series; 

$(function () {
	    Highcharts.setOptions({
	        global : { useUTC : false }
	    });

	    // Create the chart
	    $('.ltc_chart').highcharts('StockChart', {
	        chart : {
	            events : {
	                load : function () {
	                    // set up the updating of the chart each second
	                    ltc_bid_series = this.series[0];
	                    ltc_ask_series = this.series[1];
	                    ltc_last_series = this.series[2];
	                    setInterval(addLitecoin_dataPoint , 2000);
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
	            text : 'Litecoin Live Data'
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
    var yCount = ltc_bid.length;

    for (i; i <= 0; i += 1) {
				if ( yCount < Math.abs(i) ){
						// Not enought point, can't add to array
				}else {
						data.push([
		           time + i * 1000, // push an x (time
		           ltc_bid[Math.abs(i)]
		        ]);
				} 
    }
    return data;
}

var template = ''; 

var fire_data = '';

function showAskPrice(snapshot) {

		template = Handlebars.compile($("#ltc_feed").html());

		fire_data = {
				price: snapshot.name(),
				value: snapshot.val()
		}
		if(ltc_ask.length != 0){
				var ask_length = ltc_ask.length - 1;
				var ask_last = ltc_ask[ask_length].value;

				if(snapshot.val() > ask_last){
						fire_data.value_color = 'value_color_green';
				} else if (snapshot.val() < ask_last){
						fire_data.value_color = 'value_color_red';
				}
		}

		$(".ltc_ask_action").prepend(template(fire_data));
		ltc_ask.push(fire_data);
}

function showLastPrice(snapshot) {
		var template = Handlebars.compile($("#ltc_feed").html());

		fire_data = {
				price: snapshot.name(),
				value: snapshot.val()
		}

		if(btc_last.length != 0){
				var bid_length = ltc_last.length - 1;
				var bid_last = ltc_last[bid_length].value;

				if(snapshot.val() > bid_last){
						fire_data.value_color = 'value_color_green';
				} else if (snapshot.val() < bid_last){
						fire_data.value_color = 'value_color_red';
				}
		}

		$(".ltc_last_action").prepend(template(fire_data));
		ltc_last.push(fire_data);
}


function showBidPrice(snapshot) {
		var template = Handlebars.compile($("#ltc_feed").html());

		fire_data = {
				price: snapshot.name(),
				value: snapshot.val()
		}

		if(btc_bid.length != 0){
				var bid_length = ltc_bid.length - 1;
				var bid_last = ltc_bid[bid_length].value;

				if(snapshot.val() > bid_last){
						fire_data.value_color = 'value_color_green';
				} else if (snapshot.val() < bid_last){
						fire_data.value_color = 'value_color_red';
				}
		}

		$(".ltc_bid_action").prepend(template(fire_data));
		ltc_bid.push(fire_data);

}
