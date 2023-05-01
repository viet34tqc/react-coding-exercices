import './App.css';
import ColorDrawer from './ColorPicker/ColorDrawer';
import ColorPicker from './ColorPicker/ColorPicker';
import { ColorPickerProvider } from './ColorPicker/ColorPickerContext';

function App() {
  return (
    <ColorPickerProvider>
      <ColorPicker />
      <ColorDrawer />
    </ColorPickerProvider>
  );
}

export default App;
