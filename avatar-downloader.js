var ownerName = process.argv[2];
var repoName = process.argv[3]
var request = require("request");
var fs = require("fs");

function getRepoContributors(repoOwner, repoName, cb) {
  var token = "6296725a4660670cdcfbf7e9b1187e3d3ba2ebbd";
  var theUrl = "https://api.github.com/repos/" + repoOwner + "/" +repoName + "/contributors"
  var options = {
    url: theUrl,
    headers: {
      "User-Agent": "dustyjustie"
    },
    json: true
  };

  request(options, function(err, response, body) {
    if (err) {
      throw err;
    }
    cb(body);
  }).auth(null, null, true, token);
}

getRepoContributors(ownerName, repoName, function(result){
  fs.mkdir("./avatars/", function(err) {
    if (err) {
      console.log("Directory Exists!")
    }
    result.forEach(function(user) {
      var imgUrl = user.avatar_url
      var loginName = user.login;
      downloadImageByURL(imgUrl, "./avatars/" + loginName + ".jpg")
      console.log("The image for " + loginName + " at" + imgUrl +" has been downloaded!")
    });
  });
});


function downloadImageByURL(url, filePath) {
  request(url).pipe(fs.createWriteStream(filePath))
}