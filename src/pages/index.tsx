import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Suspense } from 'react';
import { Icon } from 'react-native-magnus';

import Greetings from '../components/Greeting';
import UserInfo from '../components/User/UserInfo';
import { AuthCheck } from '../services/Auth';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <AuthCheck>
      <NavigationContainer>
        <Suspense>
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
            <Tab.Screen name="User" component={UserInfo} />
          </Tab.Navigator>
        </Suspense>
      </NavigationContainer>
    </AuthCheck>
  );
}
