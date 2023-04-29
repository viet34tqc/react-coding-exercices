import { FormEvent, useState } from 'react';

type ErrorMessages = {
  email: string[];
  password: string[];
  passwordConfirm: string[];
};

const FormValidation = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [messages, setMessages] = useState<ErrorMessages>({
    email: [''],
    password: [''],
    passwordConfirm: [''],
  });

  const getErrors = () => {
    const errors = {
      email: [''],
      password: [''],
      passwordConfirm: [''],
    };
    if (!email) {
      errors['email'].push('Email is required');
    }
    if (!password) {
      errors['password'].push('Password is required');
    }
    if (!passwordConfirm) {
      errors['passwordConfirm'].push('Password Confirm is required');
    }
    if (!email.includes('@')) {
      errors['email'].push('Email is not valid');
    }
    if (password.length < 8) {
      errors['password'].push('Passwords must be 8 characters or longer');
    }
    if (password !== passwordConfirm) {
      errors['passwordConfirm'].push('Passwords must match');
    }
    return errors;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = getErrors();
    setMessages(errors);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up!</h2>
      <label htmlFor="email">Email</label>
      <input
        type="text"
        name="email"
        onChange={e => setEmail(e.target.value)}
      />
      <div>
        {messages.email.map(m => (
          <p key={m}>{m}</p>
        ))}
      </div>
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        onChange={e => setPassword(e.target.value)}
      />
      <div>
        {messages.password.map(m => (
          <p key={m}>{m}</p>
        ))}
      </div>
      <label htmlFor="password-confirm">Confirm Password </label>
      <input
        type="password"
        name="password-confirm"
        onChange={e => setPasswordConfirm(e.target.value)}
      />
      <div>
        {messages.passwordConfirm.map(m => (
          <p key={m}>{m}</p>
        ))}
      </div>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default FormValidation;
