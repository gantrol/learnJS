// const sleeper = (timeout) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => resolve('DONE'), timeout);
//   });
// }

// let wait1 = sleeper(100);
// wait1.then(x => console.log("Done.", x));

const fs = require('fs').promises;

// you have to do nested calls any time you need the result of the previous calculation

const read_file = (fname) => {
  fs.open(fname, 'r').then((fh) => {
    fh.stat().then((stat) => {
      let buf = Buffer.alloc(stat.size);

      fh.read(buf, 0, stat.size, null)
        .then((result) => {
          console.log(`Read ${result.bytesRead} bytes: ${result.buffer.toString()}`);
        }).catch((err) => {
          console.log(`Error ${err}`);
        });
    }).catch((err) => console.log(err));
  }).catch((err) => console.log(err));
}

read_file('test.txt');