import { useColorPicker } from './ColorPickerContext';

const colors = ['red', 'green', 'blue', 'yellow'];

const ColorPicker = () => {
  const { setColor } = useColorPicker();
  return (
    <div>
      {colors.map(c => (
        <input key={c} type="radio" onChange={() => setColor(c)} name="color" />
      ))}
    </div>
  );
};

export default ColorPicker;
