export type Tree = {
  children?: Tree[]
}

export const flatten: <T extends Tree[]> (data: Tree[], level?: number) => T[] = (data, level = 0) => {
  return data.reduce((total, curr) => {
    const obj = { ...curr, level }
    delete obj.children
    return total.concat([obj], flatten(curr.children ? curr.children : [], level + 1))
  }, [])
}