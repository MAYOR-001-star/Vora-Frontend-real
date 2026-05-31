import { useEffect, useState } from 'react';

interface UseAnimatedScoreOptions {
  target: number;
  step?: number;
  intervalMs?: number;
}

export const useAnimatedScore = ({
  target,
  step = 2,
  intervalMs = 24,
}: UseAnimatedScoreOptions) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setValue((current) => {
        const next = Math.min(current + step, target);
        if (next >= target) {
          window.clearInterval(timer);
        }
        return next;
      });
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [target, step, intervalMs]);

  return value;
};
