import { firestore } from '@ntua-saas-10/web/firebase';
import { doc } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';

/**
 *
 * @param path Full actual path to the document, e.g. 'users/1234' or 'users/1234/posts/5678'
 * @returns  [docData, loading, error]
 */
export const useFsDoc = <T = unknown>(
  path: string
): [T | undefined, boolean, Error | undefined] => {
  const [data, loading, error] = useDocument(doc(firestore, path));

  const docData = data?.data() as T | undefined;

  return [docData, loading, error];
};
