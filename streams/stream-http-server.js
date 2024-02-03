import http from 'node:http'
import { Transform } from 'node:stream'

class InverseNumberString extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1

    console.log('Here transformed:', transformed)

    // callback(handle the error, transformed data, )
    callback(null, Buffer.from(String(transformed)))
  }
}

// request => Readable Stream
// response => Writable Stream
const server = http.createServer(async (request, response) => {
  const buffers = []

  for await (const chunk of request) {
    buffers.push(chunk)
  }

  const fullStreamContent = Buffer.concat(buffers).toString()

  console.log(fullStreamContent)

  return response.end(fullStreamContent)
  // return request
  //   .pipe(new InverseNumberString())
  //   .pipe(response)
})

server.listen(3334)
