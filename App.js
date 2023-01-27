import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from './Screens/HomeScreen';
import SplashScreen from './Screens/SplashScreen';
import SandboxScreen from './Screens/SandboxScreen';
import { StatusBar } from 'expo-status-bar';

import { AntDesign } from '@expo/vector-icons';
import TutorialsScreen from './Screens/TutorialsScreen';
import { TouchableOpacity } from 'react-native';

const Stack = createStackNavigator();
const HomeTab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <HomeTab.Navigator screenOptions={({ route }) => ({tabBarShowLabel: false, headerShown: false, tabBarIcon: ({focused, color, size}) => {
      let iconName;
      if (route.name === 'Home') {
        iconName = 'home';
      } else if (route.name === 'Tutorials') {
        iconName = 'book';
      } else if (route.name === 'User') {
        iconName = 'user';
      }

      
      return <AntDesign name={iconName} size={24} color={focused ? "#6495ED" : "white"} />
    }})}>
      <HomeTab.Screen name="Home" component={HomeScreen} />
      <HomeTab.Screen name="Tutorials" component={TutorialsScreen} />
      <HomeTab.Screen name="User" component={TutorialsScreen} />
    </HomeTab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer theme={{colors: {background: "#313642"}}}> 
      <StatusBar style="light" /> 
      <Stack.Navigator screenOptions={{headerTintColor: "white", headerBackTitleVisible: false, headerLeftContainerStyle: {paddingLeft: 10}}}>
        <Stack.Screen name="Splash" component={SplashScreen} options={{animationEnabled: false, headerShown: false}} />
        <Stack.Screen name="HomeTab" component={HomeTabs} options={{headerShown: false, animation: "none"}} />
        <Stack.Screen name="Sandbox" component={SandboxScreen} options={{title: "Sandlådsläge", gestureEnabled: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
