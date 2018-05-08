const Twit = require("twit");
const fs = require("fs");

const T = new Twit({
  consumer_key: "FhTsujlJm8kwcG0xWVtfbA",
  consumer_secret: "2dMNkiZj7jSAAbqaL4DQ1NwrrL8Bq6AenZWhhFuDvk",
  access_token: "385420977-4PHHrmEPqZHz7sntKUlG6IcL28vzCB4TvVumwEz6",
  access_token_secret: "TSn5pUOg8DlSgBt8LqeSZDPXrS43g4XzG8ypgDFfjwBYz",
  timeout_ms: 60 * 1000 // optional HTTP request timeout to apply to all requests.
});

const latestFriends = require("./leaders/18-05-08.json");

const myTestFriends = [latestFriends[0], latestFriends[1]];

for (const myFriend of myTestFriends) {
  let allIds = [];

  T.get("followers/ids", { user_id: myFriend }, function getData(
    err,
    data,
    response
  ) {
    allIds = allIds.concat(data.ids);
    console.log(allIds.length, data["next_cursor"], err);

    setTimeout(() => {
      if (data["next_cursor"] > 0) {
        T.get(
          "followers/ids",
          { user_id: myFriend, cursor: data["next_cursor"] },
          getData
        );
      } else {
        fs.writeFile(
          `followersOfMyLeaders/${myFriend}.json`,
          JSON.stringify(allIds),
          err => console.log(err)
        );
      }
    }, 60000);
  });
}
