import { Button } from '../ui/Button';
import { useMultiFormContext } from './FormContext';

const Result = () => {
	const {
		formData: { firstName, email, gender },
	} = useMultiFormContext();
	return (
		<>
			<ul>
				<li>firstName: {firstName}</li>
				
				<li>email: {email}</li>
				<li>gender: {gender}</li>
			</ul>
			<Button to="/step2">&lt; Back</Button>
		</>
	);
};

export default Result;
