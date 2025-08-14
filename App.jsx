// import './global.css';
// import { Text, View, TouchableOpacity, StatusBar } from 'react-native';
// import React, { useState } from 'react';
// import Dashboard from "./components/dashboard";
// import { SafeAreaView } from "react-native-safe-area-context";

// const HomeScreen = ({ onNavigateToDashboard }) => (
//   <SafeAreaView className="flex-1 bg-blue-50">
//     <StatusBar barStyle="dark-content" backgroundColor="#eff6ff" />
//     <View className="flex-1 justify-center items-center px-6">
//       {/* Hero Section */}
//       <View className="items-center mb-12">
//         <View className="w-24 h-24 bg-blue-600 rounded-full items-center justify-center mb-6 shadow-lg">
//           <Text className="text-4xl text-white font-bold">M</Text>
//         </View>
//         <Text className="text-4xl font-bold text-gray-900 text-center mb-4">
//           MeetsApp
//         </Text>
//         <Text className="text-lg text-gray-600 text-center leading-relaxed max-w-sm">
//           Discover and manage events from institutions around you
//         </Text>
//       </View>

//       {/* Action Button */}
//       <TouchableOpacity 
//         className="bg-blue-600 px-8 py-4 rounded-2xl shadow-lg active:scale-95 w-full max-w-sm"
//         onPress={onNavigateToDashboard}
//       >
//         <Text className="text-white text-lg font-semibold text-center">
//           View Institutions
//         </Text>
//       </TouchableOpacity>

//       {/* Footer */}
//       <View className="absolute bottom-8 items-center">
//         <Text className="text-gray-500 text-sm">
//           Powered by React Native
//         </Text>
//       </View>
//     </View>
//   </SafeAreaView>
// );

// export default function App() {
//   const [currentScreen, setCurrentScreen] = useState('home'); // 'home' or 'dashboard'

//   if (currentScreen === 'home') {
//     return <HomeScreen onNavigateToDashboard={() => setCurrentScreen('dashboard')} />;
//   }

//   return (
//     <SafeAreaView className="flex-1 bg-gray-50">
//       <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />
//       <Dashboard onBackToHome={() => setCurrentScreen('home')} />
//     </SafeAreaView>
//   );
// }

// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { SafeAreaProvider } from 'react-native-safe-area-context';

// import CreateRequestScreen from './src/screens/CreateRequestScreen'; // adjust path if needed

// // const Stack = createNativeStackNavigator();

// const App = () => {
//   return (
//     <SafeAreaProvider>
//       <CreateRequestScreen/>
//     </SafeAreaProvider>
//   );
// };

// export default App;


import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, useColorScheme, View, Text } from 'react-native';
// import LoginPage from './screens/Login'
import RegisterPage from './src/screens/registrationScreens/SmeRegister.jsx'
import AdminRegisterPage from './src/screens/registrationScreens/AdminRegistration.jsx'
import initialHome from './src/screens/registrationScreens/home.jsx'
import { create } from 'react-native/types_generated/Libraries/ReactNative/ReactFabricPublicInstance/ReactNativeAttributePayload';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
// import HomeScreen from './screens/home';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const Stack = createNativeStackNavigator()
  return (
   <NavigationContainer>
    <Stack.Navigator initialRouteName='home'  screenOptions={{
      headerShown:false
    }}>
      <Stack.Screen name='home' component={initialHome}/>
      {/* <Stack.Screen name='Login' component={LoginPage}/> */}
      <Stack.Screen name='smeRegister' component={RegisterPage}/>
      <Stack.Screen name='adminRegister' component={AdminRegisterPage}/>
    </Stack.Navigator>

   </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
