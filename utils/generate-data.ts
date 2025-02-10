export type ArrayState = "random" | "nearly-sorted" | "reversed" | "few-unique"
export type Algorithm = "insertion" | "selection" | "bubble" | "shell" | "merge" | "heap" | "quick" | "quick3"

export function generateArray(type: ArrayState, size = 30): number[] {
  switch (type) {
    case "random":
      return Array.from({ length: size }, () => Math.floor(Math.random() * size))
    // case "nearly-sorted":
    //   return Array.from({ length: size }, (_, i) => i + (Math.random() > 0.9 ? Math.floor(Math.random() * 3) - 1 : 0))
    case "reversed":
      return Array.from({ length: size }, (_, i) => size - i - 1)
    case "few-unique":
      return Array.from({ length: size }, () => Math.floor(Math.random() * 5))
    default:
      return []
  }
}

export const sortingAlgorithms: Algorithm[] = ["insertion", "selection", "bubble", "shell", "merge", "heap", "quick", "quick3"]
export const arrayStates: ArrayState[] = ["random", 
  // "nearly-sorted", 
  "reversed", "few-unique"]

