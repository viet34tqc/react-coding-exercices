import { FormEvent, useReducer, useState } from 'react';
import { Button } from '../ui/Button';
import { InputField } from '../ui/FormFields/InputField';
import {
  EMAIL_NOT_VALID_MESS,
  EMAIL_REQUIRED_MESS,
  PASSWORD_CONFIRM_REQUIRED_MESS,
  PASSWORD_MATCH_MESS,
  PASSWORD_MIN_LENGTH_MESS,
  PASSWORD_REQUIRED_MESS,
} from './constants';
const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
type Errors = {
  email: string[];
  password: string[];
  passwordConfirm: string[];
};

const defaultState = {
  email: '',
  password: '',
  passwordConfirm: '',
};

type prevState = typeof defaultState;
type nextState = {
  [K in keyof prevState]: Record<K, prevState[K]>;
}[keyof prevState];

const FormValidation = () => {
  const [state, setState] = useReducer(
    (prev: prevState, next: nextState) => ({ ...prev, ...next }),
    {
      email: '',
      password: '',
      passwordConfirm: '',
    }
  );

  const [errors, setErrors] = useState<Errors>({
    email: [] as string[],
    password: [] as string[],
    passwordConfirm: [] as string[],
  });

  const getErrors = () => {
    const err = {
      email: [] as string[],
      password: [] as string[],
      passwordConfirm: [] as string[],
    };
    if (!state.email) {
      err['email'].push(EMAIL_REQUIRED_MESS);
    }
    if (!state.password) {
      err['password'].push(PASSWORD_REQUIRED_MESS);
    }
    if (state.password && !state.passwordConfirm) {
      err['passwordConfirm'].push(PASSWORD_CONFIRM_REQUIRED_MESS);
    }
    if (!emailRegex.test(state.email)) {
      err['email'].push(EMAIL_NOT_VALID_MESS);
    }
    if (state.password.length < 8) {
      err['password'].push(PASSWORD_MIN_LENGTH_MESS);
    }
    if (state.password !== state.passwordConfirm) {
      err['passwordConfirm'].push(PASSWORD_MATCH_MESS);
    }
    return err;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = getErrors();
    setErrors(errors);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up!</h2>
      <label htmlFor="email">Email</label>
      <InputField
        type="text"
        name="email"
        data-testid="email"
        onChange={e => setState({ email: e.target.value })}
      />
      <div>
        {errors.email.map(m => (
          <p key={m}>{m}</p>
        ))}
      </div>
      <label htmlFor="password">Password</label>
      <InputField
        type="password"
        name="password"
        data-testid="password"
        onChange={e => setState({ password: e.target.value })}
      />
      <div>
        {errors.password.map(m => (
          <p key={m}>{m}</p>
        ))}
      </div>
      <label htmlFor="password-confirm">Confirm Password </label>
      <InputField
        type="password"
        name="password-confirm"
        data-testid="password-confirm"
        onChange={e => setState({ passwordConfirm: e.target.value })}
      />
      <div>
        {errors.passwordConfirm.map(m => (
          <p key={m}>{m}</p>
        ))}
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default FormValidation;
