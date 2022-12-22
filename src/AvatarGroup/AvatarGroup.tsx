import styles from './AvatarGroup.module.css';

type Avatar = {
	img?: string;
	name: string;
};

type Props = {
	data?: Array<Avatar>;
	maxLength?: number;
	size?: 'xs' | 'sm' | 'md' | 'lg';
};

const defaultData: Array<Avatar> = [
	{
		img: '',
		name: 'Thomas John ABC',
	},
	{
		img: 'https://znews-photo.zingcdn.me/w1000/Uploaded/bzivolby/2022_12_21/ntl12_zing.jpg',
		name: 'Thomas John ABC',
	},
	{
		img: 'https://imgur.com/AD3MbBi',
		name: 'Thomas John ABC',
	},
];

const Avatar = ({ ava }: { ava: Avatar }) => {
	const avaName = ava.name
		.trim()
		.split(' ')
		.map(w => w.charAt(0))
		.join('')
		.toUpperCase()
		.slice(0, 2);
	return (
		<div className={styles.item}>
			{ava?.img ? <img src={ava.img} alt={ava.name} /> : avaName}
		</div>
	);
};

const MoreAvatarText = ({ text }: { text: string }) => (
	<div className={styles.item}>{text}</div>
);

const AvatarGroup = ({
	data = defaultData,
	maxLength = 2,
	size = 'sm',
}: Props) => {
	if (data.length === 0) return null;
	const slicedData = data.slice(0, maxLength);
	return (
		<div
			className={[styles.wrapper, `${styles[size]}`].join(' ')}
			data-testid="avatar-wrapper"
		>
			{slicedData.map((ava, index) => (
				<Avatar key={index} ava={ava} />
			))}

			{data.length > maxLength && (
				<MoreAvatarText text={`+${(data.length - maxLength).toString()}`} />
			)}
		</div>
	);
};

export default AvatarGroup;
