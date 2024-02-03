import http from 'node:http'

// request => Readable Stream
// response => Writable Stream
const server = http.createServer(async (request, response) => {
  const buffers = []

  for await (const chunk of request) {
    buffers.push(chunk)
  }

  const fullStreamContent = Buffer.concat(buffers).toString()

  return response.end(fullStreamContent)
})

server.listen(3334)
