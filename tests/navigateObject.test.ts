import { navigateObject } from '../src'

describe(navigateObject, (): void => {
  it('navigates an object and maps the traverse path', (): void => {
    const objectToNavigate = {
      a: {
        b: {
          c: {
            d: {
              value: 'value'
            }
          },
          value: 'value-c'
        }
      }
    }

    const result = navigateObject(objectToNavigate, 'a/b/c/d/value')

    expect(result).toEqual({
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
              },
              value: 'value-c'
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
            },
            value: 'value-c'
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
    })
  })

  it('navigates an object and returns errored result if the target can not be reached', (): void => {
    const objectToNavigate = {
      a: {
        b: {
          c: {
            d: {
              value: 'value'
            }
          },
          value: 'value-c'
        }
      }
    }

    const result = navigateObject(objectToNavigate, 'a/not/deep/deep/value')

    expect(result).toEqual({
      elements: ['a', 'not', 'deep', 'deep', 'value'],
      path: 'a/not/deep/deep/value',
      pathTraverse: [
        {
          path: 'a',
          node: {
            b: {
              c: {
                d: {
                  value: 'value'
                }
              },
              value: 'value-c'
            }
          },
          created: false
        }
      ],
      targetKey: 'value',
      targetNodeIsRoot: false,
      error: true
    })
  })

  it('navigates an object and returns errored result if the target can not be reached because a path element is a value not a navigable', (): void => {
    const objectToNavigate = {
      a: {
        value: 'value'
      }
    }

    const result = navigateObject(objectToNavigate, 'a/value/invalid')

    expect(result).toEqual({
      elements: ['a', 'value', 'invalid'],
      path: 'a/value/invalid',
      pathTraverse: [
        {
          path: 'a',
          node: {
            value: 'value'
          },
          created: false
        }
      ],
      targetKey: 'invalid',
      targetNode: {
        value: 'value'
      },
      targetNodeIsRoot: false,
      error: true
    })
  })

  it('indicates if the target node is the root node', (): void => {
    const objectToNavigate = {
      a: {
        b: {
          c: {
            d: {
              value: 'value'
            }
          },
          value: 'value-c'
        }
      }
    }

    const result = navigateObject(objectToNavigate, '/')

    expect(result).toEqual({
      elements: [''],
      path: '',
      pathTraverse: [],
      targetKey: '',
      targetNode: {
        a: {
          b: {
            c: {
              d: {
                value: 'value'
              }
            },
            value: 'value-c'
          }
        }
      },
      targetNodeIsRoot: true,
      error: false
    })
  })

  it('navigates an object, maps and builds the traverse path with buildToTarget option', (): void => {
    const objectToNavigate = {
      a: {
        b: {
          c: {
            d: {
              value: 'value'
            }
          },
          value: 'value-c'
        }
      }
    }

    const result = navigateObject(objectToNavigate, 'a/new/deep/deep/value', { buildToTarget: true })

    expect(result).toEqual({
      elements: ['a', 'new', 'deep', 'deep', 'value'],
      path: 'a/new/deep/deep/value',
      pathTraverse: [
        {
          path: 'a',
          node: {
            b: {
              c: {
                d: {
                  value: 'value'
                }
              },
              value: 'value-c'
            },
            new: {
              deep: {
                deep: {}
              }
            }
          },
          created: false
        },
        {
          path: 'a/new',
          node: {
            deep: {
              deep: {}
            }
          },
          created: true
        },
        {
          path: 'a/new/deep',
          node: {
            deep: {}
          },
          created: true
        },
        {
          path: 'a/new/deep/deep',
          node: {},
          created: true
        }
      ],
      targetKey: 'value',
      targetNode: {},
      targetNodeIsRoot: false,
      error: false
    })
  })

  it('navigates object using a different separator', (): void => {
    const objectToNavigate = {
      a: {
        b: {
          c: {
            d: {
              value: 'value'
            }
          },
          value: 'value-c'
        }
      }
    }

    const result = navigateObject(objectToNavigate, 'a.b.c.d.value', { separator: '.' })

    expect(result).toEqual({
      elements: ['a', 'b', 'c', 'd', 'value'],
      path: 'a.b.c.d.value',
      pathTraverse: [
        {
          path: 'a',
          node: {
            b: {
              c: {
                d: {
                  value: 'value'
                }
              },
              value: 'value-c'
            }
          },
          created: false
        },
        {
          path: 'a.b',
          node: {
            c: {
              d: {
                value: 'value'
              }
            },
            value: 'value-c'
          },
          created: false
        },
        {
          path: 'a.b.c',
          node: {
            d: {
              value: 'value'
            }
          },
          created: false
        },
        {
          path: 'a.b.c.d',
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
    })
  })
})
