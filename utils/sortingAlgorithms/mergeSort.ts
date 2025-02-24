export function mergeSort(arr: number[]): number[][] {
  const steps: number[][] = [arr.slice()]; // Track initial array state

  // Helper function to merge two sorted arrays
  const merge = (left: number[], right: number[]): number[] => {
    const result: number[] = [];
    let i = 0, j = 0;

    // Merge the arrays while both are non-empty
    while (i < left.length && j < right.length) {
      if (left[i] < right[j]) {
        result.push(left[i]);
        i++;
      } else {
        result.push(right[j]);
        j++;
      }
    }

    // If there are remaining elements in either left or right
    return result.concat(left.slice(i), right.slice(j));
  };

  // Recursive function to divide and merge the array
  const sort = (arr: number[]): number[] => {
    if (arr.length <= 1) return arr; // Base case: array of 1 element is already sorted

    const mid = Math.floor(arr.length / 2); // Find the middle index
    const left = arr.slice(0, mid);  // Left half
    const right = arr.slice(mid);    // Right half

    // Recursively sort the left and right halves
    const sortedLeft = sort(left);
    const sortedRight = sort(right);

    // Merge the two sorted halves
    const merged = merge(sortedLeft, sortedRight);
    steps.push(merged.slice()); // Track state after merge
    return merged;
  };

  // Call the sort function to start the process
  sort(arr);
  return steps;
}
