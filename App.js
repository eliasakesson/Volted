import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from './Screens/HomeScreen';
import SplashScreen from './Screens/SplashScreen';
import SandboxScreen from './Screens/SandboxScreen';
import { StatusBar } from 'expo-status-bar';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer> 
      <StatusBar style="dark" /> 
      <Stack.Navigator>
        <Stack.Screen name="Splash" component={SplashScreen} options={{animationEnabled: false, headerShown: false}} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Sandbox" component={SandboxScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
