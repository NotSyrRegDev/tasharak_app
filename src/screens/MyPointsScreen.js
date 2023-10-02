import { View , SafeAreaView , StyleSheet , StatusBar    , ScrollView  , Image , Text} from 'react-native'
import React from 'react'
import {  } from 'react-native';
import { FONTFAMILY , COLORS } from '../theme/theme';
import TopProfileNavigator from '../components/TopProfileNavigator';



const MyPointsScreen = ({ navigation }) => {


  return (
    <SafeAreaView style={styles.container} >
      
      <ScrollView>
      <View   >

      <StatusBar translucent backgroundColor="black" />

      <View className="flex-col items-center justify-center h-96 "   >
      <Image source={require('../assets/icons/clock_icon.png')} />

      <Text className="text-center text-2xl " style={styles.font} >  هذه الميزة سوف تتوفر قريبا.   </Text>
      <Text className="text-center text-2xl mt-2" style={styles.font} >  كونوا بالقرب  </Text>
      
      </View>

      </View>

      </ScrollView>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({ 

  container: {
    backgroundColor: COLORS.White,
    minHeight: '100%',
    direction: 'rtl',
    felx:1,
    borderRadius: 50,
    paddingHorizontal: 20,
  },
  font: {
    fontFamily: FONTFAMILY.font_regular,
  }
  
 

} );

export default MyPointsScreen