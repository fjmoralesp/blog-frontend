import React from 'react';
import Auth from './components/auth/Auth';
import { Container } from '@mui/material';
import { QueryClient, QueryClientProvider} from '@tanstack/react-query';
import Posts from './components/posts/Posts';

const queryClient = new QueryClient();

function App() {
    return (
      <QueryClientProvider client={queryClient}>
          <Container>
              <Auth />
              <Posts />
          </Container>
      </QueryClientProvider>
  );
}

export default App;
