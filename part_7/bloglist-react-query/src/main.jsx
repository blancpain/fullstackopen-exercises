import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { NotificationContextProvider } from './NotificationContext.jsx';
import { UserContextProvider } from './UserContext.jsx';

import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserContextProvider>
    <NotificationContextProvider>
      <QueryClientProvider client={queryClient}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </QueryClientProvider>
    </NotificationContextProvider>
  </UserContextProvider>,
);
