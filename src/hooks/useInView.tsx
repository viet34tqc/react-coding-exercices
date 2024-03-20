import { MutableRefObject, useCallback, useEffect, useState } from 'react';
import usePrevious from './usePrevious';

export const useInView = <T extends HTMLElement>(
  ref: MutableRefObject<T | null>,
  onInView: (ele: T) => void
) => {
  const [isInView, setIsInView] = useState(false);
  const wasInView = usePrevious(isInView);

  const checkInView = useCallback(() => {
    const ele = ref.current;
    if (!ele) {
      return;
    }
    const rect = ele.getBoundingClientRect();
    setIsInView(rect.top < window.innerHeight && rect.bottom >= 0);
  }, [ref]);

  useEffect(() => {
    checkInView();
  }, [checkInView]);

  useEffect(() => {
    document.addEventListener('scroll', checkInView);
    window.addEventListener('resize', checkInView);
    return () => {
      document.removeEventListener('scroll', checkInView);
      window.removeEventListener('resize', checkInView);
    };
  }, [checkInView]);

  useEffect(() => {
    const ele = ref.current;
    if (ele && !wasInView && isInView) {
      onInView(ele);
    }
  }, [isInView, ref, onInView, wasInView]);
};
