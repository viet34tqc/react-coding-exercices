import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { FieldError } from '../ui/FormFields/FieldError';
import { FormControl } from '../ui/FormFields/FormControl';
import { Label } from '../ui/FormFields/Label';
import SelectField2 from '../ui/FormFields/SelectField/SelectField2';
import { useMultiFormContext } from './FormContext';

export type Step2FormData = {
	gender: string;
};

const Step2 = () => {
	const { formData, setFormData } = useMultiFormContext();
	const methods = useForm<Step2FormData>({
		defaultValues: {
			gender: formData.gender,
		},
	});
	const { register, handleSubmit } = methods;
	const navigate = useNavigate();
	const onSubmit = (data: Step2FormData) => {
		setFormData({ ...formData, ...data });
		navigate('/result');
	};
	return (
		<FormProvider {...methods}>
			<form className="w-full md:w-[50%]" onSubmit={handleSubmit(onSubmit)}>
				<div className="space-y-8">
					<FormControl className="flex-col">
						<Label htmlFor="gender">Gender</Label>
						<SelectField2
							id="gender"
							options={[
								{ value: 'male', label: 'Male' },
								{ value: 'female', label: 'Female' },
							]}
							{...register('gender', { required: true })}
						/>
						<FieldError name="gender" />
					</FormControl>
					<div className="flex justify-between gap-4">
						<Button to="/">&lt; Back</Button>
						<Button type="submit">Next &gt;</Button>
					</div>
				</div>
			</form>
		</FormProvider>
	);
};

export default Step2;
