import type { Types } from '@ntua-saas-10/shared-types';
import { auth } from '@ntua-saas-10/web/firebase';
import type { ParsedToken } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

export interface JwtCustomClaims extends ParsedToken {
  customClaims?: Partial<Types.UserCustomClaims>;
}

/**
 * @returns [jwtClaims] The custom claims of the user, if any.
 */
export const useJwtClaims = (): [JwtCustomClaims | null] => {
  const [jwtClaims, setJwtClaims] = useState<JwtCustomClaims | null>(null);
  const [user] = useAuthState(auth);
  useEffect(() => {
    if (user) {
      user.getIdTokenResult().then((tokenResult) => {
        setJwtClaims(tokenResult.claims as JwtCustomClaims);
      });
    } else {
      setJwtClaims(null);
    }
  }, [user]);

  return [jwtClaims];
};
