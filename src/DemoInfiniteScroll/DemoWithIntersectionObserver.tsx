import { useCallback, useEffect, useRef, useState } from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import { Card } from './Card';
import './style.css';

const DemoWithIntersectionObserver = () => {
  const initialProducts = Array(20)
    .fill(0)
    .map((_, index) => ({
      name: `${index + 1}`,
    }));
  const [isFetching, setIsFetching] = useState(false);
  const [products, setProducts] = useState(initialProducts);
  const { ref: bottomRef, isVisible } = useIntersectionObserver();
  const ref = useRef<() => void>();

  useEffect(() => {
    ref.current = () => {
      const fetchedProduct = Array(20)
        .fill(0)
        .map((_, index) => ({
          name: `${products.length + index + 1}`,
        }));
      setIsFetching(false);
      setProducts([...products, ...fetchedProduct]);
    };
  }, [products]);

  const fetchModeProduct = useCallback(() => {
    ref?.current?.();
  }, []);

  const handleReachBottom = useCallback(() => {
    setIsFetching(true);
    setTimeout(fetchModeProduct, 2000);
  }, [fetchModeProduct]);

  useEffect(() => {
    if (isVisible) {
      handleReachBottom();
    }
  }, [isVisible]);

  return (
    <>
      <div className="grid">
        {products.map((product, index) => (
          <Card key={index}>{product.name}</Card>
        ))}
      </div>
      <div className="bottom" style={{ height: '1px' }} ref={bottomRef} />
      {isFetching && (
        <div className="loading">
          <div className="loading__inner">Loading more data ...</div>
        </div>
      )}
    </>
  );
};

export default DemoWithIntersectionObserver;
