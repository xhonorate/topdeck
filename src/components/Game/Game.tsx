import { DocumentData, collection, doc } from 'firebase/firestore';
import React from 'react';
import { Box, Text } from 'react-native-magnus';
import {
  useFirestoreDocData,
  useFirestore,
  useFirestoreCollectionData,
} from 'reactfire';

interface GameProps {
  gameId: string;
  userId: string;
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

export default function Game({ gameId, userId }: GameProps) {
  // easily access the Firestore library
  const gameRef = doc(useFirestore(), 'game', gameId);

  const players = collection(gameRef, 'players');

  // subscribe to a document for realtime updates. just one line!
  //@ts-ignore
  const { status, data: roomData } = useFirestoreDocData<RoomData>(gameRef);

  const { status: status2, data: playerData } =
    //@ts-ignore
    useFirestoreCollectionData<PlayerData>(players);

  // easily check the loading status
  if (status === 'loading' || status2 === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'error' || status2 === 'error') {
    return <p>Error Loading Room!?</p>;
  }

  const myPlayer = playerData.find(player => player.NO_ID_FIELD === userId);
  const isHost = myPlayer?.isHost;

  //TODO: add <HostProvider> provider with some kind of hooks, that only have an effect if isHost is true

  return (
    <Box w="100%" h="100%" bg="blue100">
      <Text p={10} fontSize={32} color="black">
        Game ID: {gameId}
      </Text>

      <Text p={10} fontSize={32} color="black">
        {JSON.stringify(roomData)}
        {JSON.stringify(playerData)}
        {JSON.stringify(myPlayer)}
      </Text>
    </Box>
  );
}
