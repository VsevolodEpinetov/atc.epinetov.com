import { auth, firestore } from '../lib/firebase';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

// Custom hook to read  auth record and user profile doc
export function useUserData() {
  const [user, userLoading] = useAuthState(auth);
  const [userName, setUserName] = useState('---');
  const [userSurname, setUserSurname] = useState('---');
  const [userIsLoading, setUserIsLoading] = useState(false);

  useEffect(() => {
    // turn off realtime subscription
    let unsubscribe;

    setUserIsLoading(userLoading);

    if (user) {
      const ref = firestore.collection('users').doc(user.uid);
      unsubscribe = ref.onSnapshot((doc) => {
        setUserName(doc.data()?.name);
        setUserSurname(doc.data()?.surname);
      });
    } else {
      setUserName('---');
      setUserSurname('---');
    }

    return unsubscribe;
  }, [user]);

  return { user, userName, userSurname, userIsLoading };
}