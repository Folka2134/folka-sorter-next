
import { insertionSort } from "./insertionSort"
// import { selectionSort } from "./selectionSort"
import { bubbleSort } from "./bubbleSort"

export const sortingAlgorithms = {
  insertion: insertionSort,
  // selection: selectionSort,
  bubble: bubbleSort,
}

export type SortingAlgorithm = keyof typeof sortingAlgorithms

