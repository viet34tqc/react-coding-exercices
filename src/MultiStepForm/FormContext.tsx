import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { Step1FormData } from './Step1';
import { Step2FormData } from './Step2';

type TFormData = Step1FormData & Step2FormData;

type TMultiFormContext = {
	formData: TFormData;
	setFormData: React.Dispatch<React.SetStateAction<TFormData>>;
};

const MultiFormContext = createContext<TMultiFormContext | null>(null);

const MultiFormContextProvider = ({ children }: PropsWithChildren) => {
	const [formData, setFormData] = useState<TFormData>({
		firstName: '',
		email: '',
		gender: '',
		cities: [],
	});
	const value = {
		formData,
		setFormData,
	};
	return (
		<MultiFormContext.Provider value={value}>
			{children}
		</MultiFormContext.Provider>
	);
};

export const useMultiFormContext = () => {
	const formContext = useContext(MultiFormContext);

	if (!formContext) {
		throw new Error(
			'useMultiFormContext has to be used within <MultiFormContext.Provider>'
		);
	}

	return formContext;
};

export default MultiFormContextProvider;
