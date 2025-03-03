export function shellSort(arr: number[]) {
  const steps: number[][] = [arr.slice()]
  const n = arr.length
  let gap = Math.floor(n / 2)

  while (gap > 0) {
    for (let i = gap; i < n; i++) {  // Changed from n-1 to n
      let temp = arr[i]
      let j = i
      while (j >= gap && arr[j - gap] > temp) {
        arr[j] = arr[j - gap]
        j = j - gap
      }
      arr[j] = temp
      steps.push(arr.slice())
    }
    gap = Math.floor(gap / 2)  // Added Math.floor()
  }
  return steps
}
