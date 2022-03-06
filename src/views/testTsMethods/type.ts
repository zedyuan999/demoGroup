type arr1 = ('a' | 'b' | 'c')[]
type arr2 = ('c' | 'd' | 'e')[]


export const array1: arr1 = ['a', 'b', 'c'];
const array2: arr2 = ['c', 'd', 'e'];
const array3 = array1.concat(array2);


// export default {}