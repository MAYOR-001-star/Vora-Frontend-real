import { useEffect, useState } from 'react';

interface BarTarget {
  id: string;
  pct: number;
}

interface UseStaggeredBarWidthsOptions {
  bars: BarTarget[];
  initialDelayMs?: number;
  staggerMs?: number;
}

export const useStaggeredBarWidths = ({
  bars,
  initialDelayMs = 400,
  staggerMs = 120,
}: UseStaggeredBarWidthsOptions) => {
  const [widths, setWidths] = useState<Record<string, number>>(() =>
    Object.fromEntries(bars.map((bar) => [bar.id, 0])),
  );

  useEffect(() => {
    const timeouts = bars.map((bar, index) =>
      window.setTimeout(() => {
        setWidths((prev) => ({ ...prev, [bar.id]: bar.pct }));
      }, initialDelayMs + index * staggerMs),
    );

    return () => timeouts.forEach((id) => window.clearTimeout(id));
  }, [bars, initialDelayMs, staggerMs]);

  return widths;
};
