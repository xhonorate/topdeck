import RoomLoader from '../components/Game/RoomLoader';
import { AuthCheck, SignInForm } from '../services/Auth';

export default function GamePage() {
  return (
    <AuthCheck fallback={<SignInForm />}>
      <RoomLoader />
    </AuthCheck>
  );
}
