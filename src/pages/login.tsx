import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  signInAnonymously,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Box, Button, Text } from 'react-native-magnus';
import { useAuth, useFirestore } from 'reactfire';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const auth = useAuth();
  const firestore = useFirestore();

  // Check if user is in Firestore database
  const handleSignIn = async (user: any) => {
    const docSnap = await getDoc(doc(firestore, 'users', user.uid));
    if (docSnap.exists()) {
      console.log('User exists in database');
    } else {
      console.log('User does not exist in database');
      await setDoc(doc(firestore, 'users', user.uid), {
        name: user?.name ?? 'Guest',
        activeGameId: null,
      });
    }
    setLoading(false);
    router.push('/');
  };

  const authGoogle = async (auth: Auth) => {
    setLoading(true);
    const provider = new GoogleAuthProvider();

    await signInWithPopup(auth, provider).then(result => {
      handleSignIn(result.user);
    });
  };

  const authAnon = async (auth: Auth) => {
    setLoading(true);
    await signInAnonymously(auth).then(result => {
      handleSignIn(result.user);
    });
  };

  return (
    <>
      <Box p={10}>
        <Button loading={loading} mb={10} onPress={() => authGoogle(auth)}>
          Sign in with Google
        </Button>

        <Button loading={loading} onPress={() => authAnon(auth)}>
          Sign in as Guest
        </Button>
      </Box>
    </>
  );
}
