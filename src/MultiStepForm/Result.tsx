import { Button } from '../ui/Button';
import { useMultiFormContext } from './FormContext';

const Result = () => {
	const {
		formData: { firstName, email, gender, cities },
	} = useMultiFormContext();
	return (
		<>
			<ul>
				<li>firstName: {firstName}</li>
				<li>email: {email}</li>
				<li>gender: {gender}</li>
				<li>cities: {cities?.length > 0 && cities.join(', ')}</li>
			</ul>
			<Button to="/step2">&lt; Back</Button>
		</>
	);
};

export default Result;
