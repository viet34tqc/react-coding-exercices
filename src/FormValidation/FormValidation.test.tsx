import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormValidation from './FormValidation';
import {
  EMAIL_NOT_VALID_MESS,
  EMAIL_REQUIRED_MESS,
  PASSWORD_MIN_LENGTH_MESS,
  PASSWORD_REQUIRED_MESS,
} from './constants';

describe('FormValidation test', () => {
  beforeEach(() => {
    render(<FormValidation />);
  });

  test('display empty field error', async () => {
    const submitButton = screen.getByRole('button');
    await userEvent.click(submitButton);
    expect(screen.getByText(EMAIL_REQUIRED_MESS)).toBeInTheDocument();
    expect(screen.getByText(PASSWORD_REQUIRED_MESS)).toBeInTheDocument();
    expect(screen.getByText(PASSWORD_MIN_LENGTH_MESS)).toBeInTheDocument();
    expect(screen.getByText(EMAIL_NOT_VALID_MESS)).toBeInTheDocument();
  });

  test('Email invalid', async () => {
    const submitButton = screen.getByRole('button');
    const emailInput = screen.getByTestId('email');
    await userEvent.type(emailInput, 'fadfdasfdsf');
    await userEvent.click(submitButton);
    expect(screen.getByText(EMAIL_NOT_VALID_MESS)).toBeInTheDocument();
  });
  test('Password invalid', async () => {
    const submitButton = screen.getByRole('button');
    const passwordInput = screen.getByTestId('password');
    await userEvent.type(passwordInput, '123');
    await userEvent.click(submitButton);
    expect(screen.getByText(PASSWORD_MIN_LENGTH_MESS)).toBeInTheDocument();
  });
});
