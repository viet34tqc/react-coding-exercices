import './App.css';
import DropdownSelect from './DropdownSelect/DropdownSelect';

const options = [
  { label: 'One', value: 1 },
  { label: 'Two', value: 2 },
  { label: 'Three', value: 3 },
  { label: 'Four', value: 4 },
  { label: 'Five', value: 5 },
];

function App() {
  return <DropdownSelect options={options} />;
}

export default App;
