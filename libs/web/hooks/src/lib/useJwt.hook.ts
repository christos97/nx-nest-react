import { auth } from '@ntua-saas-10/web/firebase';
import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

type JwtToken = string | null;

/**
 * @returns [jwtToken] The Firebase JWT token of the user, if any.
 */
export const useJwt = (): [JwtToken] => {
  const [jwtToken, setJwtToken] = useState<JwtToken>(null);
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      user.getIdToken().then((token) => {
        setJwtToken(token);
      });
    } else {
      setJwtToken(null);
    }
  }, [user]);

  return [jwtToken];
};
