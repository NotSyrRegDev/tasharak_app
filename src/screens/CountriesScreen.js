import { View , SafeAreaView , StyleSheet , StatusBar    , ScrollView  , Image , Text ,TouchableOpacity } from 'react-native'
import React from 'react'
import { FONTFAMILY , COLORS } from '../theme/theme';
import TopProfileNavigator from '../components/TopProfileNavigator';
import Feather from '@expo/vector-icons/Feather';


const CountriesScreen = ({ navigation }) => {


  return (
    <SafeAreaView style={styles.container} >
      
      <ScrollView>


      <View   >

      <StatusBar translucent backgroundColor="black" />
      { /* TOP HEADER TEXT */ }
    <TopProfileNavigator navigation={navigation} text={"الدولة"} />

      { /* END TOP HEADER TEXT */ }

      <View className="flex items-start mt-16" style={styles.topAreaHeadins}   >

        <Text className="text-xl" style={styles.font} > حدد الدولة </Text>

        <TouchableOpacity onPress={() => navigation.navigate('CountrySubScreen') } className="bg-white mt-8 px-4 py-6 flex flex-row justify-between items-center w-full rounded-xl" style={styles.box} >
        <Text style={styles.font} className="text-base" > المملكة العربية السعودية </Text>

        <View className="flex flex-row items-center" >
        <Image className="mx-3" source={require('../assets/icons/saudi.png')}  />
        <Feather  name="chevron-left" size={28} color={COLORS.Gray} />
        </View>
        
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
  }
 

} );

export default CountriesScreen