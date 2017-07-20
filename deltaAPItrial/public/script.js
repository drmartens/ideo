//API Stuff
var baseURL = "http://localhost:8080";

var monthlyBitPricesArray = [];
var monthlyEthPricesArray = [];

var dayOnePriceEth;
var dayOnePriceBTC;
var todayPriceEth;
var todayPriceBTC;
var priceAPI;
var weightedToday;
var weightedDayOne;
var delta;




var bitcoinAPI = "https://apiv2.bitcoinaverage.com/indices/global/history/BTCUSD?period=monthly&?format=json";
var ethAPI = "https://apiv2.bitcoinaverage.com/indices/global/history/ETHUSD?period=monthly&?format=json";

//HTML Assets
var dayOneResult = document.getElementById('result');
var todayResult = document.getElementById('ETHresult');
var calculation = document.getElementById('calculation');

//Global Variables
var list = document.getElementById('list');
var bitAverageMonthly;
var ethAverageMonthly;
var tempPrice = [];
var tempEthPrice = [];
var weightedAverage;
var monthlyBitAverage = [];
var monthlyEthAverage = [];

(function() {
if (document.readyState != "loading") {
	test();
	getDayOnePrice("BTCUSD");
	getDayOnePrice("ETHUSD");
	getTodaysPrice("BTCUSD");
	getTodaysPrice("ETHUSD");


} else {

  document.addEventListener("DOMContentLoaded", function(){
    test();
    getDayOnePrice("BTCUSD");
	getDayOnePrice("ETHUSD");
	getTodaysPrice("BTCUSD");
	getTodaysPrice("ETHUSD");
    });

 }

// //Create a dictionary to hold a string, and the two symbols to split by
// function createMyDictionary(string,entryDelimiter,recordDelimiter) {
	
// }
})();

//Test Function for Our BackEnd API
function test() {

    $.ajax({
        method: "GET",
        url: baseURL + `/test`
    }).done(function(res) {
        console.log("Test result is " + res.message);

    })
}

function getDayOnePrice(coin){
	priceAPI = "https://apiv2.bitcoinaverage.com/indices/global/history/" + coin + "?period=monthly&format=json";

	$.ajax({
		method: "GET",
		url: priceAPI
	}).done(function(res) {
		// console.log("New price result is" + res);

		if (coin === "BTCUSD") {
			monthlyBitPricesArray = res;
			var tempArray = [];

			for (item of monthlyBitPricesArray) {
				var price = item.average;
				tempArray.push(price);
			}
			dayOnePriceBTC = tempArray[0];
			console.log("First Day/Hour BTC Price is " + dayOnePriceBTC)


		} else if (coin === "ETHUSD") {
			monthlyEthPricesArray = res;
			var tempArray = [];

			for (item of monthlyEthPricesArray) {
				var price = item.average;
				tempArray.push(price);
			}
			dayOnePriceEth = tempArray[0];
			console.log("First Day/Hour ETH Price is " + dayOnePriceEth)

		}

	})
}

function getTodaysPrice(coin) {
priceAPI = "https://apiv2.bitcoinaverage.com/indices/global/history/" + coin + "?period=monthly&format=json";

	$.ajax({
		method: "GET",
		url: priceAPI
	}).done(function(res) {
		// console.log("New price result is" + res);

		if (coin === "BTCUSD") {
			monthlyBitPricesArray = res;
				var tempArray = [];

			for (item of monthlyBitPricesArray) {
				var price = item.average;
				tempArray.push(price);
			}
			todayPriceBTC = tempArray[tempArray.length - 1]
			console.log("Today Day/Hour BTC Price is " + todayPriceBTC)


		} else if (coin === "ETHUSD") {
			monthlyEthPricesArray = res;
			var tempArray = [];

			for (item of monthlyEthPricesArray) {
				var price = item.average;
				tempArray.push(price);
				// console.log(tempArray.length);
			}
			todayPriceEth = tempArray[tempArray.length - 1]
			console.log("Today Day/Hour Eth Price is " + todayPriceEth)

		}

	})

}

function getWeightedAverageDayOne(dayOneBTCPrice,dayOneEthPrice){
var weightedBTC = dayOneBTCPrice * .7;
var weightedEth = dayOneEthPrice * .3;
weightedDayOne = weightedBTC + weightedEth;
console.log("The weighted Day One Average is: " + weightedDayOne);
dayOneResult.innerHTML = "Day One Weighted: " + weightedDayOne;
}

function getWeightedAverageToday(todayBTCPrice,todayEthPrice){
var weightedBTC = todayBTCPrice * .7;
var weightedEth = todayEthPrice * .3;
weightedToday = weightedBTC + weightedEth;
console.log("Todays weighted Average is: " + weightedToday);
todayResult.innerHTML = "Today: " + weightedToday;
}

function getDelta() {
	delta = (weightedToday - weightedDayOne)/weightedDayOne;
	console.log("The delta is: " + delta);
	calculation.innerHTML = "Delta is: " + delta;
}


function calculate() {
	getWeightedAverageDayOne(dayOnePriceBTC, dayOnePriceEth);
	getWeightedAverageToday(todayPriceBTC, todayPriceEth);
	getDelta();
}








