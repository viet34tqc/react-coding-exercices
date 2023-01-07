import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Button from './Button/Button';
function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Button href="/home">AbC</Button>
			</div>
		</BrowserRouter>
	);
}

export default App;
