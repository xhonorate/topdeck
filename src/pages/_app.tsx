import 'setimmediate';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import NextApp from 'next/app';
import React, { Suspense } from 'react';
import { ThemeProvider } from 'react-native-magnus';
import {
  AuthProvider,
  FirebaseAppProvider,
  FirestoreProvider,
  useFirebaseApp,
} from 'reactfire';

const firebaseConfig = {
  apiKey: 'AIzaSyBBE4oezMDApdWi9Go1nWDIiBlNIuTOeT8',
  authDomain: 'topdeck-firebase.firebaseapp.com',
  databaseURL: 'https://topdeck-firebase-default-rtdb.firebaseio.com',
  projectId: 'topdeck-firebase',
  storageBucket: 'topdeck-firebase.appspot.com',
  messagingSenderId: '23104403186',
  appId: '1:23104403186:web:678635c74352122cf4026b',
};

export default function App(props: any): JSX.Element {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <FireWrapper>
        <ThemeProvider>
          <NextApp {...props} />
        </ThemeProvider>
      </FireWrapper>
    </FirebaseAppProvider>
  );
}

const FireWrapper = ({ children }: React.PropsWithChildren) => {
  const app = useFirebaseApp(); // a parent component contains a `FirebaseAppProvider`
  const auth = getAuth(app);
  const fire = getFirestore(app);

  return (
    <AuthProvider sdk={auth}>
      <FirestoreProvider sdk={fire}>
        <Suspense>{children}</Suspense>
      </FirestoreProvider>
    </AuthProvider>
  );
};
