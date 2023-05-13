import { useState } from 'react';
import styles from './Rating.module.css'
type Props = {
  length?: number;
};

const Star = () => (
  <svg
    fill="currentColor"
    stroke="currentColor"
    width="2rem"
    height="2rem"
    strokeWidth="1"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
    ></path>
  </svg>
);

const Rating = ({ length = 5 }: Props) => {
  const [checked, setChecked] = useState<number | null>(null);
  return (
    <div className={styles.wrapper}>
      {[...Array(length)].map((_, i) => (
        <span>
          <label htmlFor={`id-${i}`}>
            <Star />
          </label>
          <input
            type="radio"
            value={i + 1}
            checked={checked === i + 1}
            onChange={() => setChecked(i + 1)}
            id={`id-${i}`}
            className="visually-hidden"
          />
        </span>
      ))}
    </div>
  );
};

export default Rating;
