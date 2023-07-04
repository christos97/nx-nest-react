import { useAuthState } from 'react-firebase-hooks/auth';
import { Types } from '@ntua-saas-10/shared-types';
import { auth, firestore } from '@ntua-saas-10/web/firebase';
import { useEffect, useState } from 'react';
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Unsubscribe,
  where,
} from 'firebase/firestore';

export const useNotify = (): Types.UserNotification[] | null => {
  const [notifications, setNotifications] = useState<Types.UserNotification[] | null>(null);
  const [user, authLoading, authError] = useAuthState(auth);

  useEffect(() => {
    let unsubscribe: Unsubscribe;

    if (user) {
      const notificationsQuery = query(
        collection(firestore, 'users', user.uid, 'notifications'),
        where('delivered', '==', false),
        orderBy('createdAt', 'desc'),
      );

      unsubscribe = onSnapshot(notificationsQuery, (snapshot) => {
        const newNotifications = snapshot.docs.map((doc) => {
          const data = doc.data() as Types.UserNotification;
          const id = doc.id;
          return { id, ...data };
        });

        setNotifications(newNotifications);

        newNotifications.forEach((notification) => {
          const docRef = doc(firestore, `users/${user.uid}/notifications`, notification.id);
          setDoc(docRef, { delivered: true }, { merge: true });
        });
      });
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user]);

  return notifications;
};
