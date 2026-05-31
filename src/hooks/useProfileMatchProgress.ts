import { useEffect, useRef, useState } from 'react';
import {
  buildInitialProfileMatchStatuses,
  getProfileMatchProgressPercent,
  type ProfileMatchStepStatus,
} from '../constants/profileMatchBuilding';

const ADVANCE_MS = 2200;
const INITIAL_DELAY_MS = 2000;

interface UseProfileMatchProgressOptions {
  onComplete?: () => void;
}

export const useProfileMatchProgress = ({ onComplete }: UseProfileMatchProgressOptions = {}) => {
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const [statuses, setStatuses] = useState<ProfileMatchStepStatus[]>(buildInitialProfileMatchStatuses);
  const [headline, setHeadline] = useState('Building your profile match…');
  const [isComplete, setIsComplete] = useState(false);

  const progress = getProfileMatchProgressPercent(statuses);

  useEffect(() => {
    let stepIndex = 2;
    let timeoutId: ReturnType<typeof setTimeout>;
    const stepCount = buildInitialProfileMatchStatuses().length;

    const advance = () => {
      setStatuses((prev) => {
        const next = [...prev];
        next[stepIndex] = 'done';
        if (stepIndex + 1 < next.length) {
          next[stepIndex + 1] = 'running';
        }
        return next;
      });

      stepIndex += 1;

      if (stepIndex >= stepCount) {
        setHeadline('Profile built! Preparing your results…');
        setIsComplete(true);
        onCompleteRef.current?.();
        return;
      }

      timeoutId = setTimeout(advance, ADVANCE_MS);
    };

    timeoutId = setTimeout(advance, INITIAL_DELAY_MS);

    return () => clearTimeout(timeoutId);
  }, []);

  return { statuses, progress, headline, isComplete };
};
