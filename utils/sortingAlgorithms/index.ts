
import { insertionSort } from "./insertionSort"
import { selectionSort } from "./selectionSort"
import { bubbleSort } from "./bubbleSort"
import { mergeSort } from "./mergeSort"
import { shellSort } from "./shellSort"
import { heapSort } from "./heapSort"
import { quickSort } from "./quickSort"
import { countingSort } from "./countingSort"
import { timSort } from "./timSort"

export const sortingAlgorithms = {
  insertion: insertionSort,
  shell: shellSort,
  selection: selectionSort,
  bubble: bubbleSort,
  merge: mergeSort,
  heap: heapSort,
  quick: quickSort,
  // counting: countingSort,
  tim: timSort,
}

export type SortingAlgorithm = keyof typeof sortingAlgorithms

