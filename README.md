# Object Navigation

[![npm version](https://badge.fury.io/js/@universal-packages%2Fobject-navigation.svg)](https://www.npmjs.com/package/@universal-packages/object-navigation)
[![Testing](https://github.com/universal-packages/universal-object-navigation/actions/workflows/testing.yml/badge.svg)](https://github.com/universal-packages/universal-object-navigation/actions/workflows/testing.yml)
[![codecov](https://codecov.io/gh/universal-packages/universal-object-navigation/branch/main/graph/badge.svg?token=CXPJSN8IGL)](https://codecov.io/gh/universal-packages/universal-object-navigation)

For those not so common situations where you just want to know the composition of a complex object to analyze and probably recompose such object.

## Install

```shell
npm install @universal-packages/object-navigation
```

## Global methods

#### **`navigateObject(subject: Object, path: string | string[], [options])`**

- **`subject`** `Object`
  The object to navigate
- **`path`** `string | string[]`
  The path to navigate
- ## **`options`** `NavigateOptions`

  - **`buildToTarget`** `boolean`
    If the intermediary nodes to get to the target does not exist, they will be created.

  - **`separator`** `boolean` `default: '/'`
    The separator to use to split the path into elements.

Will go deeply into the object and return a structure describing the traverse strategy to get to the target.

```js
import { navigateObject } from '@universal-packages/object-navigation'

const objectToNavigate = {
  a: {
    b: {
      c: {
        d: {
          value: 'value'
        }
      }
    }
  }
}

const result = navigateObject(objectToNavigate, 'a/b/c/d/value')

const value = result.targetNode[result.targetKey]
```

A result of the navigation will look like this:

```js
const result = {
  elements: ['a', 'b', 'c', 'd', 'value'],
  path: 'a/b/c/d/value',
  pathTraverse: [
    {
      path: 'a',
      node: {
        b: {
          c: {
            d: {
              value: 'value'
            }
          }
        }
      },
      created: false
    },
    {
      path: 'a/b',
      node: {
        c: {
          d: {
            value: 'value'
          }
        }
      },
      created: false
    },
    {
      path: 'a/b/c',
      node: {
        d: {
          value: 'value'
        }
      },
      created: false
    },
    {
      path: 'a/b/c/d',
      node: {
        value: 'value'
      },
      created: false
    }
  ],
  targetKey: 'value',
  targetNode: {
    value: 'value'
  },
  targetNodeIsRoot: false,
  error: false
}
```

#### **`resolvePath(path: string | string[], separator: string)`**

- **`path`** `string | string[]`
  The path to resolve
- **`separator`** `string` `default: '/'`
  The separator to use to split the path into elements.

Will return a clean string path without repeated separators nor trailing separators. It will join the path to a string if the path is provided as a string array.

#### **`deconstructPath(path: string | string[], separator: string)`**

- **`path`** `string | string[]`
  The path to deconstruct

- **`separator`** `string` `default: '/'`
  The separator to use to split the path into elements.

Will return an array of strings with the elements of the path.

## Typescript

This library is developed in TypeScript and shipped fully typed.

## Contributing

The development of this library happens in the open on GitHub, and we are grateful to the community for contributing bugfixes and improvements. Read below to learn how you can take part in improving this library.

- [Code of Conduct](./CODE_OF_CONDUCT.md)
- [Contributing Guide](./CONTRIBUTING.md)

### License

[MIT licensed](./LICENSE).
