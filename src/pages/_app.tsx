import '@/styles/globals.css';
import { Auth0Provider } from '@auth0/auth0-react';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  const auth0Domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN;
  const auth0ClientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID;

  if (!auth0Domain || !auth0ClientId) throw new Error('Unspecified auth0 parameters');

  return (
    <Auth0Provider
      domain={auth0Domain}
      clientId={auth0ClientId}
      authorizationParams={{ redirect_uri: 'http://localhost:3000', audience: 'https://api.prioriti.plus' }}
    >
      <MantineProvider withNormalizeCSS>
        <Notifications />
        <Component {...pageProps} />
      </MantineProvider>
    </Auth0Provider>
  );
}
