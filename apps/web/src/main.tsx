import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { I18nextProvider } from 'react-i18next';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from './app';
import i18n from './app/i18n';
import { localizeTheme } from './app/utils/localizeTheme.util';
import { ToastContainer } from 'react-toastify';
import { type SupportedLanguages } from './app/constants/i18n.constants';

const queryClient = new QueryClient();

const root: ReactDOM.Root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <Router>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={localizeTheme(i18n.language as SupportedLanguages)}>
          <QueryClientProvider client={queryClient}>
            <ToastContainer
              position="bottom-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
            <App />
          </QueryClientProvider>
        </ThemeProvider>
      </I18nextProvider>
    </Router>
  </StrictMode>,
);
