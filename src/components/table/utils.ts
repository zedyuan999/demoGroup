export type Tree = {
  children?: Tree[]
}

export const flatten: <T extends Tree[]> (data: Tree[]) => T[] = (data) => {
  return data.reduce((total, curr) => {
    const obj = { ...curr }
    delete obj.children
    return total.concat([obj], flatten(curr.children ? curr.children : []))
  }, [])
}