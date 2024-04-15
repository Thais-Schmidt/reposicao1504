import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// importando telas
import Home from './src/pages/Home';
import Cadastro from './src/pages/Cadastro';
import Exibir from './src/pages/Exibir';
import Editar from './src/pages/Editar';
import Pesquisar from './src/pages/Pesquisar'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>

          <Stack.Screen
            name='Home'
            component={Home}
          />

          <Stack.Screen
            name='Cadastro'
            component={Cadastro}
            options={{
              title: 'Cadastrar novo produto'
            }}
          />

          <Stack.Screen
            name='Exibir'
            component={Exibir}
            options={{
              title: 'Modelos disponiveis'
            }}
          />

          <Stack.Screen
            name='Editar'
            component={Editar}
            options={{
              title: 'Editar registro existente'
            }}
          />

          <Stack.Screen
            name='Pesquisar'
            component={Pesquisar}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
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
