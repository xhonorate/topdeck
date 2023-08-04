import { DocumentData, doc } from 'firebase/firestore';
import React from 'react';
import { useFirestoreDocData, useFirestore, useUser } from 'reactfire';

import Game from './Game';

// Check if user is logged in and has a UID
export default function RoomLoader() {
  const { status, data: user } = useUser();
  // easily check the loading status
  if (status === 'loading') {
    return <p>Loading...</p>;
  }
  if (status === 'error') {
    return <p>Error Loading Room!?</p>;
  }
  if (!user?.uid) {
    return <p>User UID not set?</p>;
  }

  return <UserLoader uid={user.uid} />;
}

// Checks if user is in an active game, and if so, loads that game
const UserLoader = ({ uid }: { uid: string }) => {
  const userRef = doc(useFirestore(), 'users', uid);

  const { status, data: userData } = useFirestoreDocData<DocumentData>(userRef);
  if (status === 'loading') {
    return <p>Loading...</p>;
  }
  if (status === 'error') {
    return <p>Error Loading Room!?</p>;
  }
  if (!userData?.activeGameId) {
    return <p>User not in a game?</p>;
  }

  return <Game gameId={userData.activeGameId} userId={uid} />;
};
