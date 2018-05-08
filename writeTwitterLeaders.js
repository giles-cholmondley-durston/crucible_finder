const Twit = require("twit");
const fs = require("fs");
const moment = require("moment");

const T = new Twit({
  consumer_key: "FhTsujlJm8kwcG0xWVtfbA",
  consumer_secret: "2dMNkiZj7jSAAbqaL4DQ1NwrrL8Bq6AenZWhhFuDvk",
  access_token: "385420977-4PHHrmEPqZHz7sntKUlG6IcL28vzCB4TvVumwEz6",
  access_token_secret: "TSn5pUOg8DlSgBt8LqeSZDPXrS43g4XzG8ypgDFfjwBYz",
  timeout_ms: 60 * 1000 // optional HTTP request timeout to apply to all requests.
});

const dateLabel = moment().format("YY-MM-DD");

T.get("friends/ids", { user_id: 385420977 }, function(err, data, response) {
  fs.writeFile(`leaders/${dateLabel}.json`, JSON.stringify(data.ids), err =>
    console.log(err)
  );
});
