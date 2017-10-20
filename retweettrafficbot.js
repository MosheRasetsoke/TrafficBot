//
// All required modules
var twit = require("twit");
var config = require("./config.js");
var Twitter = new twit(config);
//
//Set Date
var date = new Date();
var year = date.getFullYear();
var month = date.getMonth();
var day = date.getDay();
var fulldate = year + "/" + month + "/" + day;
//
// find latest tweet according the query 'q' in params
var queryArray = ["#AATrafficCPT", "#ArriveAlive", "#AATrafficJHB", "#AATrafficCTN", "#AATrafficDBN", "#AATrafficPTA", "#JHBTraffic", "#PTATraffic"];


//
function SearchAndReTweet(params){
	// RETWEET BOT ==========================

    

    Twitter.get('search/tweets', params, function(err, data) {
      // if there no errors
        if (!err) {
          // grab ID of tweet to retweet
            var retweetStatuses = data.statuses; //[0].id_str;
            // Tell TWITTER to retweet
			for(var i = 0; i < retweetStatuses.length; i++){
				var retweetId = retweetStatuses[i].id_str;
				Twitter.post('statuses/retweet/:id', {
					id: retweetId
				}, function(err, response) {
					if (response) {
						console.log(fulldate + ' - Retweeted!!!');
					}
					// if there was an error while tweeting
					if (err) {
						console.log(fulldate + ' - Something went wrong while RETWEETING... Duplication maybe...');
					}else{
						console.log(fulldate + " - Retweeted Succesfully!!!");
					}
				});
			}
        }
        // if unable to Search a tweet
        else {
          console.log('Something went wrong while SEARCHING...');
        }
	});
}

for(var i = 0; i < queryArray.length; i++){
	// for more parametes, see: https://dev.twitter.com/rest/reference/get/search/tweets
	var params = {
		q: queryArray[i],  // REQUIRED
		result_type: 'recent',
		lang: 'en',
		count: 5
	}
	//
	SearchAndReTweet(params);
}
