import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import {SignUpForm} from './SignUpForm';
import { createUser } from '../services/auth_service';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

jest.mock('../services/auth_service');
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('SignUpForm', () => {
  const mockDispatch = jest.fn();
  const mockNavigate = jest.fn();

 
  test('renders SignUpForm component', () => {
    render(<SignUpForm />);
    expect(screen.getByText('Sign up')).toBeInTheDocument();
  });

  test('handles input changes', () => {
    render(<SignUpForm />);
    const nameInput = screen.getByLabelText('Full Name') as HTMLInputElement;
    const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
    const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;
    const confirmPasswordInput = screen.getByLabelText('Confirm Password') as HTMLInputElement;

    fireEvent.change(nameInput, { target: { value: 'Deepak Giri Doe' } });
    fireEvent.change(emailInput, { target: { value: 'eve.holt@reqres.in' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });

    expect(nameInput.value).toBe('Deepak Giri');
    expect(emailInput.value).toBe('eve.holt@reqres.in');
    expect(passwordInput.value).toBe('password123');
    expect(confirmPasswordInput.value).toBe('password123');
  });

  test('validates form inputs and enables submit button', () => {
    render(<SignUpForm />);
    const nameInput = screen.getByLabelText('Full Name') as HTMLInputElement;
    const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
    const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;
    const confirmPasswordInput = screen.getByLabelText('Confirm Password') as HTMLInputElement;
    const submitButton = screen.getByText('Create Account') as HTMLButtonElement;

    expect(submitButton).toBeDisabled();

    fireEvent.change(nameInput, { target: { value: 'Deepak Giri' } });
    fireEvent.change(emailInput, { target: { value: 'eve.holt@reqres.in' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });

    expect(submitButton).not.toBeDisabled();
  });

  test('shows error message on invalid sign up', async () => {
    (createUser as jest.Mock).mockResolvedValueOnce({ token: null });
    render(<SignUpForm />);
    const nameInput = screen.getByLabelText('Full Name') as HTMLInputElement;
    const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
    const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;
    const confirmPasswordInput = screen.getByLabelText('Confirm Password') as HTMLInputElement;
    const submitButton = screen.getByText('Create Account') as HTMLButtonElement;

    fireEvent.change(nameInput, { target: { value: 'Deepak Giri' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Unable To Login')).toBeInTheDocument();
    });
  });

  test('navigates to dashboard on successful sign up', async () => {
    (createUser as jest.Mock).mockResolvedValueOnce({ token: 'test-token' });
    render(<SignUpForm />);
    const nameInput = screen.getByLabelText('Full Name') as HTMLInputElement;
    const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
    const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;
    const confirmPasswordInput = screen.getByLabelText('Confirm Password') as HTMLInputElement;
    const submitButton = screen.getByText('Create Account') as HTMLButtonElement;

    fireEvent.change(nameInput, { target: { value: 'Deepak Giri' } });
    fireEvent.change(emailInput, { target: { value: 'eve.holt@reqres.in' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({ type: 'auth/login', payload: 'test-token' });
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
  });
});
