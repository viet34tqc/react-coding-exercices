import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import AvatarGroup from './AvatarGroup';

const data = [
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

describe('Test AvatarGroup', () => {
	it('should have class md if size = md', () => {
		const maxLength = 2;
		render(<AvatarGroup data={data} size="md" maxLength={maxLength} />);
		const container = screen.getByTestId('avatar-wrapper');
		expect(container.getAttribute('class')).toContain('md');
	});
	it('should display correct number of image if it >= maxLength', () => {
		const maxLength = 2;
		render(<AvatarGroup data={data} size="md" maxLength={maxLength} />);
		const container = screen.getByTestId('avatar-wrapper');
		const totalImage = container.querySelectorAll('img').length;
		expect(totalImage).toEqual(1);
		expect(screen.getByText('+1')).toBeInTheDocument();
	});
	it('should render name if image is blank', () => {
		const maxLength = 2;
		render(<AvatarGroup data={data} size="md" maxLength={maxLength} />);
		expect(screen.getByText('TJ')).toBeInTheDocument();
	});
});
