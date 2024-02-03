import { Readable, Transform, Writable } from "node:stream"

// Buffer is a built-in object that provides a way to work with binary data directly.
// Buffer: data transition between streams

class OneToHundredStream extends Readable {
  index = 1

  _read() {
    const i = this.index++

    setTimeout(() => {
      if(i > 100) {
        this.push(null)
      } else {
        const buff = Buffer.from(String(i))
        this.push(buff)
      }
    }, 1000)
  }
}

class InverseNumberString extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1

    // callback(handle the error, transformed data, )
    callback(null, Buffer.from(String(transformed)))
  }
}

// chunk, everything that is written in "Readable" = Buffer
// encoding, 
// callback, function that the "Readable" needs to call when it finishes whatever it had to do
class MultipleByTenStream extends Writable {
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10)
    callback()
  }
}

new OneToHundredStream()
  .pipe(new InverseNumberString())
 .pipe(new MultipleByTenStream())