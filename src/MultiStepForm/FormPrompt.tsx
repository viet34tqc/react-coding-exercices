// FormPrompt.js
import { useEffect } from 'react';

export const FormPrompt = ({ hasUnsavedChanges }: any) => {
	useEffect(() => {
		const onBeforeUnload = e => {
			if (hasUnsavedChanges) {
				e.preventDefault();
				e.returnValue = '';
			}
		};
		window.addEventListener('beforeunload', onBeforeUnload);
		return () => {
			window.removeEventListener('beforeunload', onBeforeUnload);
		};
	}, [hasUnsavedChanges]);
};
