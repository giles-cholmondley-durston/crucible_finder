const Twit = require("twit");
const fs = require("fs");

const T = new Twit({
  consumer_key: "FhTsujlJm8kwcG0xWVtfbA",
  consumer_secret: "2dMNkiZj7jSAAbqaL4DQ1NwrrL8Bq6AenZWhhFuDvk",
  access_token: "385420977-4PHHrmEPqZHz7sntKUlG6IcL28vzCB4TvVumwEz6",
  access_token_secret: "TSn5pUOg8DlSgBt8LqeSZDPXrS43g4XzG8ypgDFfjwBYz",
  timeout_ms: 60 * 1000 // optional HTTP request timeout to apply to all requests.
});

const latestFriends = require("./leaders/18-05-20.json");

const getFollowersOfOneLeader = async (myFriend, callback) => {
  let allIds = [];

  T.get("followers/ids", { user_id: myFriend }, async function getData(
    err,
    data,
    response
  ) {
    allIds = await allIds.concat(data.ids);
    console.log(allIds.length, data["next_cursor"], err && err);

    await setTimeout(async () => {
      if (data["next_cursor"] > 0) {
        T.get(
          "followers/ids",
          { user_id: myFriend, cursor: data["next_cursor"] },
          await getData
        );
      } else {
        return allIds;
      }
    }, 60000);

    callback();
  });
};

const writeFollowersForId = (id, allIds) =>
  fs.writeFile(`followersOfMyLeaders/${id}.json`, JSON.stringify(allIds), err =>
    console.log(err)
  );

function getAllData(myTestFriends) {
  // for (const myFriend of myTestFriends) {
  //   const allIds = await getFollowersOfOneLeader(myFriend);
  //   await writeFollowersForId(myFriend, allIds);
  // }
  function callFirstInArray() {
    var myFriend = myTestFriends.shift(); //removes the first from the array, and stores in variable 'url'
    console.log(myFriend);

    //do ajax work, and set callback function:
    getFollowersOfOneLeader(myFriend, function() {
      if (myTestFriends.length > 0) {
        //callback
        callFirstInArray();
      }
    });
  }
  callFirstInArray();
}

const myTestFriends = [latestFriends[0], latestFriends[1]];
getAllData(myTestFriends);
