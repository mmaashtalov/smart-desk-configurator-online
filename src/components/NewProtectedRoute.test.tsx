/// <reference types="vitest/globals" />
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { NewProtectedRoute } from './NewProtectedRoute';
import { useAuth } from '../hooks/useAuth';

vi.mock('../hooks/useAuth');

const MockedComponent = () => <div>Protected Content</div>;

describe('NewProtectedRoute', () => {
  it('redirects to /login if user is not authenticated', () => {
    (useAuth as vi.Mock).mockReturnValue({ isAuthenticated: false, loading: false });

    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route path="/login" element={<div>Login Page</div>} />
          <Route path="/protected" element={<NewProtectedRoute />}>
            <Route index element={<MockedComponent />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });

  it('renders the child component if user is authenticated', () => {
    (useAuth as vi.Mock).mockReturnValue({ isAuthenticated: true, loading: false, user: { role: 'user' } });

    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route path="/protected" element={<NewProtectedRoute />}>
            <Route index element={<MockedComponent />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('redirects non-admin user from an admin-only route', () => {
    (useAuth as vi.Mock).mockReturnValue({ isAuthenticated: true, loading: false, user: { role: 'user' } });

    render(
      <MemoryRouter initialEntries={['/admin']}>
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/admin" element={<NewProtectedRoute adminOnly />}>
            <Route index element={<MockedComponent />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });
}); 