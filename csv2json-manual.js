const fs = require('fs');
const path = require('path');
const LineReader = require('line-by-line');

var lr = new LineReader(path.join(__dirname, 'customer-data.csv'));

var keys;
var output = [];
var lineCount = 0;

lr.on('error', function (err) {
	// 'err' contains error object
  console.log(err);
});

lr.on('line', function (line) {
	// 'line' contains the current line without the trailing newline character.
  if (lineCount == 0) {
    keys = line.split(',');
    console.log(keys);
  } else {
    // nothing for now
    var values = line.split(',');
    var tempObj = {};
    for ( i = 0; i < keys.length; i++){
      tempObj[keys[i]] = values[i];
    }
    output.push(tempObj);
  }
  lineCount++;
});

lr.on('end', function () {
	// All lines are read, file is closed now.
  fs.writeFileSync(path.join(__dirname, 'customer-data-man.json'), JSON.stringify(output, null, 4));
  // console.log(JSON.stringify(output,null,4));
  // console.log('Finished');
});
