import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CreateRequestScreen from './src/screens/CreateRequestScreen'

export default function App() {

  console.log('App component is running')
  return (
    <CreateRequestScreen />
    
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 50,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  text: {
    fontSize: 16,
    color: '#333',
    margin: 10,
  },
})
