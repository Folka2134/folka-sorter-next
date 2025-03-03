export function quickSort(arr: number[]): number[][] {
  const steps: number[][] = [arr.slice()];
  quickSortHelper(arr, 0, arr.length - 1, steps);
  return steps;
}

function quickSortHelper(arr: number[], low: number, high: number, steps: number[][]): void {
  if (low < high) {
    const pivotIndex = partition(arr, low, high, steps);
    quickSortHelper(arr, low, pivotIndex - 1, steps);
    quickSortHelper(arr, pivotIndex + 1, high, steps);
  }
}

function partition(arr: number[], low: number, high: number, steps: number[][]): number {
  const pivot = arr[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      steps.push(arr.slice());
    }
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  steps.push(arr.slice());

  return i + 1;
}
