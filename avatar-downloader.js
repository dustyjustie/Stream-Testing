var ownerName = process.argv[2];
var repoName = process.argv[3];
var request = require("request"); // we npm'd request, helps us scrape from a resource
var fs = require("fs"); //built into node and its code that saves files to local

//function that gets the contributors, takes in name and repo via process.argv
function getRepoContributors(repoOwner, repoName, cb) {
  var token = "6296725a4660670cdcfbf7e9b1187e3d3ba2ebbd"; //token helps us access github multiple times
  var theUrl = "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors";
  //url is a link to github api, then plugs in owner and repo name, which gives us the path to that place (contributors)

//key/value pairs or information is sent to server, so that the server has the necessary sorted info to find what you are looking for.
  var options = {
    url: theUrl,
    headers: {
      "User-Agent": "dustyjustie"
    },
    json: true
  };

  //request func which takes the options and a callback function, always with err, resp, body
  request(options, function(err, response, body) {
    if (err) {
      throw err;
    }
    cb(body); //we run body/content through CB, which is a argument in our MAIN function
  }).auth(null, null, true, token); // gives us authorization to access API
}
function downloadImageByURL(url, filePath) {
  request(url).pipe(fs.createWriteStream(filePath));
  // function here takes arguments, then request the url and moves files from temp stream to file.
}

// our main function w/ 3 parameters 1 and 2 from argv... then essentially func(result) = cd(body)
getRepoContributors(ownerName, repoName, function(result){
  fs.mkdir("./avatars/", function(err) { //makes directory at root --> up level, built in error function
    if (err) {
      console.log("Directory Exists!");
    }
    //results (essentially body) is being looped by for each
    // for each has a set function(numbers, index, array) and user represents that first argument
    // we create two var's which tap into user/numbers by user.avatar_url / login name
    // then we call downloadImageByURL, which is defined above. then we pass imgURL, and file path
    // note: file path must be constructed yourself
    // after we console log that the image has been downloaded (is async from the actual function)
    //
    result.forEach(function(user) {
      var imgUrl = user.avatar_url;
      var loginName = user.login;
      downloadImageByURL(imgUrl, "./avatars/" + loginName + ".jpg");
      console.log("The image for " + loginName + " at" + imgUrl + " has been downloaded!");
    });
  });
});