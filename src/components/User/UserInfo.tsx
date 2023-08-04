import { signOut } from 'firebase/auth';
import { DocumentData, doc } from 'firebase/firestore';
import React from 'react';
import { Box, Button, Text } from 'react-native-magnus';
import { useAuth, useFirestore, useFirestoreDocData, useUser } from 'reactfire';

export default function UserInfo() {
  const { data: user } = useUser();

  if (!user?.uid) {
    return <p>User UID not set?</p>;
  }
  return <UserDetails uid={user.uid} />;
}

const UserDetails = ({ uid }: { uid: string }) => {
  const auth = useAuth();
  const userRef = doc(useFirestore(), 'users', uid);

  const { status, data: userData } = useFirestoreDocData<DocumentData>(userRef);
  if (status === 'loading') {
    return <p>Loading...</p>;
  }
  if (status === 'error') {
    return <p>Error Loading Room!?</p>;
  }
  return (
    <Box>
      <Text>Name: {userData?.name}</Text>
      <Text>Active Game: {userData?.activeGameId}</Text>
      <Button onPress={() => signOut(auth)}>Sign Out</Button>
    </Box>
  );
};
