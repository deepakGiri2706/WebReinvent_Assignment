import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import UserProfile from './UserProfile';
import { getUsers } from '../services/auth_service';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { User } from '../services/auth_service';

jest.mock('../services/auth_service');
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

const mockUsers: User[] = [
  {
    id: 1,
    email: 'user1@example.com',
    first_name: 'User1',
    last_name: 'One',
    avatar: 'https://reqres.in/img/faces/1-image.jpg',
  },
  {
    id: 2,
    email: 'user2@example.com',
    first_name: 'User2',
    last_name: 'Two',
    avatar: 'https://reqres.in/img/faces/2-image.jpg',
  },
];

describe('UserProfile', () => {
  const mockDispatch = jest.fn();
  const mockNavigate = jest.fn();

  

  test('renders UserProfile component', () => {
    render(<UserProfile />);
    expect(screen.getByText('Web Reinvent')).toBeInTheDocument();
    expect(screen.getByText('Users')).toBeInTheDocument();
  });

  test('fetches and displays users', async () => {
    render(<UserProfile />);
    await waitFor(() => {
      expect(screen.getByText('User1')).toBeInTheDocument();
      expect(screen.getByText('user1@example.com')).toBeInTheDocument();
      expect(screen.getByText('User2')).toBeInTheDocument();
      expect(screen.getByText('user2@example.com')).toBeInTheDocument();
    });
  });

  test('handles logout', async () => {
    render(<UserProfile />);
    const logoutButton = screen.getByText('Log Out');

    fireEvent.click(logoutButton);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({ type: 'auth/logout' });
      expect(mockNavigate).toHaveBeenCalledWith('/signin');
    });
  });
});
