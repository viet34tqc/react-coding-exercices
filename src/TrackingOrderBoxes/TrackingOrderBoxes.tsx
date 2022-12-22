const boxes = new Array(7).fill(1).map((v, i) => v * i);
import { useRef, useState } from 'react';
import styles from './TrackingOrderBoxes.module.css';

const TrackingOrderBoxes = () => {
	const timeout = useRef(null);
	const [queue, setQueue] = useState(new Set());
	const handleDequeue = queue => {
		if (queue.size === 0) return;

		timeout.current = setTimeout(() => {
			const nextQueue = new Set([...queue].slice(1));
			setQueue(nextQueue);
			handleDequeue(nextQueue);
		}, 1000);
	};

	const handleClick = (item: number) => {
		if (timeout.current) {
			clearTimeout(timeout.current);
		}
		// If we add new item to original queue and setQueue, it won't work
		const nextQueue = new Set(queue);
		nextQueue.add(item);
		setQueue(nextQueue);

		if (nextQueue.size === boxes.length) {
			// Add nextQueue to the function because queue is not up to date yet when calling this function
			handleDequeue(nextQueue);
		}
	};

	return (
		<div className={styles.wrapper}>
			{boxes.map(item => (
				<div
					key={item}
					className={[styles.item, queue.has(item) ? styles.active : ''].join(
						' '
					)}
					onClick={() => handleClick(item)}
				></div>
			))}
		</div>
	);
};

export default TrackingOrderBoxes;
