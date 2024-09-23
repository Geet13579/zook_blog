'use client';

import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { store } from '@redux/store';
// import { useEffect } from 'react';
// import initializeGoogleTagManager from '@utils/googleTagManager';

export const queryClient = new QueryClient();

export default function CustomWrapper({ children }) {
  // useEffect(() => {
  //   initializeGoogleTagManager(process.env.GTM);
  // }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>{children}</Provider>
    </QueryClientProvider>
  );
}
