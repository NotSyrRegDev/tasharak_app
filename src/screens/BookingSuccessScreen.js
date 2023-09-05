import { View , SafeAreaView , StyleSheet , StatusBar    , ScrollView  , Image , Text , TouchableOpacity , ActivityIndicator} from 'react-native'
import React, { useContext, useEffect } from 'react'
import { FONTFAMILY , COLORS } from '../theme/theme';
import { AppContext } from '../context/AppContext';
import { CommonActions } from '@react-navigation/native';



const BookingSuccessScreen = ({ navigation }) => {

  const {   isLoading } = useContext(AppContext);

  return (
    <SafeAreaView style={styles.container} >
      
      <ScrollView>
      <StatusBar translucent backgroundColor="black" />

      {isLoading ? (
        <View className="flex items-center justify-center h-96" >
        <ActivityIndicator animating={true} color={'#007FB7'} />
        </View>
       
      ) : (
        <View   >


{ /* TOP HEADER TEXT */ }
<View className="pt-16 pb-5" >
<View className="flex-row items-center justify-center  relative"   >
      
<Text className="text-3xl text-center"  style={styles.title} > تمت عملية الحجز بنجاح   </Text>

</View>
    </View>

{ /* END TOP HEADER TEXT */ }

<View className="flex-col items-center justify-center mt-16 "   >
<Image source={require('../assets/icons/success.png')} />

<Text className="text-center text-3xl mt-5" style={styles.titleBlue} >  تهانينا   </Text>

<Text className="text-center text-base mt-5 w-80" style={styles.font} > شكرا لاختيارك تشارك , سنقوم بتوصيل المنتج لك باسرع ما يمكن   </Text>

<TouchableOpacity
  className="mt-32 rounded-full py-2 px-4"
  style={styles.button}
  onPress={() => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'MyOrdersScreen' }],
      })
    );
  }}
>
  <Text style={styles.buttonText}>    متابعة الطلب </Text>
</TouchableOpacity>

<TouchableOpacity
  className="mt-3 p-4"
  onPress={() => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'HomeTabs' }],
      })
    );
  }}
>
  <Text style={styles.exploreButtonText}> استئجار أغراض أخرى  </Text>
</TouchableOpacity>
</View>

</View>
      )}



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
  },
  titleBlue: {
    fontFamily: FONTFAMILY.font_medium,
    color: COLORS.Blue
  },
  font: {
    fontFamily: FONTFAMILY.font_regular,
  },
  title: {
    color: COLORS.LightBLue,
    fontFamily: FONTFAMILY.font_bold,
    fontWeight: 'bold',
    
  },
  button: {
    borderColor: 'none',
    width: 280,
    backgroundColor: COLORS.LightBLue,
  },
  buttonText: {
    fontFamily: FONTFAMILY.font_regular,
    fontSize: 15,
    fontWeight: 200,
    color: 'white',
    textAlign: 'center',
  },
  exploreButtonText:{
    fontFamily: FONTFAMILY.font_bold,
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.Blue,
    textAlign: 'center',
  }
 

} );

export default BookingSuccessScreen