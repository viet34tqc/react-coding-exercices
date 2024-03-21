import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import './style.css';

type Props = {};

const Tooltip = ({
  children,
  tipText,
}: PropsWithChildren<{ tipText: string }>) => {
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const tipRef = useRef<HTMLDivElement | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (!tipRef.current || !triggerRef.current || !isOpen) return;
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tipRect = tipRef.current.getBoundingClientRect();
    const top = triggerRect.top + window.scrollY + triggerRect.height + 8;
    const left = triggerRect.left + window.scrollX + tipRect.width / 2;

    tipRef.current.style.transform = `translate(${left}px, ${top}px)`;
  }, [isOpen]);

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>
      {isOpen &&
        createPortal(
          <div className="tip__content" ref={tipRef}>
            {tipText}
          </div>,
          document.body
        )}
    </>
  );
};

export default Tooltip;
