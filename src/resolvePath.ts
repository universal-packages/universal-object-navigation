export function resolvePath(path: string | string[], separator = '/'): string {
  const joined = `${separator}${Array.isArray(path) ? path.join(separator) : path}${separator}`
  const striped = joined.replace(new RegExp(`\\${separator}+\\${separator}`, 'gm'), separator)

  return striped.slice(1, striped.length - 1)
}
