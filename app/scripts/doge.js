
doge_bid = [];
doge_ask = [];
doge_last = [];

var dogecoinRef = new Firebase("https://publicdata-cryptocurrency.firebaseio.com/dogecoin");
dogecoinRef.child("bid").on("value", showBidPrice);
dogecoinRef.child("ask").on("value", showAskPrice);
dogecoinRef.child("last").on("value", showLastPrice);

function addDogecoin_dataPoint() { 
    var x = (new Date()).getTime();
    var o = doge_bid[doge_bid.length-1];
    var y = parseFloat(o.value);   
    doge_bid_series.addPoint([x, y], false, true);
		
		var o1 = doge_ask[doge_ask.length-1];
    var y1 = parseFloat(o1.value);
    doge_ask_series.addPoint([x, y1], false, true); 

		var o2 = doge_last[doge_last.length-1];
    var y2 = parseFloat(o2.value);
    doge_last_series.addPoint([x, y2], true, true);
} 

var doge_bid_series;
var doge_ask_series;
var doge_last_series;

$(function () {
	    Highcharts.setOptions({
	        global : { useUTC : false }
	    });

	    // Create the chart
	    $('.doge_chart').highcharts('StockChart', {
	        chart : {
	            events : {
	                load : function () {
	                    // set up the updating of the chart each second
	                    doge_bid_series = this.series[0];
	                    doge_ask_series = this.series[1];
	                    doge_last_series = this.series[2];
	                    setInterval(addDogecoin_dataPoint , 2000);
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
	            text : 'Dogecoin Live Data'
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
    var yCount = doge_bid.length;

    for (i; i <= 0; i += 1) {
				if ( yCount < Math.abs(i) ){
						// Not enought point, can't add to array
				}else {
						data.push([
		           time + i * 1000, // push an x (time
		           doge_bid[Math.abs(i)]
		        ]);
				} 
    }
    return data;
}


var template = ''; 

var fire_data = '';

function showAskPrice(snapshot) {

		template = Handlebars.compile($("#doge_feed").html());

		fire_data = {
				price: snapshot.name(),
				value: snapshot.val()
		}
		if(doge_ask.length != 0){
				var ask_length = doge_ask.length - 1;
				var ask_last = doge_ask[ask_length].value;

				if(snapshot.val() > ask_last){
						fire_data.value_color = 'value_color_green';
				} else if (snapshot.val() < ask_last){
						fire_data.value_color = 'value_color_red';
				}
		}

		$(".doge_ask_action").prepend(template(fire_data));
		doge_ask.push(fire_data);
}

function showLastPrice(snapshot) {
		var template = Handlebars.compile($("#doge_feed").html());

		fire_data = {
				price: snapshot.name(),
				value: snapshot.val()
		}

		if(doge_last.length != 0){
				var bid_length = doge_last.length - 1;
				var bid_last = doge_last[bid_length].value;

				if(snapshot.val() > bid_last){
						fire_data.value_color = 'value_color_green';
				} else if (snapshot.val() < bid_last){
						fire_data.value_color = 'value_color_red';
				}
		}

		$(".doge_last_action").prepend(template(fire_data));
		doge_last.push(fire_data);
}


function showBidPrice(snapshot) {
		var template = Handlebars.compile($("#doge_feed").html());

		fire_data = {
				price: snapshot.name(),
				value: snapshot.val()
		}

		if(doge_bid.length != 0){
				var bid_length = doge_bid.length - 1;
				var bid_last = doge_bid[bid_length].value;

				if(snapshot.val() > bid_last){
						fire_data.value_color = 'value_color_green';
				} else if (snapshot.val() < bid_last){
						fire_data.value_color = 'value_color_red';
				}
		}

		$(".doge_bid_action").prepend(template(fire_data));
		doge_bid.push(fire_data);

}





