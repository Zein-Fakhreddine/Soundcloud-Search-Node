//Create variable request activating the "request" module
var request = require('request');
//Set the souncloud api tracks url with variables to replace
var searchURL = "http://api.soundcloud.com/tracks.json?client_id=7c89e606e88c94ff47bfd84357e5e9f4&q=SEARCH_TERM&limit=LIMIT_TERM";

/**
 * Create the function that returns the tracks in the JSON format with a callback function
 * @param search The String of the song the user wants to search ex "Avicii"
 * @param limit "The limit on the amount of tracks to get (1 - 100)
 * @param callback Teh callback function which returns an array of tracks in JSON format
 */
exports.getTracks = function (search, limit, callback){
    if(typeof search != 'string') throw "Seach term is not type of string";
    if(isNaN(limit)) throw "Not a number";
    if(limit > 100 || limit < 1) throw "Limit must be between 1 and 100"
    var spaces  = search.split(" ");
    for(var  i = 0; i < spaces.length; i++){
            search = search.replace(" ", "%20");
    }
    searchURL =  searchURL.replace("SEARCH_TERM", search).replace("LIMIT_TERM", limit);
    request({
        url: searchURL
    }, function (error, response, body) {
        //Check for errors
        if(error) throw new Error(error);
        //Make sure there is no error and make sure the page is loaded
        if (!error && response.statusCode === 200){
            var checking = String(body).replace("[", "").replace("]", "").split("{\"download_url\"");
            var tracks  = [];
            for(var i = 0; i < checking.length; i++){
                var track = checking[i];
                if(track != "") {
                    track = "{\"download_url\"" + track;
                    track = track.slice(0, track.length - 1) + track.slice(track.length);

                    if (track.charAt(track.length - 1) == "}")
                        tracks.push(JSON.parse(track));
                }
            }
            callback(tracks);
        }
    })
}


