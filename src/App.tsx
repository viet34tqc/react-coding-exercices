import './App.css';
import FormValidation from './FormValidation/FormValidation';

type ErrorMessages = {
  email: string[];
  password: string[];
  passwordConfirm: string[];
};

function App() {
  return <FormValidation />;
}

export default App;
