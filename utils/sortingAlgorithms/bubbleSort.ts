
export function bubbleSort(arr: number[]): number[][] {
  const steps: number[][] = [arr.slice()];
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Now TypeScript knows these indices are valid
      if (arr[j]! > arr[j + 1]!) {
        // Safe to destructure after checking
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]] as [number, number]
        steps.push(arr.slice());
      }
    }
  }

  return steps;
}

