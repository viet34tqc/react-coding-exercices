import { useEffect, useRef, useState } from 'react';

const DoubleClick = () => {
	const [imgType, setImgType] = useState<'dog' | 'cat' | null>(null);
	const [clickCount, setClickCount] = useState(0);

	let timeoutId = useRef<any>(null);
	useEffect(() => {
		if (clickCount === 1) {
			timeoutId.current = setTimeout(() => {
				setImgType('cat');
				setClickCount(0);
			}, 200);
		} else if (clickCount === 2) {
			setImgType('dog');
			setClickCount(0);
		}

		return () => clearTimeout(timeoutId.current);
	}, [clickCount]);

	return (
		<>
			<button onClick={() => setClickCount(clickCount + 1)}>Button</button>
			{imgType && (
				<img src={`https://source.unsplash.com/random/300x300/?${imgType}`} />
			)}
		</>
	);
};

export default DoubleClick;
