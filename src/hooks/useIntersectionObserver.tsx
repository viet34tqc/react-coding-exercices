import { useCallback, useEffect, useState } from 'react';

const useIntersectionObserver = (props?: {
  onIntersecting?: (ele: HTMLElement) => void;
  options?: {
    threshold: number | number[];
  };
}) => {
  // What return: ref, isVisible
  const [node, setNode] = useState<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const ref = useCallback((node: HTMLElement | null) => {
    setNode(node);
  }, []);

  useEffect(() => {
    if (!node) return;

    const observer = new IntersectionObserver(entries => {
      setIsVisible(entries[0].isIntersecting);
      if (props?.onIntersecting) {
        props?.onIntersecting(node);
      }
    }, props?.options);

    observer.observe(node);

    return () => observer.disconnect();
  }, [node]);

  return { ref, isVisible };
};

export default useIntersectionObserver;
