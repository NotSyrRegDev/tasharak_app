import { View, ActivityIndicator , StyleSheet } from 'react-native'
import React from 'react'

const LoadingContainer = () => {
  return (
    <View style={styles.loadingContainer}>
    <ActivityIndicator size={50} animating={true} color={'#007FB7'} style={styles.loading} />
    </View>
  )
}


const styles = StyleSheet.create({ 

    loading: {
      marginLeft: -25,
    },
    loadingContainer: {
      position: 'absolute',
      top: '50%',
      left: '50%',
    },
    
  
  } );

export default LoadingContainer