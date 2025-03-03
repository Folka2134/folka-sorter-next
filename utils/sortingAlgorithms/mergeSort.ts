export function mergeSort(arr: number[]): number[][] {
  const steps: number[][] = [arr.slice()]; // Track initial array state

  const merge = (left: number[], right: number[]): number[] => {
    const result: number[] = [];
    let i = 0, j = 0;

    while (i < left.length && j < right.length) {
      if (left[i]! < right[j]!) {
        result.push(left[i]!);
        i++;
      } else {
        result.push(right[j]!);
        j++;
      }
    }

    return result.concat(left.slice(i), right.slice(j));
  };

  const sort = (arr: number[]): number[] => {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);

    const sortedLeft = sort(left);
    const sortedRight = sort(right);

    const merged = merge(sortedLeft, sortedRight);
    steps.push(merged.slice());
    return merged;
  };

  sort(arr);
  return steps;
}
