export function countingSort(arr: number[]): number[][] {
  const steps: number[][] = [arr.slice()];

  if (arr.length === 0) {
    return steps;
  }

  // Find the maximum value in the array
  const maxVal = Math.max(...arr);

  // Create count array with size maxVal + 1
  const count: number[] = new Array(maxVal + 1).fill(0);

  // Step 1: Count occurrences of each number
  for (const num of arr) {
    count[num]++;
  }

  // Create a copy of the count array for visualization
  steps.push([...count]);

  // Step 2: Compute cumulative sum (prefix sum)
  for (let i = 1; i <= maxVal; i++) {
    count[i] += count[i - 1];
  }

  // Create a copy of the count array after prefix sum
  steps.push([...count]);

  // Step 3: Build the sorted output array
  const output: number[] = new Array(arr.length);

  for (let i = arr.length - 1; i >= 0; i--) {
    const num = arr[i];
    output[count[num] - 1] = num;
    count[num]--;

    // Create a copy of the current state of the output array
    const currentOutput = output.slice();

    // Fill undefined values with -1 for visualization purposes
    for (let j = 0; j < currentOutput.length; j++) {
      if (currentOutput[j] === undefined) {
        currentOutput[j] = -1;
      }
    }

    steps.push(currentOutput);
  }

  // Replace the original array with the sorted array
  for (let i = 0; i < arr.length; i++) {
    arr[i] = output[i];
  }

  // Add the final sorted array
  steps.push(arr.slice());

  return steps;
}
