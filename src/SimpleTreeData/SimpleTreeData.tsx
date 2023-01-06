import { useReducer } from 'react';
import styles from './SimpleTreeData.module.css';
const entries = [
	{
		name: 'parent1',
		children: [
			{
				name: 'children of parent1',
				children: [
					{
						name: 'grandchildren1 of parent1',
					},
					{
						name: 'grandchildren2 of parent1',
					},
				],
			},
		],
	},
	{
		name: 'parent2',
	},
	{
		name: 'parent3',
	},
];

type Entry = {
	name: string;
	children?: Entry[];
};

const Entry = ({ name, children }: Entry) => {
	const [isExpanded, setIsExpanded] = useReducer(state => !state, false);
	return (
		<div className={styles.entry}>
			{children ? (
				<button onClick={setIsExpanded}>
					<span>{isExpanded ? '-' : '+'}</span>
					{name}
				</button>
			) : (
				<div>{name}</div>
			)}

			{isExpanded &&
				children &&
				children.map((entry: Entry) => (
					<Entry name={entry.name} children={entry.children} />
				))}
		</div>
	);
};

const SimpleTreeData = () => {
	return (
		<div className={styles.wrapper}>
			{entries.map((entry: Entry) => (
				<Entry key={entry.name} name={entry.name} children={entry.children} />
			))}
		</div>
	);
};

export default SimpleTreeData;
