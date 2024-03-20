import { useCallback, useEffect, useState } from 'react';

type Props = {};

const useWatchSize = (props: Props) => {
  const [node, setNode] = useState<HTMLElement | null>(null);
  const [width, setWidth] = useState(0);

  const ref = useCallback((nodeElem: HTMLElement | null) => {
    setNode(nodeElem);
  }, []);

  useEffect(() => {
    if (!node) return;
    const resizeObserver = new ResizeObserver(entries => {
      entries.forEach(entry => {
        const rect = entry.target.getBoundingClientRect();
        setWidth(rect.width);
      });
    });
    resizeObserver.observe(node);

    return () => resizeObserver.disconnect();
  }, [node]);

  return [ref, width];
};

export default useWatchSize;
