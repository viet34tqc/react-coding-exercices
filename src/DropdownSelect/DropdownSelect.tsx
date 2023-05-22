import clsx from 'clsx';
import { useEffect, useReducer, useRef, useState } from 'react';
import { ChevronDown } from '../icons/ChevronDown';
import { CloseIcon } from '../icons/Close';

type SelectOption = {
  label: string;
  value: number | string;
};

type Props = {
  options: SelectOption[];
  value?: SelectOption;
  isMulti?: boolean;
  onChange?: (value: SelectOption) => void;
};

const DropdownSelect = ({ options, isMulti = true, value }: Props) => {
  const [isOpenOptions, toggle] = useReducer(state => !state, false);
  const ref = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<SelectOption[]>(() =>
    value ? [value] : []
  );
  const handleSelect = (o: SelectOption) => {
    if (selected.some(option => option.value === o.value)) return;
    setSelected(isMulti ? [...selected, o] : [o]);
    toggle();
  };
  const removeSelect = (o: SelectOption) => {
    setSelected(prev => prev.filter(option => option.value !== o.value));
  };
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!ref.current || ref.current.contains(e.target as Node)) return;
      if (isOpenOptions) toggle();
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [isOpenOptions]);
  return (
    <div className="relative">
      <div
        ref={ref}
        onClick={toggle}
        className="w-[500px] border border-gray-200 rounded-md flex items-center gap-1 p-2 relative"
      >
        <div className="flex gap-2 flex-1">
          {selected.length > 0 &&
            selected.map(option => (
              <span
                key={option.value}
                onClick={() => removeSelect(option)}
                className="flex p-1 gap-1 bg-gray-400 items-center rounded-sm"
              >
                {option.label} <CloseIcon width="1rem" height="1rem" />
              </span>
            ))}
        </div>
        {selected.length > 0 && (
          <button
            className="ml-auto bg-transparent border-0 p-1"
            onClick={() => {
              if (isOpenOptions) toggle();
              setSelected([]);
            }}
          >
            <CloseIcon />
          </button>
        )}
        <span className="w-[1px] bg-gray-200 h-4"></span>
        <button className="bg-transparent border-0 p-1">
          <ChevronDown />
        </button>
      </div>
      {isOpenOptions && (
        <div className="absolute h-[150px] overflow-y-auto left-0 right-0 top-[calc(100%+1rem)] border border-gray-200 rounded-md p-2">
          {options.map(option => (
            <div
              onClick={() => handleSelect(option)}
              className={clsx(
                {
                  'bg-blue-400': selected.some(o => option.value === o.value),
                },
                'cursor-pointer p-1 bg-transparent transition hover:bg-blue-200'
              )}
              key={option.value}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownSelect;
