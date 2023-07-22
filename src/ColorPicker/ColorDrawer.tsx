import { useState } from 'react';
import styles from './ColorDrawer.module.css';
import { useColorPicker } from './ColorPickerContext';

const ColorDrawerSquare = () => {
  const { color } = useColorPicker();
  const [bg, setBg] = useState<string>('#ccc');
  return (
    <div
      className={styles.square}
      onClick={() => setBg(color || '#ccc')}
      style={{ backgroundColor: bg }}
    ></div>
  );
};

const ColorDrawer = () => {
  return (
    <div className={styles.wrapper}>
      {Array(10)
        .fill(0)
        .map((v, i) => (
          <ColorDrawerSquare key={i} />
        ))}
    </div>
  );
};

export default ColorDrawer;
