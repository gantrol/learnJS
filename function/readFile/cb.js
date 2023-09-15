const fs = require('fs')

const read_file = (fname, cb) => {
  fs.stat(fname, (err, status) => {
    fs.open(fname, 'r', (err, fd) => {
      // What is buff?
      let inbuf = Buffer.alloc(status.size)
      fs.read(fd, inbuf, 0, status.size, null, (err, bytesRead, buffer) => {
        cb(buffer)
      })
    })
  })
}

read_file('test.txt', (result) => {
  console.log(`Result is ${result.toString()}`)
})