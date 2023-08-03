import { DocumentData, collection, doc } from 'firebase/firestore';
import React from 'react';
import { Box, Text } from 'react-native-magnus';
import {
  useFirestoreDocData,
  useFirestore,
  useFirestoreCollectionData,
} from 'reactfire';

interface GameProps {
  roomId: string;
  isHost?: boolean;
}

interface RoomData {
  NO_ID_FIELD: string; // Room id
  active: boolean;
  seed: string;
  currentRound: number;
}

interface PlayerData {
  NO_ID_FIELD: string; // Player uuid
  isHost: boolean;
  name?: string;
  hp?: number;
  masterDeck?: any[];
  currentBattle?: string;
}

export default function Game({ roomId, isHost = false }: GameProps) {
  // easily access the Firestore library
  const gameRef = doc(useFirestore(), 'game', roomId);

  const players = collection(gameRef, 'players');

  // subscribe to a document for realtime updates. just one line!
  //@ts-ignore
  const { status, data: roomData } = useFirestoreDocData<RoomData>(gameRef);

  const { status: status2, data: playerData } =
    //@ts-ignore
    useFirestoreCollectionData<PlayerData[]>(players);

  // easily check the loading status
  if (status === 'loading' || status2 === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'error' || status2 === 'error') {
    return <p>Error Loading Room!?</p>;
  }

  return (
    <Box w="100%" h="100%" bg="blue100">
      <Text p={10} fontSize={32} color="black">
        Game Room: {roomId}
      </Text>

      <Text p={10} fontSize={32} color="black">
        {JSON.stringify(roomData)}
        {JSON.stringify(playerData)}
      </Text>
    </Box>
  );
}
