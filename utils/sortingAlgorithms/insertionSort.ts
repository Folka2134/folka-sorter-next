
export function insertionSort(arr: number[]): number[][] {
  const steps: number[][] = [arr.slice()]
  const n = arr.length

  for (let i = 1; i < n; i++) {
    const key = arr[i]
    let j = i - 1

    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j]
      j = j - 1
      steps.push(arr.slice())
    }
    arr[j + 1] = key
    steps.push(arr.slice())
  }

  return steps
}

