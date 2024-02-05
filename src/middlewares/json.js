// Middleware intercepts the request to do something...
// Middleware always receives as params "Request" and "Response"
// Transform the request body into JSON
export async function json(request, response) {
  const buffers = []

  for await (const chunk of request) {
    buffers.push(chunk)
  }

  try {
    request.body = JSON.parse(Buffer.concat(buffers).toString())
  } catch {
    request.body = null
  }

  response.setHeader('Content-type', 'application/json')
}
