import { MouseEventHandler, useEffect, useRef, useState } from 'react';
type Point = {
  x: number;
  y: number;
};
type Line = {
  id: string;
  points: Point[];
};

const generateId = (length: number): string =>
  Array(length)
    .fill('')
    .map(v => Math.random().toString(36).charAt(2))
    .join('');

const DrawingBoard = () => {
  const ref = useRef<SVGSVGElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [id, setId] = useState('');
  const [lines, setLines] = useState<Line[]>([]);
  const handleStartDrawing = (x: number, y: number) => {
    if (!ref.current) return;
    const lineId = generateId(6);
    const svgRect = ref.current.getBoundingClientRect();
    const startingPoint = { x: x - svgRect.x, y: y - svgRect.y };
    setIsDrawing(true);
    setId(lineId);
    setLines(lines => [
      ...lines,
      {
        id: lineId,
        points: [startingPoint],
      },
    ]);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleMouseMove: MouseEventHandler<SVGSVGElement> = e => {
    if (!isDrawing || !ref.current) return;
    const svgRect = ref.current.getBoundingClientRect();

    setLines(lines =>
      lines.map(line =>
        line.id === id
          ? {
              ...line,
              points: line.points.concat({
                x: e.clientX - svgRect.x,
                y: e.clientY - svgRect.y,
              }),
            }
          : line
      )
    );
  };

  const handleMouseDown: MouseEventHandler<SVGSVGElement> = e => {
    handleStartDrawing(e.clientX, e.clientY);
  };

  useEffect(() => {
    const svgEle = ref.current;
    if (!svgEle) {
      return;
    }
    const { height, width } = svgEle.getBoundingClientRect();
    svgEle.setAttribute('width', width.toString());
    svgEle.setAttribute('viewBox', `0 0 ${width} ${height}`);
  });
  return (
    <svg
      ref={ref}
      height="320"
      style={{ cursor: 'crosshair' }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {lines.map(({ id, points }) => (
        <polyline
          key={id}
          fill="none"
          stroke="#fff"
          strokeWidth="2"
          points={points.map(point => `${point.x},${point.y}`).join(' ')}
        />
      ))}
    </svg>
  );
};

export default DrawingBoard;
