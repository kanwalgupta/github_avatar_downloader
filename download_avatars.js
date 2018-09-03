var request = require('request');
var secrets = require('./secrets.js');
var fs = require('fs');

function getRepoContributors(repoOwner, repoName, cb) {
    var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization' : secrets.GITHUB_TOKEN
    }
  };
  request(options, function(err, res, body) {
    cb(err, JSON.parse(body));
  });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  result.forEach(function(contributor){
    downloadImageByURL(contributor.avatar_url,('avatars/'+contributor.login));
  });
});

function downloadImageByURL(url, filePath) {
  request.get(url)               // Note 1
       .on('error', function (err) {                                   // Note 2
         throw err;
       })
       .pipe(fs.createWriteStream(filePath));               // Note 4

}