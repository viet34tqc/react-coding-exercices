import { PropsWithChildren, createContext, useContext, useState } from 'react';

type TColorPickerContext = {
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
};

const ColorPickerContext = createContext<TColorPickerContext | null>(null);

export const ColorPickerProvider = ({ children }: PropsWithChildren) => {
  const [color, setColor] = useState('');
  const value = {
    color: color,
    setColor: setColor,
  };
  return (
    <ColorPickerContext.Provider value={value}>
      {children}
    </ColorPickerContext.Provider>
  );
};

export const useColorPicker = () => {
  const context = useContext(ColorPickerContext) as TColorPickerContext;
  if (context === undefined) {
    throw new Error('useSomething must be used within a SomethingProvider');
  }
  return context;
};
