const Twitter = require('twitter');
let userIDs = require('./countedManifest.json');
const _ = require('lodash');

const credObj = {
  consumer_key: 'FhTsujlJm8kwcG0xWVtfbA',
  consumer_secret: '2dMNkiZj7jSAAbqaL4DQ1NwrrL8Bq6AenZWhhFuDvk',
  access_token_key: '385420977-4PHHrmEPqZHz7sntKUlG6IcL28vzCB4TvVumwEz6',
  access_token_secret: 'TSn5pUOg8DlSgBt8LqeSZDPXrS43g4XzG8ypgDFfjwBYz',
};

const client = new Twitter(credObj);

userIDs = userIDs.map(userID => Number(userID.id)).join();

const getProcessedData = (data) => {
  const newData = data
    .map(newUser => ({
      friends_count: newUser.friends_count,
      screen_name: newUser.screen_name,
      followers_count: newUser.followers_count,
    }))
    .filter(datum => datum.friends_count < 1500)
    .filter(datum => datum.followers_count < 500);

  console.log(_.sortBy(newData, 'friends_count'));
};

const params = { user_id: userIDs };
client.get('users/lookup', params).then((output) => {
  getProcessedData(output);
});
