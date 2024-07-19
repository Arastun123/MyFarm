import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';

import MilkScreen from './screens/MilkScreen';
import CowsScreen from './screens/CowsScreen';
import FinanceScreen from './screens/FinanceScreen';
import WarehouseScreen from './screens/WarehouseScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return <Drawer.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: '#eee' },
      headerTintColor: '#333',
      sceneContainerStyle: { backgroundColor: '#eee' },
      drawerContentStyle: { backgroundColor: '#eee' },
      drawerInactiveTintColor: '#333',
      drawerActiveTintColor: '#333',
      drawerActiveBackgroundColor: '#351401',
      drawerActiveBackgroundColor: '#aaa'
    }}
  >
    <Drawer.Screen
      name='İnəklər'
      component={CowsScreen}
      options={{
        title: 'İnəklər',
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
  </Drawer.Navigator>
}

export default function App() {
  return (
    < >
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: { backgroundColor: '#eee' },
          headerTintColor: '#fff',
          contentStyle: { backgroundColor: '#eee' }
        }}>
          <Stack.Screen
            name='Drawer'
            component={DrawerNavigator}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='İnəklər'
            component={CowsScreen}
          />
          <Stack.Screen
            name='Süd'
            component={MilkScreen}
          />
          <Stack.Screen
            name='Maliyə'
            component={FinanceScreen}
          />
          <Stack.Screen
            name='Anbar'
            component={WarehouseScreen}
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
