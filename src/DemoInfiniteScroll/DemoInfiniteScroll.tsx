import { useCallback, useEffect, useRef, useState } from 'react';
import usePrevious from '../hooks/usePrevious';
import { Card } from './Card';
import './style.css';

const DemoInfiniteScroll = () => {
  const initialProducts = Array(20)
    .fill(0)
    .map((_, index) => ({
      name: `${index + 1}`,
    }));
  const [isFetching, setIsFetching] = useState(false);
  const [products, setProducts] = useState(initialProducts);
  const [isInView, setIsInView] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const checkInView = () => {
    if (!bottomRef.current) return;
    const bottomRect = bottomRef.current.getBoundingClientRect();
    setIsInView(bottomRect.top <= window.innerHeight && bottomRect.bottom >= 0);
  };
  useEffect(() => {
    checkInView();
  }, []);

  useEffect(() => {
    document.addEventListener('scroll', checkInView);
    window.addEventListener('resize', checkInView);
    return () => {
      document.removeEventListener('scroll', checkInView);
      window.removeEventListener('resize', checkInView);
    };
  }, []);

  const wasInView = usePrevious(isInView);
  const fetchModeProduct = useCallback(() => {
    const fetchedProduct = Array(20)
      .fill(0)
      .map((_, index) => ({
        name: `${products.length + index + 1}`,
      }));
    setIsFetching(false);
    setProducts([...products, ...fetchedProduct]);
  }, [products]);

  const handleReachBottom = useCallback(() => {
    setIsFetching(true);
    setTimeout(fetchModeProduct, 2000);
  }, [fetchModeProduct]);

  useEffect(() => {
    if (isInView) {
      handleReachBottom();
    }
  }, [isInView, handleReachBottom]);
  return (
    <>
      <div className="grid">
        {products.map((product, index) => (
          <Card key={index}>{product.name}</Card>
        ))}
      </div>
      <div ref={bottomRef} />
      {isFetching && (
        <div className="loading">
          <div className="loading__inner">Loading more data ...</div>
        </div>
      )}
    </>
  );
};

export default DemoInfiniteScroll;
