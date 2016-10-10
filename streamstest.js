var http = require("http");
function readHTML (url, callback) {
  var requestOptions = {
    host: url,
    path: "/"
  };


http.get(requestOptions, (response) => {    // HTTP Response Callback

  var stringData = ""

  response.setEncoding("utf8");             // Use UTF-8 encoding

  response.on("data", function(data) {           // On Data Received
    console.log("Chunk Received. Length:", data.length);
    stringData += data
  });


  response.on("end", function() {                // On Data Completed
    console.log("Response stream complete.");
    callback(stringData);
  });

});

}
function printHTML (htmlData) {
  console.log(htmlData);
}

readHTML("www.wikipedia.com", printHTML)