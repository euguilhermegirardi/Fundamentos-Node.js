import http from 'node:http'
import { extractQueryParams } from './extract-query-params.js'
import { json } from './middlewares/json.js'
import { routes } from './routes.js'

const server = http.createServer(async (request, response) => {
  const { method, url } = request

  await json(request, response)

  const route = routes.find(route => {
    return route.method === method && route.path.test(url)
  })

  if(route) {
    const routeParams = request.url.match(route.path)
    
    console.log(extractQueryParams(routeParams.groups.query))
    // { search: 'Gui', page: '2'}
    
    const { query, ...params } = routeParams.groups
    request.params = params
    request.query = extractQueryParams(query)
    
    return route.handler(request, response)
  }

  return response.writeHead(404).end('Not found!')
})

server.listen(3333)