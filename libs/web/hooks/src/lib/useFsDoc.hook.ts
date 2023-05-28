import { firestore } from '@ntua-saas-10/web/firebase';
import { type FirestoreError, doc } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';

/**
 * @param path Full actual path to the document,
 * @example 'users/:uid'
 * @returns  [docData, loading, error]
 */
export const useFsDoc = <T = unknown>(
  path: string,
): [T | undefined, boolean, FirestoreError | undefined] => {
  const [data, loading, error] = useDocument(doc(firestore, path));
  const docData = data?.data() as T | undefined;
  return [docData, loading, error];
};
