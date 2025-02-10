"use client";

import { useState, useEffect } from "react";
import { PlayButton } from "./play-button";
import { BarChart } from "./bar-chart";
import {
  generateArray,
  arrayStates,
  type ArrayState,
} from "../../utils/generate-data";
import {
  sortingAlgorithms,
  type SortingAlgorithm,
} from "../../utils/sortingAlgorithms";
import { useTheme } from "next-themes";

export default function AlgorithmVisualizer() {
  const [mounted, setMounted] = useState(false);
  const [playingStates, setPlayingStates] = useState<Record<string, boolean>>(
    {},
  );
  const [visualData, setVisualData] = useState<Record<string, number[]>>({});
  const [sortingSteps, setSortingSteps] = useState<Record<string, number[][]>>(
    {},
  );
  const { resolvedTheme } = useTheme();

  const algorithms = Object.keys(sortingAlgorithms) as SortingAlgorithm[];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      const data: Record<string, number[]> = {};
      arrayStates.forEach((state) => {
        algorithms.forEach((algo) => {
          data[`${state}-${algo}`] = generateArray(state);
        });
      });
      setVisualData(data);
    }
  }, [mounted]);

  // togglePlay
  // check if state and algo are true > run animation function with state and algo
  // else check if state is true > loop over each algorithm and run animation function with state and algo
  // else check if algo is true > loop over each state and run animation function with state and algo
  // else > loop over each state, loop over each algo and run animation function with state and algo

  const togglePlay = (state?: ArrayState, algo?: SortingAlgorithm) => {
    if (state && algo) {
      runSortingAnimation(state, algo);
    } else if (state) {
      algorithms.forEach((a) => runSortingAnimation(state, a));
    } else if (algo) {
      arrayStates.forEach((s) => runSortingAnimation(s, algo));
    } else {
      arrayStates.forEach((s) =>
        algorithms.forEach((a) => runSortingAnimation(s, a)),
      );
    }
  };

  const runSortingAnimation = (state: ArrayState, algo: SortingAlgorithm) => {
    const key = `${state}-${algo}`;
    const data = visualData[key];
    if (!data) return
    const steps = sortingAlgorithms[algo](data.slice());
    setSortingSteps((prev) => ({ ...prev, [key]: steps }));
    setPlayingStates((prev) => ({ ...prev, [key]: true }));

    let stepIndex = 0;
    const intervalId = setInterval(() => {
      if (stepIndex < steps.length) {
        setVisualData((prev) => ({ ...prev, [key]: steps[stepIndex] }));
        stepIndex++;
      } else {
        clearInterval(intervalId);
        setPlayingStates((prev) => ({ ...prev, [key]: false }));
      }
    }, 50); // Adjust this value to change animation speed
  };

  // const togglePlay = (state?: ArrayState, algo?: Algorithm) => {
  //   if (state && algo) {
  //     setPlayingStates((prev) => ({ ...prev, [`${state}-${algo}`]: true }));
  //     setTimeout(() => {
  //       setPlayingStates((prev) => ({ ...prev, [`${state}-${algo}`]: false }));
  //     }, 2000);
  //   } else if (state) {
  //     algorithms.forEach((a) => {
  //       setPlayingStates((prev) => ({ ...prev, [`${state}-${a}`]: true }));
  //       setTimeout(() => {
  //         setPlayingStates((prev) => ({ ...prev, [`${state}-${a}`]: false }));
  //       }, 2000);
  //     });
  //   } else if (algo) {
  //     arrayStates.forEach((s) => {
  //       setPlayingStates((prev) => ({ ...prev, [`${s}-${algo}`]: true }));
  //       setTimeout(() => {
  //         setPlayingStates((prev) => ({ ...prev, [`${s}-${algo}`]: false }));
  //       }, 2000);
  //     });
  //   } else {
  //     arrayStates.forEach((s) => {
  //       algorithms.forEach((a) => {
  //         setPlayingStates((prev) => ({ ...prev, [`${s}-${a}`]: true }));
  //         setTimeout(() => {
  //           setPlayingStates((prev) => ({ ...prev, [`${s}-${a}`]: false }));
  //         }, 2000);
  //       });
  //     });
  //   }
  // };
  //
  if (!mounted) {
    return (
      <div className="p-4 bg-background min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-4">
      {Object.keys(visualData).length > 0 && (
        <div className="mx-auto max-w-[1200px]">
          {/* Header row */}
          <div className="mb-[1px] grid grid-cols-[120px_repeat(8,1fr)] gap-[1px] bg-border">
            <PlayButton
              onClick={() => togglePlay()}
              label="Play All"
              className="flex h-full flex-col items-center justify-center bg-background"
            />
            {algorithms.map((algo) => (
              <PlayButton
                key={algo}
                onClick={() => togglePlay(undefined, algo)}
                label={algo.charAt(0).toUpperCase() + algo.slice(1)}
                className="flex h-full flex-col items-center justify-center bg-background"
              />
            ))}
          </div>

          {/* Data grid */}
          <div className="grid gap-[1px] bg-border">
            {arrayStates.map((state) => (
              <div
                key={state}
                className="grid grid-cols-[120px_repeat(8,1fr)] gap-[1px]"
              >
                <PlayButton
                  onClick={() => togglePlay(state)}
                  label={state
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                  className="flex h-full flex-col items-center justify-center bg-background"
                />
                {algorithms.map((algo) => (
                  <div
                    key={`${state}-${algo}`}
                    className="bg-background aspect-square p-2 hover:bg-accent/50 transition-colors cursor-pointer"
                    onClick={() => togglePlay(state, algo)}
                  >                   
                    <BarChart
                      data={visualData[`${state}-${algo}`]}
                      maxValue={30}
                      isPlaying={playingStates[`${state}-${algo}`]}
                      highlightIndices={[]}
                      theme={resolvedTheme} 
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
