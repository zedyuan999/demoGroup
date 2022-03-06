export type Tree = {
  children?: Tree[]
}

export const flatten: <T extends Tree[]> (data: Tree[]) => T[] = (data) => {
  return data.reduce((pre, curr) => {
    const obj = { ...curr }
    delete obj.children
    return pre.concat([obj], flatten(curr.children ? curr.children : []))
  }, [])
}