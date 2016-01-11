# Soundcloud-Search-Node

#Description:
Gets tracks that match a search name given by the user from the Soundcloud database.

#Download:
NPM URL: 
Console Command: npm install soundcloud-search-node

#ussage:
Example:
'''node
var scSearch = require('soundcloud-search-node');
scSearch.getTracks("Avicii", 10, function callback(tracks){
  for(var i = 0; i < tracks.length; i++){
      console.log(tracks[i].genre);
  }
});
'''


