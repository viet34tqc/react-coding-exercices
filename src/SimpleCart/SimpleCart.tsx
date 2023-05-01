import { useState } from 'react';

const items = [
  { name: 'apple', price: 0.39 },
  { name: 'banana', price: 0.79 },
  { name: 'cherry', price: 3.99 },
];

type TItem = {
  name: string;
  price: number;
};

type TCartItem = TItem & {
  quantity: number;
};

type Cart = Record<string, TCartItem>;

const SimpleCart = () => {
  const [cart, setCart] = useState<Cart>({});

  const handleAdd = (item: TItem) => {
    const itemInCart = item.name in cart;
    if (itemInCart) {
      setCart({
        ...cart,
        [item.name]: {
          ...cart[item.name],
          quantity: ++cart[item.name].quantity,
        },
      });
    } else {
      setCart({
        ...cart,
        [item.name]: {
          ...item,
          quantity: 1,
        },
      });
    }
  };

  const handleDecrease = (item: TItem) => {
    if (cart[item.name].quantity === 1) {
      const nextCart = { ...cart };
      delete nextCart[item.name];
      setCart(nextCart);
    } else {
      setCart({
        ...cart,
        [item.name]: {
          ...cart[item.name],
          quantity: cart[item.name].quantity - 1,
        },
      });
    }
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="flex flex-col gap-4">
        {items.map(i => (
          <div key={i.name}>
            <strong>{i.name}</strong>
            <p>{i.price}</p>
            <button onClick={() => handleAdd(i)}>Add to cart</button>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <h2>Cart</h2>
        {Object.keys(cart).length === 0 ? (
          <p>There is no items</p>
        ) : (
          Object.values(cart).map(i => (
            <div key={i.name}>
              <h3>{i.name}</h3>
              <div className="flex gap-2">
                <button onClick={() => handleDecrease(i)}>-</button>
                {i.quantity}
                <button onClick={() => handleAdd(i)}>+</button>
              </div>
              <div>{i.price}</div>
            </div>
          ))
        )}
      </div>

      <p>
        Total price:{' '}
        {Object.values(cart)
          .map(i => i.price * i.quantity)
          .reduce((acc, cur) => acc + cur, 0)
          .toFixed(2)}
      </p>
    </div>
  );
};

export default SimpleCart;
