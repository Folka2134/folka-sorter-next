export function selectionSort(arr: number[]): number[][] {
  const steps: number[][] = [arr.slice()]
  const n = arr.length

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i // Assume the first element is the smallest

    for (let j = i + 1; j < n; j++) {
      if (arr[j]! < arr[minIndex]!) {
        minIndex = j // Found a new minimum
      }
    }

    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]] as [number, number]
      steps.push(arr.slice()) // Store current state
    }
  }

  return steps
}
