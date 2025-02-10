"use client";

import { useState, useEffect } from "react";
import { PlayButton } from "./play-button";
import { BarChart } from "./bar-chart";
import {
  generateArray,
  algorithms,
  arrayStates,
  type Algorithm,
  type ArrayState,
} from "../../utils/generate-data";
import { useTheme } from "next-themes";

export default function AlgorithmVisualizer() {
  const [playingStates, setPlayingStates] = useState<Record<string, boolean>>(
    {},
  );
  const [visualData, setVisualData] = useState<Record<string, number[]>>({});
  const { theme } = useTheme();

  useEffect(() => {
    const data: Record<string, number[]> = {};
    arrayStates.forEach((state) => {
      algorithms.forEach((algo) => {
        data[`${state}-${algo}`] = generateArray(state);
      });
    });
    setVisualData(data);
  }, []);

  const togglePlay = (state?: ArrayState, algo?: Algorithm) => {
    if (state && algo) {
      setPlayingStates((prev) => ({ ...prev, [`${state}-${algo}`]: true }));
      setTimeout(() => {
        setPlayingStates((prev) => ({ ...prev, [`${state}-${algo}`]: false }));
      }, 2000);
    } else if (state) {
      algorithms.forEach((a) => {
        setPlayingStates((prev) => ({ ...prev, [`${state}-${a}`]: true }));
        setTimeout(() => {
          setPlayingStates((prev) => ({ ...prev, [`${state}-${a}`]: false }));
        }, 2000);
      });
    } else if (algo) {
      arrayStates.forEach((s) => {
        setPlayingStates((prev) => ({ ...prev, [`${s}-${algo}`]: true }));
        setTimeout(() => {
          setPlayingStates((prev) => ({ ...prev, [`${s}-${algo}`]: false }));
        }, 2000);
      });
    } else {
      arrayStates.forEach((s) => {
        algorithms.forEach((a) => {
          setPlayingStates((prev) => ({ ...prev, [`${s}-${a}`]: true }));
          setTimeout(() => {
            setPlayingStates((prev) => ({ ...prev, [`${s}-${a}`]: false }));
          }, 2000);
        });
      });
    }
  };

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
                    className="aspect-square cursor-pointer bg-background p-2 transition-colors hover:bg-accent/50"
                    onClick={() => togglePlay(state, algo)}
                  >
                    <BarChart
                      data={visualData[`${state}-${algo}`]}
                      maxValue={30}
                      isPlaying={playingStates[`${state}-${algo}`]}
                      highlightIndices={
                        playingStates[`${state}-${algo}`]
                          ? [Math.floor(Math.random() * 30)]
                          : []
                      }
                      theme={theme}
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
