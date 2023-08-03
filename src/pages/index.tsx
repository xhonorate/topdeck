import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Icon } from 'react-native-magnus';

import Greetings from '../components/Greeting';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
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
  );
}
