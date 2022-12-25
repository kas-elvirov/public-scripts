import { fetch } from 'frontity';
import { ServerAction } from 'frontity/types';

import { Packages } from '../../modules/_App/components/App/types';

interface JWTAuthTokenResponce {
  token: string;
  user_display_name: string;
  user_email: string;
  user_nicename: string;
}

export const beforeSSR: ServerAction<Packages> = async ({ state }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const apiUrl: string = state.source.api; // it's actually exists

  const res: Response = await fetch(
    `${apiUrl}jwt-auth/v1/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
      }),
      redirect: 'follow',
    },
  );
  const body = await res.json() as JWTAuthTokenResponce;

  state.theme.token = body.token;
};
