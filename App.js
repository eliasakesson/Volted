import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import {HeaderBackButton} from '@react-navigation/elements';

import HomeScreen from './Screens/HomeScreen';
import SplashScreen from './Screens/SplashScreen';
import SandboxScreen from './Screens/SandboxScreen';
import TutorialsScreen from './Screens/TutorialsScreen';
import TutorialScreen from './Screens/TutorialScreen';
import SuccessScreen from './Screens/SuccessScreen';
import ProfileScreen from './Screens/ProfileScreen';

import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';
import { colors } from './colors';
import ProjectsScreen from './Screens/ProjectsScreen';
import { View } from 'react-native';
import DailyReward from './components/DailyReward';

const Stack = createNativeStackNavigator();
const HomeTab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <View style={{flex: 1}}>
      <DailyReward />
      <HomeTab.Navigator screenOptions={({ route }) => ({
        headerShown: false, 
        tabBarActiveTintColor: colors.primary,
        tabBarIcon: ({focused}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Tutorials') {
            iconName = 'book';
          } else if (route.name === "Projects") {
            iconName = 'folder1';
          } else if (route.name === "Profile") {
            iconName = 'user';
          }
          
          return <AntDesign name={iconName} size={24} color={focused ? colors.primary : colors.text} />
        }
      })}>
        <HomeTab.Screen name="Home" component={HomeScreen} options={{tabBarLabel: "Hem"}} />
        <HomeTab.Screen name="Tutorials" component={TutorialsScreen} options={{tabBarLabel: "Lektioner"}} />
        <HomeTab.Screen name="Projects" component={ProjectsScreen} options={{tabBarLabel: "Uppgifter"}} />
        <HomeTab.Screen name="Profile" component={ProfileScreen} options={{tabBarLabel: "Profil"}} />
      </HomeTab.Navigator>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer theme={{colors: {background: colors.bg}}}> 
      <StatusBar style="dark" /> 
      <Stack.Navigator screenOptions={{headerTintColor: colors.header, headerBackTitleVisible: false}}>
        <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown: false, animation: "fade"}} />
        <Stack.Screen name="HomeTab" component={HomeTabs} options={{headerShown: false, animation: "fade_from_bottom"}} />
        <Stack.Screen name="Sandbox" component={SandboxScreen} options={{title: "Sandlådsläge", gestureEnabled: false}} />
        <Stack.Screen name="Tutorial" component={TutorialScreen} options={{title: "Lektion"}} />
        <Stack.Screen name="Success" component={SuccessScreen} options={{title: "Grattis!", gestureEnabled: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
