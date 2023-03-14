
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import { ScreenStackHeaderCenterView } from 'react-native-screens';
import { Provider, useSelector } from 'react-redux';
import store from './src/app/store';
import Bottomnavbar from './src/bottom-navbar/BottomBar';
import Camerafn from './src/camera/camera';
import Home from './src/Home';
import PreviewPhoto from './src/preview-photo/PreviewPhoto';


const Stack = createNativeStackNavigator();

export default function App() {
 
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ title: 'PHOTO JOURNAL', headerStyle: { backgroundColor: '#2196F3', }, headerTitleStyle: { color: 'white' }, headerTitleAlign: 'center' }} />
        <Stack.Screen
          name="Camera"
          component={Camerafn}
          options={{
            title: 'CAMERA',
            headerStyle: {
              backgroundColor: '#2196F3',

            },
            headerTitleStyle: {
              color: 'white'
            },
            headerTitleAlign: 'center'
          }}

        />
        <Stack.Screen
          name="PreviewPhoto"
          component={PreviewPhoto}
          options={{
            title: 'PREVIEW PHOTO',
            headerStyle: {
              backgroundColor: '#2196F3',

            },
            headerTitleStyle: {
              color: 'white'
            },
            headerTitleAlign: 'center'
          }}

        />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
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
