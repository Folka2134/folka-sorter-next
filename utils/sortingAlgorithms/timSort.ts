export function timSort(arr: number[]): number[][] {
  const steps: number[][] = [arr.slice()];
  const MIN_RUN = 32;  // Optimal run size

  for (let i = 0; i < arr.length; i += MIN_RUN) {
    insertionSort(arr, i, Math.min(i + MIN_RUN - 1, arr.length - 1), steps);
  }

  let size = MIN_RUN;
  while (size < arr.length) {
    for (let left = 0; left < arr.length - size; left += 2 * size) {
      const mid = left + size - 1;
      const right = Math.min(left + 2 * size - 1, arr.length - 1);
      merge(arr, left, mid, right, steps);
    }
    size *= 2;
  }

  return steps;
}

function insertionSort(arr: number[], left: number, right: number, steps: number[][]): void {
  for (let i = left + 1; i <= right; i++) {
    const temp = arr[i];
    let j = i - 1;

    while (j >= left && arr[j] > temp) {
      arr[j + 1] = arr[j];
      j--;
    }

    arr[j + 1] = temp;
    steps.push(arr.slice());
  }
}

function merge(arr: number[], left: number, mid: number, right: number, steps: number[][]): void {
  const leftArray = arr.slice(left, mid + 1);
  const rightArray = arr.slice(mid + 1, right + 1);

  let i = 0, j = 0, k = left;

  while (i < leftArray.length && j < rightArray.length) {
    if (leftArray[i] <= rightArray[j]) {
      arr[k] = leftArray[i];
      i++;
    } else {
      arr[k] = rightArray[j];
      j++;
    }
    k++;
    steps.push(arr.slice());
  }

  while (i < leftArray.length) {
    arr[k] = leftArray[i];
    i++;
    k++;
    steps.push(arr.slice());
  }

  while (j < rightArray.length) {
    arr[k] = rightArray[j];
    j++;
    k++;
    steps.push(arr.slice());
  }
}
