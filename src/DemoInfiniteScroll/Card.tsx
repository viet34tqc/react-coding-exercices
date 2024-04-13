import React, { PropsWithChildren } from 'react';
import { useInView } from '../hooks/useInView';

export const Card = ({ children }: PropsWithChildren) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const handleInView = (ele: HTMLDivElement) => {
    ele.classList.add('card__animated');
  };

  useInView(ref, handleInView);

  return (
    <div className="card" ref={ref}>
      {children}
    </div>
  );
};
