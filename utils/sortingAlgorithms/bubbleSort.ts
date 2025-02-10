
export function bubbleSort(arr: number[]): number[][] {
  const steps: number[][] = [arr.slice()]
  const n = arr.length

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        steps.push(arr.slice())
      }
    }
  }

  return steps
}

