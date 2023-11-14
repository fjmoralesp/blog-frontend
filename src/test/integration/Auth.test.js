/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Auth from '../../components/auth/Auth';
import userEvent from '@testing-library/user-event';

jest.mock('../../apis/users.api', () => ({
    useUser: jest.fn(),
    useLogin: () => ({ mutate: jest.fn()}),
    useRegister: () => ({ mutate: jest.fn()}),
    useLogout: () => ({ mutate: jest.fn()}),
    AuthLoader: ({ renderUnauthenticated, children }) => <div data-testid="auth-loader">
        <>
            {renderUnauthenticated()}
            {children}
        </>
    </div>
}));

const queryClient = new QueryClient();

describe('Auth', () => {
    it('should allow to create a new user', async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Auth />
            </QueryClientProvider>
        );

        act(() => {
            userEvent.click(screen.getByTestId('sign-up-button'));
        });

        await screen.findByTestId('submit-sign-up-button');

        act(() => {
            userEvent.type(screen.getByLabelText(/username/i), 'testuser');
            userEvent.type(screen.getByLabelText(/password/i), 'testpass');
            userEvent.click(screen.getByTestId('submit-sign-up-button'));
        });

        const button = await screen.findByTestId('logout-button');
        expect(button).toBeInTheDocument();
    });

    it('should allow to login', async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Auth />
            </QueryClientProvider>
        );

        act(() => {
            userEvent.click(screen.getByTestId('login-button'));
        });

        await screen.findByTestId('submit-login-button');

        act(() => {
            userEvent.type(screen.getByLabelText(/username/i), 'testuser');
            userEvent.type(screen.getByLabelText(/password/i), 'testpass');
            userEvent.click(screen.getByTestId('submit-login-button'));
        });

        const button = await screen.findByTestId('logout-button');
        expect(button).toBeInTheDocument();
    });

    it('should allow to logout', async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Auth />
            </QueryClientProvider>
        );

        act(() => {
            userEvent.click(screen.getByTestId('login-button'));
        });

        await screen.findByTestId('submit-login-button');

        act(() => {
            userEvent.type(screen.getByLabelText(/username/i), 'testuser');
            userEvent.type(screen.getByLabelText(/password/i), 'testpass');
            userEvent.click(screen.getByTestId('submit-login-button'));
        });

        await screen.findByTestId('logout-button');

        act(() => {
            userEvent.click(screen.getByTestId('logout-button'));
        });

        const button = await screen.findByTestId('login-button');
        expect(button).toBeInTheDocument();
    });
});