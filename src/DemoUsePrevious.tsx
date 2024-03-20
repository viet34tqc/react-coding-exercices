import { useEffect, useState } from 'react';
import usePrevious from './hooks/usePrevious';

const DemoUsePrevious = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };
  const previousScrollPosition = usePrevious(scrollPosition);
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  useEffect(() => {
    if (previousScrollPosition < scrollPosition) {
      console.log('Scroll down');
    } else if (previousScrollPosition > scrollPosition) {
      console.log('Scroll up');
    }
  }, [scrollPosition, previousScrollPosition]);
  return <div style={{ width: '500px', height: '200dvh' }}></div>;
};

export default DemoUsePrevious;
