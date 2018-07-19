const _ = require('lodash');
const manifest = require('./manifest.json');
const fs = require('fs');

const countedManifest = _.countBy(manifest);

const sorted = _
  .chain(countedManifest)
  .map((cnt, id) => ({
    id,
    count: cnt,
  }))
  .sortBy('count')
  .value();

const newSorted = sorted
  .filter(item => item.count > 25 && item.count < 40)
  .filter(item => item.id.length < 11);

fs.writeFile('./countedManifest.json', JSON.stringify(newSorted), err => err && console.log(err));
