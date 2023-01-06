import { MouseEvent, useState } from 'react';
import styles from './LovelyDots.module.css';
type Point = {
	x: number;
	y: number;
};

const LovelyDots = () => {
	const [points, setPoints] = useState<Point[]>([]);
	const [popped, setPopped] = useState<Point[]>([]); // This state stores undo points.
	const handleSetPoints = (e: MouseEvent<HTMLDivElement>) => {
		setPoints([...points, { x: e.pageX, y: e.pageY }]);
	};

	const handleUndo = () => {
		const nextPoints = [...points];
		const poppedPoint = nextPoints.pop();
		if (!poppedPoint) return;
		setPopped([...popped, poppedPoint]);
		setPoints(nextPoints);
	};

	const handleRedo = () => {
		const nextPopped = [...popped];
		const redoPoint = nextPopped.pop();
		if (!redoPoint) return;
		setPopped(nextPopped);
		setPoints([...points, redoPoint]);
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.buttons}>
				{points.length > 0 && <button onClick={handleUndo}>Undo</button>}
				{popped.length > 0 && points.length > 0 && (
					<button onClick={handleRedo}>Redo</button>
				)}
			</div>
			<div className={styles.clickArea} onClick={handleSetPoints}>
				{points.length > 0 &&
					points.map((point: Point) => (
						<div
							className={styles.dot}
							style={{
								top: point.y - 10,
								left: point.x - 10,
							}}
						></div>
					))}
			</div>
		</div>
	);
};

export default LovelyDots;
