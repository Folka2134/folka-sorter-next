
import { insertionSort } from "./insertionSort"
import { selectionSort } from "./selectionSort"
import { bubbleSort } from "./bubbleSort"
import { mergeSort } from "./mergeSort"
import { shellSort } from "./shellSort"
import { heapSort } from "./heapSort"
import { quickSort } from "./quickSort"
import { timSort } from "./timSort"

export const sortingAlgorithms = {
  bubble: bubbleSort,
  shell: shellSort,
  selection: selectionSort,
  insertion: insertionSort,
  merge: mergeSort,
  tim: timSort,
  heap: heapSort,
  quick: quickSort,
}

export type SortingAlgorithm = keyof typeof sortingAlgorithms

