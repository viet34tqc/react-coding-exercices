import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MultiFormContextProvider from './FormContext';
import { routes } from './routes';
const Step2 = lazy(() => import('./Step2'));
const Result = lazy(() => import('./Result'));

const MultiStepForm = () => {
  const router = createBrowserRouter(routes);
  return (
    <MultiFormContextProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </MultiFormContextProvider>
  );
};

export default MultiStepForm;
