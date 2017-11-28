const fs = require('fs');
const path = require('path');
const csv2json = require('csvtojson');

var jsonObj;
var count = 0;

csv2json()
    .fromFile(path.join(__dirname, 'customer-data.csv'))
    .on('json', (jsonObj) => {
      count++;
    })
    .on('end_parsed', (jsonObj) =>{
      fs.writeFileSync(path.join(__dirname, 'customer-data.json'), JSON.stringify(jsonObj, null, 2));
      console.log('end_parsed');
    })
    .on('done', (error) => {
      console.log('done');
    })
