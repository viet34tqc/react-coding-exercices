import { useState } from 'react';

const CallbackRef = () => {
  const [value, setValue] = useState<string[]>(['A', 'B', 'C']);
  const [newItemIndex, setNewItemIndex] = useState<number | null>(null);
  const handleChangeIntput = (updatedValue: string, idx: number) => {
    setValue(prev => prev.map((v, i) => (i === idx ? updatedValue : v)));
    if (newItemIndex) setNewItemIndex(null);
  };

  const handleAddItem = (idx: number) => {
    setValue(prev => [...prev.slice(0, idx + 1), '', ...prev.slice(idx + 1)]);
    setNewItemIndex(idx + 1);
  };
  return (
    <div className="flex">
      {value.map((v, idx) => (
        <div
          className="relative w-32 h-32 font-bold text-[24px] border border-white rounded-lg grid place-items-center"
          key={idx}
        >
          <input
            ref={ref => idx === newItemIndex && ref?.focus()}
            className="w-6 text-center bg-transparent border-0"
            value={v}
            onChange={e => handleChangeIntput(e.currentTarget.value, idx)}
          />
          {idx !== value.length - 1 && (
            <span
              className="w-8 h-24 absolute right-[-1rem] bg-red z-1 cursor-pointer  "
              onClick={() => handleAddItem(idx)}
            ></span>
          )}
        </div>
      ))}
    </div>
  );
};

export default CallbackRef;
