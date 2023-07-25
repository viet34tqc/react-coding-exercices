import { lazy } from 'react';
import Step1 from './Step1';
import { PathConstants } from './constants';
const Step2 = lazy(() => import('./Step2'));
const Result = lazy(() => import('./Result'));

export const routes = [
  {
    path: PathConstants.STEP1,
    element: <Step1 />,
  },
  {
    path: PathConstants.STEP2,
    element: <Step2 />,
  },
  {
    path: PathConstants.RESULT,
    element: <Result />,
  },
];
