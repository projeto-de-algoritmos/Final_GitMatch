function merge(a, b) {
  let i = 0
  let j = 0
  let temp = []
  let count = a.count + b.count
  while(i < a.arr.length && j < b.arr.length) {
    if(a.arr[i] > b.arr[j]) {
      temp.push(b.arr[j])
      j++
      count += a.arr.length - i
    } else {
      temp.push(a.arr[i])
      i++
    }
  }
  temp = [...temp, ...a.arr.slice(i), ...b.arr.slice(j)]
  return {arr: temp, count }
}

function mergeSort(obj) {
  if(obj.arr.length === 1) {
    return obj
  }
  let middle = Math.floor(obj.arr.length/2)
  let left = {arr: obj.arr.slice(0, middle), count: obj.count}
  let right = {arr: obj.arr.slice(middle), count: obj.count}
  let result = merge(mergeSort(left), mergeSort(right))
  return result
}
let arr = [1,3,5,2,6,4,7,9,8,10]
console.log(mergeSort({arr, count: 0}))