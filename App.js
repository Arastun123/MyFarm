import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { FontAwesome6, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import MilkScreen from './screens/MilkScreen';
import CowsScreen from './screens/CowsScreen';
import FinanceScreen from './screens/FinanceScreen';
import WarehouseScreen from './screens/WarehouseScreen';
import ManageCow from './components/Cow/ManageCow';
import HomeScreen from './screens/HomeScreen';
import ItemScreen from './screens/ItemScreen';
import LoginScreen from './screens/LoginScreen';
import CategoryCowScreen from './screens/CategoryCowScreen';
import Button from './components/UI/Button';
import PendingOperation from './screens/PendingOperation';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  const navigation = useNavigation();

  async function handleLogout() {
    navigation.replace('Giriş')
    AsyncStorage.setItem('token', null);
    AsyncStorage.setItem('role', null);
  };

  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#eee' },
        headerTintColor: '#333',
        sceneContainerStyle: { backgroundColor: '#eee' },
        drawerContentStyle: { backgroundColor: '#eee' },
        drawerInactiveTintColor: '#333',
        drawerActiveTintColor: '#333',
        drawerActiveBackgroundColor: '#351401',
        drawerActiveBackgroundColor: '#aaa',
      }}
    >
      <Drawer.Screen
        name='Əsas səhifə'
        component={HomeScreen}
        options={{
          title: 'Əsas səhifə',
          drawerIcon: ({ color, size }) => <MaterialCommunityIcons name='home' size={size} color={color} />,
          headerRight: () => (
            <LogoutButton onPress={handleLogout} />
          ),
        }}
      />

      <Drawer.Screen
        name='Heyvanlar'
        component={CowsScreen}
        options={{
          title: 'Heyvanlar',
          drawerIcon: ({ color, size }) => <FontAwesome6 name='cow' size={size} color={color} />
        }}
      />

      <Drawer.Screen
        name='Süd'
        component={MilkScreen}
        options={{
          title: 'Süd',
          drawerIcon: ({ color, size }) => <MaterialCommunityIcons name='water' size={size} color={color} />
        }}
      />

      <Drawer.Screen
        name='Maliyə'
        component={FinanceScreen}
        options={{
          title: 'Maliyə',
          drawerIcon: ({ color, size }) => <MaterialCommunityIcons name='finance' size={size} color={color} />
        }}
      />

      <Drawer.Screen
        name='Anbar'
        component={WarehouseScreen}
        options={{
          title: 'Anbar',
          drawerIcon: ({ color, size }) => <FontAwesome6 name='warehouse' size={size} color={color} />
        }}
      />
      <Drawer.Screen
        name='Gözləmə'
        component={PendingOperation}
        options={{
          title: 'Gözləmə',
          drawerIcon: ({ color, size }) => <MaterialIcons name="pending-actions" size={size} color={color} />

        }}
      />

    </Drawer.Navigator>
  );
}

function LogoutButton({ onPress }) {
  return (
    <Button title="Logout" onPress={onPress} color="none" text={<MaterialCommunityIcons name="logout" size={24} color="#333" />} />
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator
          initialRouteName={isLoggedIn ? 'DrawerStack' : 'Giriş'}
          screenOptions={{
            headerStyle: { backgroundColor: '#eee' },
            headerTintColor: '#333',
            contentStyle: { backgroundColor: '#eee' },
          }}
        >
          <Stack.Screen
            name='Giriş'
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='DrawerStack'
            component={DrawerNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Redaktə'
            component={ManageCow}
          />
          <Stack.Screen
            name='Item'
            component={ItemScreen}
            options={({ route }) => ({ title: route.params?.name || 'Default Title' })}
          />
          <Stack.Screen
            name='Heyvan'
            component={CategoryCowScreen}
            options={({ route }) => ({ title: route.params?.name || 'Default Title' })}
          />
          <Stack.Screen
            name='Gözləmə'
            component={PendingOperation}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
