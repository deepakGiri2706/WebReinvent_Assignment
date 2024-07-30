import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignInForm from './SignInForm';
import { loginUser } from '../services/auth_service';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

jest.mock('../services/auth_service');
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('SignInForm', () => {
  const mockDispatch = jest.fn();
  const mockNavigate = jest.fn();

  

  test('renders SignInForm component', () => {
    render(<SignInForm />);
    expect(screen.getByText('Welcome')).toBeInTheDocument();
  });

  test('handles input changes', () => {
    render(<SignInForm />);
    const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
    const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: 'deepak@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('deepak@gmail.com');
    expect(passwordInput.value).toBe('password123');
  });

  test('validates form inputs and enables submit button', () => {
    render(<SignInForm />);
    const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
    const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;
    const submitButton = screen.getByText('Log in') as HTMLButtonElement;

    expect(submitButton).toBeDisabled();

    fireEvent.change(emailInput, { target: { value: 'deepak@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(submitButton).not.toBeDisabled();
  });

  test('shows error message on invalid login', async () => {
    (loginUser as jest.Mock).mockResolvedValueOnce({ token: null });
    render(<SignInForm />);
    const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
    const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;
    const submitButton = screen.getByText('Log in') as HTMLButtonElement;

    fireEvent.change(emailInput, { target: { value: 'deepak@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Invalid Password or Email')).toBeInTheDocument();
    });
  });

  test('navigates to dashboard on successful login with email eve.holt@reqres.in', async () => {
    (loginUser as jest.Mock).mockResolvedValueOnce({ token: 'test-token' });
    render(<SignInForm />);
    const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
    const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;
    const submitButton = screen.getByText('Log in') as HTMLButtonElement;

    fireEvent.change(emailInput, { target: { value: 'eve.holt@reqres.in' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({ type: 'auth/login', payload: 'test-token' });
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
  });
});
