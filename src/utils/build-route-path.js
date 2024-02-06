export function buildRoutePath(path) {
  // Finds inside of the text that has two dots " : ", and after the two dots, lower case letters or capital letters and these letters could repeat once or more... "g" search for all in the parameter
  const routeParametersRegex = /:([a-zA-Z]+)/g
  const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)')
  const pathRegex = new RegExp(`^${pathWithParams}`)
  return pathRegex
}