import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { useMultiFormContext } from './FormContext';
import { PathConstants } from './constants';

const Result = () => {
  const {
    formData: { firstName, email, gender, cities },
  } = useMultiFormContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (!firstName || !email) {
      navigate(PathConstants.STEP1);
    }
  }, []);

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
