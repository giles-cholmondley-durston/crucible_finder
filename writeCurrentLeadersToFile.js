const Twit = require("twit");
const fs = require("fs");
const { MY_USER_ID } = require("./constants");

const T = new Twit({
  consumer_key: "FhTsujlJm8kwcG0xWVtfbA",
  consumer_secret: "2dMNkiZj7jSAAbqaL4DQ1NwrrL8Bq6AenZWhhFuDvk",
  access_token: "385420977-4PHHrmEPqZHz7sntKUlG6IcL28vzCB4TvVumwEz6",
  access_token_secret: "TSn5pUOg8DlSgBt8LqeSZDPXrS43g4XzG8ypgDFfjwBYz",
  timeout_ms: 60 * 1000 // optional HTTP request timeout to apply to all requests.
});

T.get(
  "friends/ids",
  {
    user_id: MY_USER_ID
  },
  function(err, data, response) {
    fs.writeFile(`leaders/${Date.now()}.json`, JSON.stringify(data), err =>
      console.log(err)
    );
  }
);
