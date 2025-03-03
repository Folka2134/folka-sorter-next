export function heapSort(arr: number[]): number[][] {
  const steps: number[][] = [arr.slice()];
  const n = arr.length;

  // Build maxheap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i, steps);
  }

  // Extract (sort) elements
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]] as [number, number]
    steps.push(arr.slice());

    heapify(arr, i, 0, steps);
  }

  return steps;
}

function heapify(arr: number[], heap_size: number, root_index: number, steps: number[][]) {
  let largest = root_index;
  const left_child = 2 * root_index + 1;
  const right_child = 2 * root_index + 2;

  if (left_child < heap_size && arr[left_child]! > arr[largest]!) {
    largest = left_child;
  }

  if (right_child < heap_size && arr[right_child]! > arr[largest]!) {
    largest = right_child;
  }

  if (largest !== root_index) {
    [arr[root_index], arr[largest]] = [arr[largest], arr[root_index]] as [number, number]
    steps.push(arr.slice());

    heapify(arr, heap_size, largest, steps);
  }
}
