import { PropsWithChildren } from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

export const CardIntersection = ({ children }: PropsWithChildren) => {
  const { ref } = useIntersectionObserver({
    onIntersecting: ele => {
      ele.classList.add('card__animated');
    },
  });
  return (
    <div className="card" ref={ref}>
      {children}
    </div>
  );
};
