import { resolvePath } from './resolvePath'

export function deconstructPath(path: string | string[], separator: string = '/') {
  const finalPath = resolvePath(path, separator)

  return finalPath.split(separator)
}
