
btc_bid = [];
btc_ask = [];
btc_last = [];

var bitcoinRef = new Firebase("https://publicdata-cryptocurrency.firebaseio.com/bitcoin");

bitcoinRef.child("ask").on("value", showAskPrice);
bitcoinRef.child("last").on("value", showLastPrice); 
bitcoinRef.child("bid").on("value", showBidPrice);

function addBitcoin_dataPoint() { 
    var x = (new Date()).getTime(); // current time
    var o = btc_bid[btc_bid.length-1];
    var y = parseFloat(o.value);   
    btc_bid_series.addPoint([x, y], false, true);
		
		var o1 = btc_ask[btc_ask.length-1];
    var y1 = parseFloat(o1.value);
    btc_ask_series.addPoint([x, y1], false, true); 

		var o2 = btc_last[btc_last.length-1];
    var y2 = parseFloat(o2.value);
    btc_last_series.addPoint([x, y2], true, true);
} 

var btc_bid_series;
var btc_ask_series;
var btc_last_series; 

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
	                    btc_bid_series = this.series[0];
	                    btc_ask_series = this.series[1];
	                    btc_last_series = this.series[2];
	                    setInterval(addBitcoin_dataPoint , 2000);
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