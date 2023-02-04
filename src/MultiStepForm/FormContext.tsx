import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { Step1FormData } from './Step1';
import { Step2FormData } from './Step2';

type TMultiFormContext = {
	formData: Step1FormData & Step2FormData;
	setFormData: React.Dispatch<React.SetStateAction<{}>>;
};

const MultiFormContext = createContext<TMultiFormContext | null>(null);

const MultiFormContextProvider = ({ children }: PropsWithChildren) => {
	const [formData, setFormData] = useState({});
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
