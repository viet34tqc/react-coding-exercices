import { useCallback, useEffect, useState } from 'react';

export const useDraggable = () => {
  const [node, setNode] = useState<HTMLElement | null>(null);
  const [{ dx, dy }, setOffset] = useState({
    dx: 0,
    dy: 0,
  });
  const ref = useCallback((nodeEle: HTMLElement) => {
    setNode(nodeEle);
  }, []);

  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      const startX = e.clientX - dx;
      const startY = e.clientY - dy;

      const handleMouseMove = (e: MouseEvent) => {
        setOffset({
          dx: e.clientX - startX,
          dy: e.clientY - startY,
        });
      };
      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [dx, dy]
  );

  useEffect(() => {
    if (node) {
      node.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
    }
  }, [node, dx, dy]);

  useEffect(() => {
    if (!node) {
      return;
    }
    node.addEventListener('mousedown', handleMouseDown);
    return () => {
      node.removeEventListener('mousedown', handleMouseDown);
    };
  }, [node, handleMouseDown]);

  return [ref];
};
