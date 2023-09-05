import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import AntDesignIcons from 'react-native-vector-icons/AntDesign';

const TopStepNavigation = ({ navigation }) => {
  return (
    <View className="flex flex-row items-center justify-between" >
    <TouchableOpacity onPress={() => navigation.goBack() } >
      <AntDesignIcons name="arrowright" size={25} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('HomeScreen') }  >
      <AntDesignIcons name="close" size={25} color="#fff" />
      </TouchableOpacity>      
    </View>
  )
}

export default TopStepNavigation