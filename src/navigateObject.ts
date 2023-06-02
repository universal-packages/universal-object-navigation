import { deconstructPath } from './deconstructPath'
import { resolvePath } from './resolvePath'
import { NavigateObjectOptions, PathInfo, PathTraverse } from './types'

export function navigateObject(object: Record<string, any>, path: string | string[], options?: NavigateObjectOptions): PathInfo {
  const elements = deconstructPath(path, options?.separator)
  const pathTraverse: PathTraverse[] = []
  const iterationLimit = elements.length - 1
  const targetNodeIsRoot = elements.length === 1 && elements[0] === ''
  let currentNode = object
  let currentPath = ''
  let error = false

  for (let i = 0; i < iterationLimit; i++) {
    const currentElement = elements[i]
    const targetInNode = currentNode[currentElement]
    let created = false

    currentPath = `${currentPath}${currentPath !== '' ? options?.separator || '/' : ''}${currentElement}`

    // While going through the object using the path provided we realize we are about to go through a value
    // that is not an valid object(map) to go through
    if (typeof targetInNode !== 'object' || targetInNode === null) {
      // And we are still going through the object
      if (i < iterationLimit) {
        // And the target in node is not undefined (since is nothing there we can possible
        // initialize it, this as a feature when trying to set something deeply without
        // the need of initializing level by level
        if (targetInNode === undefined) {
          if (!options?.buildToTarget) {
            currentNode = undefined
            error = true
            break
          }

          currentNode[currentElement] = {}

          created = true
        } else {
          error = true
          break
        }
      }
    }

    currentNode = currentNode[elements[i]]

    pathTraverse.push({ path: currentPath, node: currentNode, created })
  }

  return {
    elements,
    path: resolvePath(path, options?.separator),
    pathTraverse,
    targetKey: elements[elements.length - 1],
    targetNode: currentNode,
    targetNodeIsRoot,
    error
  }
}
