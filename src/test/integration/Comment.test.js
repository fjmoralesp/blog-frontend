/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Comments from '../../components/comments/Comments';
import userEvent from "@testing-library/user-event";

jest.mock('../../apis/users.api', () => ({
    useUser: () => ({ data: { username: 'testing' } }),
    useLogin: jest.fn(),
    useRegister: jest.fn(),
    useLogout: jest.fn(),
    AuthLoader: ({ renderUnauthenticated, children }) => <div data-testid="auth-loader">AuthLoader</div>
}));

const queryClient = new QueryClient();

describe('Comment', () => {
    it('should allow to create posts', async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Comments comments={[]} postId={1} />
            </QueryClientProvider>
        );

        act(() => {
            userEvent.type(screen.getByLabelText(/body/i), 'testing body');
            userEvent.click(screen.getByTestId('submit-comment-button'));
        });

        const text = await screen.findByText('testing body');
        expect(text).toBeInTheDocument();
    });
});