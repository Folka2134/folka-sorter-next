"use client";

import { useEffect, useRef } from "react";

interface BarChartProps {
  data: number[] | undefined;
  maxValue: number;
  isPlaying?: boolean;
  highlightIndices?: number[];
  theme?: string;
}

export function BarChart({
  data,
  maxValue,
  isPlaying,
  highlightIndices = [],
  theme,
}: BarChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !data || data.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const barWidth = canvas.width / data.length;
    const scale = canvas.height / maxValue;

    data.forEach((value, index) => {
      const height = value * scale;
      const x = index * barWidth;
      const y = canvas.height - height;

      // Use theme-aware colors
      const barColor = highlightIndices.includes(index)
        ? "hsl(0, 100%, 50%)"
        : isPlaying
          ? theme === "dark"
            ? "hsl(0, 0%, 40%)"
            : "hsl(0, 0%, 60%)"
          : theme === "dark"
            ? "hsl(0, 0%, 80%)"
            : "hsl(0, 0%, 20%)";

      ctx.fillStyle = barColor;
      ctx.fillRect(x, y, Math.max(1, barWidth - 1), height);
    });
  }, [data, maxValue, isPlaying, highlightIndices, theme]);

  return (
    <canvas
      ref={canvasRef}
      width={150}
      height={100}
      className="h-full w-[104px]"
    />
  );
}
