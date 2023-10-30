'use client';
import { useState } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

function TanstackProvider({ children }: any) {
  const [client] = useState(new QueryClient());

  return (
    <>
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </>
  );
}

export { TanstackProvider };
