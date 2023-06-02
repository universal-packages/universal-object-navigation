export interface NavigateObjectOptions {
  buildToTarget?: boolean
  separator?: string
}

export interface PathInfo {
  elements: string[]
  path: string
  pathTraverse: PathTraverse[]
  targetKey: string
  targetNode: any
  targetNodeIsRoot: boolean
  error: boolean
}

export interface PathTraverse {
  path: string
  node: any
  created?: boolean
}
