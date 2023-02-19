import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from './Screens/HomeScreen';
import SplashScreen from './Screens/SplashScreen';
import SandboxScreen from './Screens/SandboxScreen';
import TutorialsScreen from './Screens/TutorialsScreen';
import AwardsScreen from './Screens/AwardsScreen';
import TutorialScreen from './Screens/TutorialScreen';
import SuccessScreen from './Screens/SuccessScreen';

import { StatusBar } from 'expo-status-bar';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { colors } from './colors';
import ProjectsScreen from './Screens/ProjectsScreen';
import Test from './Test';

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
      } else if (route.name === "Projects") {
        iconName = 'folder1';
      } else if (route.name === 'Awards') {
        return <Ionicons name="md-medal-outline" size={24} color={focused ? colors.primary : colors.text} />
      }

      
      return <AntDesign name={iconName} size={24} color={focused ? colors.primary : colors.text} />
    }})}>
      <HomeTab.Screen name="Home" component={HomeScreen} />
      <HomeTab.Screen name="Tutorials" component={TutorialsScreen} />
      <HomeTab.Screen name="Projects" component={ProjectsScreen} />
      <HomeTab.Screen name="Awards" component={AwardsScreen} />
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
        <Stack.Screen name="Sandbox" component={SandboxScreen} options={{title: "Sandlådsläge", gestureEnabled: false}} />
        <Stack.Screen name="Tutorial" component={TutorialScreen} options={{title: "Lektion"}} />
        <Stack.Screen name="Success" component={SuccessScreen} options={{title: "Grattis!", gestureEnabled: false}} />
        <Stack.Screen name="Test" component={Test} options={{title: "Test", gestureEnabled: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
