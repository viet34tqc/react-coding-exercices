import { useColorPicker } from './ColorPickerContext';

const color = ['red', 'green', 'blue', 'yellow'];

const ColorPicker = () => {
  const { setColor } = useColorPicker();
  return (
    <div>
      {color.map(c => (
        <input key={c} type="radio" onChange={() => setColor(c)} name="color" />
      ))}
    </div>
  );
};

export default ColorPicker;
