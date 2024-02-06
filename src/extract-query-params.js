// ?search=Gui&page=2
// substr(1) => search=Gui&page=2
// split('&') => ['search=Gui', 'page=2']
// reduce => walk through the array and transform it into a new object
// split('=') => ['search', 'Gui'], ['page', '2']
export function extractQueryParams(query) {
  if (!query) {
    return {}
  }

  return query.substr(1).split('&').reduce((queryParams, param) => {
    const [key, value] = param.split('=')
    queryParams[key] = value
    return queryParams
  }, {})
}