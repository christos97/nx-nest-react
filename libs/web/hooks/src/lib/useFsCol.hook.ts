import { firestore } from '@ntua-saas-10/web/firebase';
import { type FirestoreError, collection } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

/**
 * @param path Full actual path to the collection
 * @example 'users'
 * @returns  [collectionData, loading, error]
 */
export const useFsCol = <T = unknown>(
  path: string,
): [T[] | undefined, boolean, FirestoreError | undefined] => {
  const [data, loading, error] = useCollection(collection(firestore, path));

  const collectionData = data?.docs?.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as T[] | undefined;

  return [collectionData, loading, error];
};
