const Twit = require('twit');
const fs = require('fs');
const moment = require('moment');
const Queue = require('sync-queue');

const T = new Twit({
  consumer_key: 'FhTsujlJm8kwcG0xWVtfbA',
  consumer_secret: '2dMNkiZj7jSAAbqaL4DQ1NwrrL8Bq6AenZWhhFuDvk',
  access_token: '385420977-4PHHrmEPqZHz7sntKUlG6IcL28vzCB4TvVumwEz6',
  access_token_secret: 'TSn5pUOg8DlSgBt8LqeSZDPXrS43g4XzG8ypgDFfjwBYz',
  timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
});

const dateLabel = moment().format('YY-MM-DD');

const latestFriends = require('./leaders/18-05-20.json');

const getFollowersOfOneLeader = async (myFriend) => {
  let allIds = [];

  T.get('followers/ids', { user_id: myFriend }, async function getData(err, data, response) {
    allIds = await allIds.concat(data.ids);
    // Log how many friends you need to get through
    console.log(allIds.length, data.next_cursor, err && err, queue);

    await setTimeout(async () => {
      if (data.next_cursor > 0) {
        T.get('followers/ids', { user_id: myFriend, cursor: data.next_cursor }, await getData);
      } else {
        await writeFollowersForId(myFriend, allIds);
        queue.next();
      }
    }, 60000);

    return allIds;
  });
};

const writeFollowersForId = (id, allIds) => {
  const dir = `followersOfMyLeaders/${dateLabel}`;

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  fs.writeFile(`${dir}/${id}.json`, JSON.stringify(allIds), err => console.log(err));
};

const queue = new Queue();

for (const myFriend of latestFriends) {
  queue.place(() => {
    getFollowersOfOneLeader(myFriend);
  });
}

//  jq -s '[.[][]]' followersOfMyLeaders/18-05-20/*.json > manifest.json
