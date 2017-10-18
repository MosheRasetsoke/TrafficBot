//
// All required modules
var twit = require("twit");
var config = require("./config.js");
var Twitter = new twit(config);
//
function SearchAndReTweet(){
// RETWEET BOT ==========================

// find latest tweet according the query 'q' in params
    var params = {
        q: '#AATrafficCPT, #ArriveAlive, #AATrafficJHB, #AATrafficCTN, AATrafficDBN, AATrafficPTA, #JHBTraffic, #PTATraffic',  // REQUIRED
        result_type: 'recent',
        lang: 'en'
    }
    // for more parametes, see: https://dev.twitter.com/rest/reference/get/search/tweets

    Twitter.get('search/tweets', params, function(err, data) {
      // if there no errors
        if (!err) {
          // grab ID of tweet to retweet
            var retweetId = data.statuses[0].id_str;
            // Tell TWITTER to retweet
            Twitter.post('statuses/retweet/:id', {
                id: retweetId
            }, function(err, response) {
                if (response) {
                    console.log('Retweeted!!!');
                }
                // if there was an error while tweeting
                if (err) {
                    console.log('Something went wrong while RETWEETING... Duplication maybe...');
                }else{
					console.log("Retweeted Succesfully!!!");
				}
            });
        }
        // if unable to Search a tweet
        else {
          console.log('Something went wrong while SEARCHING...');
        }
	});
}


SearchAndReTweet();