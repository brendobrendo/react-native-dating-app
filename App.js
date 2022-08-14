import { StyleSheet, View, Text } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NotificationScreen from './screens/NotificationScreen';
import MessageScreen from './screens/MessageScreen';
import MatchProfile from './screens/MatchProfile';
import { useState } from 'react';

const Stack = createNativeStackNavigator();

export default function App() {

  const [currentPage, setCurrentPage] = useState("")

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name='Login' component={LoginScreen} />
        <Stack.Screen options={{ headerShown: false }} name='Home' component={HomeScreen} currentPage={setCurrentPage} />
        <Stack.Screen options={{ headerShown: false }} name='Notifications' component={NotificationScreen} currentPage={setCurrentPage} />
        <Stack.Screen options={{ headerShown: false }} name='Messages' component={MessageScreen} currentPage={setCurrentPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
