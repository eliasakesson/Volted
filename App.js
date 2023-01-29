import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from './Screens/HomeScreen';
import SplashScreen from './Screens/SplashScreen';
import SandboxScreen from './Screens/SandboxScreen';
import { StatusBar } from 'expo-status-bar';

import { AntDesign } from '@expo/vector-icons';
import TutorialsScreen from './Screens/TutorialsScreen';
import { colors } from './colors';

const Stack = createNativeStackNavigator();
const HomeTab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <HomeTab.Navigator screenOptions={({ route }) => ({tabBarShowLabel: false, headerShown: false, tabBarIcon: ({focused, color, size}) => {
      let iconName;
      if (route.name === 'Home') {
        iconName = 'home';
      } else if (route.name === 'Tutorials') {
        iconName = 'book';
      } else if (route.name === 'Profile') {
        iconName = 'user';
      }

      
      return <AntDesign name={iconName} size={24} color={focused ? colors.primary : colors.text} />
    }})}>
      <HomeTab.Screen name="Home" component={HomeScreen} />
      <HomeTab.Screen name="Tutorials" component={TutorialsScreen} />
      <HomeTab.Screen name="Profile" component={TutorialsScreen} />
    </HomeTab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer theme={{colors: {background: colors.bg}}}> 
      <StatusBar style="dark" /> 
      <Stack.Navigator screenOptions={{headerTintColor: colors.header, headerBackTitleVisible: false, headerLeftContainerStyle: {paddingLeft: 10}}}>
        <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown: false, animation: "fade"}} />
        <Stack.Screen name="HomeTab" component={HomeTabs} options={{headerShown: false, animation: "fade_from_bottom"}} />
        <Stack.Screen name="Sandbox" component={SandboxScreen} options={{title: "Sandlådsläge", gestureEnabled: false, orientation: "all"}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
