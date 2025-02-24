
import { insertionSort } from "./insertionSort"
import { selectionSort } from "./selectionSort"
import { bubbleSort } from "./bubbleSort"
import { mergeSort } from "./mergeSort"

export const sortingAlgorithms = {
  insertion: insertionSort,
  selection: selectionSort,
  bubble: bubbleSort,
  merge: mergeSort,
}

export type SortingAlgorithm = keyof typeof sortingAlgorithms

