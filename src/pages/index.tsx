import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { getFirestore } from 'firebase/firestore'
import { Suspense } from 'react'
import { Icon } from 'react-native-magnus'
import { FirestoreProvider, useFirebaseApp } from 'reactfire'

import Greetings from '../components/Greeting'

const Tab = createBottomTabNavigator()

export default function App() {
  const firestoreInstance = getFirestore(useFirebaseApp())

  return (
    <FirestoreProvider sdk={firestoreInstance}>
      <Suspense>
        {/* if you want nice React 18 concurrent hydration, you'll want Suspense near the root */}
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen
              name="Home"
              component={Greetings}
              options={{
                tabBarBadge: 3,
                tabBarIcon: () => (
                  <Icon
                    name="home-account"
                    fontFamily="MaterialCommunityIcons"
                    fontSize={32}
                  />
                ),
              }}
            />
            <Tab.Screen name="Settings" component={() => null} />
          </Tab.Navigator>
        </NavigationContainer>
      </Suspense>
    </FirestoreProvider>
  )
}
