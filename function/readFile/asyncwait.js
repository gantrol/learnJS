const fs = require('fs').promises

async function read_file(fname) {
  let f = await fs.open(fname, 'r')
  let stat = await f.stat(fname)
  let size = stat.size
  let buffer = Buffer.alloc(size)
  let result = await f.read(buffer, 0, size, null)
  console.log(result);
}

read_file('test.txt')