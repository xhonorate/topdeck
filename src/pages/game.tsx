import Game from '../components/Game/Game';
import { AuthCheck, SignInForm } from '../services/Auth';

export default function GamePage() {
  return (
    <AuthCheck fallback={<SignInForm />}>
      <Game roomId="test" />
    </AuthCheck>
  );
}
