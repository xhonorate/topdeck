import { useRouter } from 'next/router';
import * as React from 'react';
import { Text } from 'react-native-magnus';
import { useSigninCheck } from 'reactfire';

// is user is logged in, render normally, otherwise render fallback
export const AuthCheck = ({
  children,
}: React.PropsWithChildren): JSX.Element => {
  const router = useRouter();
  const { status, data: signInCheckResult } = useSigninCheck();

  if (!children) {
    throw new Error('Children must be provided');
  }
  if (status === 'loading') {
    return <Text>Loading...</Text>;
  } else if (signInCheckResult.signedIn === true) {
    return children as JSX.Element;
  }

  router.push('/login');
  return <></>;
};
