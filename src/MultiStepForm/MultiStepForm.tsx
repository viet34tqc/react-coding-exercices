import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MultiFormContextProvider from './FormContext';
import Step1 from './Step1';
const Step2 = lazy(() => import('./Step2'));
const Result = lazy(() => import('./Result'));

const MultiStepForm = () => {
	return (
		<MultiFormContextProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Step1 />} />
					<Route
						path="/step2"
						element={
							<Suspense fallback={<>...Loading</>}>
								<Step2 />
							</Suspense>
						}
					/>
					<Route
						path="/result"
						element={
							<Suspense fallback={<>...Loading</>}>
								<Result />
							</Suspense>
						}
					/>
				</Routes>
			</BrowserRouter>
		</MultiFormContextProvider>
	);
};

export default MultiStepForm;
