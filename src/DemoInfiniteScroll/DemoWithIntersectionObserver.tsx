import { useCallback, useEffect, useState } from 'react';
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
    if (isVisible) {
      handleReachBottom();
    }
  }, [isVisible, handleReachBottom]);
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

export default DemoWithIntersectionObserver;
