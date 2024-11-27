import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScreenStack } from 'react-native-screens';

import { useColorScheme } from '@/components/useColorScheme';
import OnboardingScreen from '@/components/OnboardingScreen';
import HomeScreen from '@/components/HomeScreen';
import index from '.././app/(tabs)'
import modal from './modal'
import { getItem } from '@/utils/asyncStorage';

import { createStackNavigator } from '@react-navigation/stack';

// Define the types for the screens in your navigator
export type RootParamList = {
  Home: undefined;
  Onboarding: undefined; // Or specify any params if needed
};

const Stack = createStackNavigator<RootParamList>();

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  const Stack = createNativeStackNavigator();
  //added boolean to make sure the state true and false can be accessed later in the code
  const [showOnboarding, setShowOnBoarding] = useState<null | boolean>(null);
  useEffect(() => {
    checkIfAlreadyOnboarded();
  }, [])

  const checkIfAlreadyOnboarded = async () => {
    let onboarded = await getItem('onboarded');
    //used Number(onboarded) === 1 for typescriupt to understand it is not string
    if (Number(onboarded) === 1) {
      //hide something
      setShowOnBoarding(false);
    } else {
      //show something
      setShowOnBoarding(true);
    }
  }

  if (showOnboarding == null) {
    return null;
  }


  if (showOnboarding) {
    return (
      <NavigationContainer independent={true}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack.Navigator initialRouteName='Onboarding'>
            <Stack.Screen name="(tabs)" component={index} options={{ headerShown: false }} />
            <Stack.Screen name="modal" component={modal} options={{ presentation: 'modal' }} />
            <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={HomeScreen} />
            {/* <Stack.Screen name="modal" component={modal} options={{ presentation: 'modal' }} /> */}
          </Stack.Navigator>
        </ThemeProvider>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer independent={true}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen name="(tabs)" component={index} options={{ headerShown: false }} />
            <Stack.Screen name="modal" component={modal} options={{ presentation: 'modal' }} />
            <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={HomeScreen} />
            {/* <Stack.Screen name="modal" component={modal} options={{ presentation: 'modal' }} /> */}
          </Stack.Navigator>
        </ThemeProvider>
      </NavigationContainer>
    );
  }

}
