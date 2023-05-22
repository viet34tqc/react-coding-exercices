import { IconProps } from './type';

export const CloseIcon = ({
  width = '1.5rem',
  height = '1.5rem',
}: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      ></path>
    </svg>
  );
};
