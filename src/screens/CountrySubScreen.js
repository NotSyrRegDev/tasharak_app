import { View , SafeAreaView , StyleSheet , StatusBar    , ScrollView  , Image , Text ,TouchableOpacity } from 'react-native'
import React from 'react'
import { FONTFAMILY , COLORS } from '../theme/theme';
import TopProfileNavigator from '../components/TopProfileNavigator';
import Ionicons from '@expo/vector-icons/Ionicons';

const CountrySubScreen = ({ navigation }) => {


  return (
    <SafeAreaView style={styles.container} >
      
      <ScrollView>


      <View   >

      <StatusBar translucent backgroundColor="black" />
      { /* TOP HEADER TEXT */ }
    <TopProfileNavigator navigation={navigation} text={"المدينة"} />

      { /* END TOP HEADER TEXT */ }

      <View className="flex items-start mt-16" style={styles.topAreaHeadins}   >

        <Text className="text-xl" style={styles.font} > حدد المدينة </Text>

        <TouchableOpacity  className="bg-white mt-8 px-4 py-6 flex flex-row justify-between items-center w-full rounded-xl" style={styles.box} >
        <View className="flex flex-row" >
        <Ionicons name='checkmark-circle' size={25} color={COLORS.Green} className="font-bold" />
        <Text style={styles.font} className="text-base mx-2" > جده </Text>
        </View>
       
        
        </TouchableOpacity>

        <TouchableOpacity  className="bg-white mt-12 px-4 py-6 flex flex-row justify-between items-center w-full rounded-xl" style={styles.boxUnactive} >

        <Text style={styles.font} className="text-base" > الرياض </Text>
        <Text style={styles.font} className="text-base " > قريبا</Text>
        
        </TouchableOpacity>

        <TouchableOpacity  className="bg-white mt-4 px-4 py-6 flex flex-row justify-between items-center w-full rounded-xl" style={styles.boxUnactive} >
        <Text style={styles.font} className="text-base" > الخبر </Text>
        <Text style={styles.font} className="text-base " > قريبا</Text>
        </TouchableOpacity>

        <TouchableOpacity  className="bg-white mt-4 px-4 py-6 flex flex-row justify-between items-center w-full rounded-xl" style={styles.boxUnactive} >
        <Text style={styles.font} className="text-base" > الدمام </Text>
        <Text style={styles.font} className="text-base " > قريبا</Text>
        </TouchableOpacity>

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
    paddingHorizontal: 30,
  },
  font: {
    fontFamily: FONTFAMILY.font_regular,
  },
  topAreaHeadins: {
    paddingHorizontal: 20,
  },
  box: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  boxUnactive: {
    backgroundColor: COLORS.Gray,
    opacity: 0.8
  }
 

} );

export default CountrySubScreen