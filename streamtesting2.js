var request = require("request");

function readHTML(url, callback) {

  request(url, function(err, response, body) {
    if (err) {
      throw err;
    }
    callback(body);
  });
}

function printHTML(htmlData) {
  console.log(htmlData);
}



readHTML("http://www.example.com", printHTML);