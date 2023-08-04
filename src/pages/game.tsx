import RoomLoader from '../components/Game/RoomLoader';
import { AuthCheck } from '../services/Auth';

export default function GamePage() {
  return (
    <AuthCheck>
      <RoomLoader />
    </AuthCheck>
  );
}
