import { auth } from '@ntua-saas-10/web/firebase';
import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import type { ParsedToken } from 'firebase/auth';
import type { Types } from '@ntua-saas-10/shared-types';

export interface JwtCustomClaims extends ParsedToken {
  customClaims: Types.UserCustomClaims;
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
