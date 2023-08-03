import { Auth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import * as React from 'react';
import { useAuth, useSigninCheck } from 'reactfire';

import { WideButton } from './display/Button';
import { CardSection } from './display/Card';
import { LoadingSpinner } from './display/LoadingSpinner';

const signOut = (auth: Auth) =>
  auth.signOut().then(() => console.log('signed out'));
const signIn = async (auth: Auth) => {
  const provider = new GoogleAuthProvider();

  await signInWithPopup(auth, provider);
};

// is user is logged in, render normally, otherwise render fallback
export const AuthCheck = ({
  children,
  fallback,
}: React.PropsWithChildren<{ fallback: JSX.Element }>): JSX.Element => {
  const { status, data: signInCheckResult } = useSigninCheck();

  if (!children) {
    throw new Error('Children must be provided');
  }
  if (status === 'loading') {
    return <LoadingSpinner />;
  } else if (signInCheckResult.signedIn === true) {
    return children as JSX.Element;
  }

  return fallback;
};

export const UserDetails = ({ user }: { user: any }) => {
  const auth = useAuth();

  return (
    <>
      <CardSection title="Displayname">{user.displayName}</CardSection>
      <CardSection title="Providers">
        <ul>
          {user.providerData?.map((profile: any) => (
            <li key={profile?.providerId}>{profile?.providerId}</li>
          ))}
        </ul>
      </CardSection>
      <CardSection title="Sign Out">
        <WideButton label="Sign Out" onClick={() => signOut(auth)} />
      </CardSection>
    </>
  );
};

export const SignInForm = () => {
  const auth = useAuth();

  return (
    <CardSection title="Sign-in form">
      <WideButton label="Sign in with Google" onClick={() => signIn(auth)} />
    </CardSection>
  );
};
