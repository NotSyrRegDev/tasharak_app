import { View , SafeAreaView , StyleSheet , StatusBar    , ScrollView  , Image , Text} from 'react-native'
import React , {useState , useEffect, useCallback } from 'react'
import { FONTFAMILY , COLORS } from '../theme/theme';
import TopProfileNavigator from '../components/TopProfileNavigator';
import { getDoc , doc , db   } from '../../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';


const MyRevenueScreen = ({ navigation }) => {

  const [loading , setLoading] = useState(false);
  const [revenueObject , setRevenueObject] = useState({});



  useFocusEffect(
    useCallback(() => {
      const getInfoFromFireStore = async () => {
        setLoading(true);
        const value = await AsyncStorage.getItem('tashark_user');
        let jsonPrsed = JSON.parse(value);
     
        const docRef = doc(db, "users", jsonPrsed.id );
        const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setRevenueObject(docSnap.data());
            setLoading(false);
          } 
      }
      getInfoFromFireStore();
    }, [])
  );



  return (
    <SafeAreaView style={styles.container} >
      
      <ScrollView>


      <View   >

      <StatusBar translucent backgroundColor="black" />
      { /*  BUTTONS CONTAINER */ }

        <View className="mt-20  min-w-100" style={styles.buttonsContainer} >

        <View className="text-center relative bg-blue-100 w-80 h-16 flex justify-center " >
            <Text className="font-bold text-xl text-center pl-10" style={styles.priceButton} >  {revenueObject?.my_revenue} ر.س </Text>

            <View className="absolute top-0 left-0 px-2 h-16" style={styles.buttonSubContainer} >
                <Text className="text-white text-2xl text-center pt-4" stlye={styles.font} > إيراداتي </Text>
            </View>

        </View>

        <View className="text-center relative bg-blue-100 w-80 h-16 flex justify-center mt-8" >
            <Text className="font-bold text-xl text-center pl-10" style={styles.priceButton} >  {revenueObject?.my_rentd} ر.س </Text>

            <View className="absolute top-0 left-0 px-2 h-16" style={styles.buttonSubContainer} >
                <Text className="text-white text-2xl text-center pt-4" stlye={styles.font} > إيجاراتي </Text>
            </View>

        </View>

        <View className="text-center relative bg-blue-100 w-80 h-16 flex justify-center mt-8" >
            <Text className="font-bold text-xl text-center pl-10" style={styles.priceButton} > {revenueObject?.my_rents} ر.س </Text>

            <View className="absolute top-0 left-0 px-2 h-16" style={styles.buttonSubContainer} >
                <Text className="text-white text-2xl text-center pt-4" stlye={styles.font} > مؤجرات </Text>
            </View>

        </View>

        </View>

      { /*  END BUTTONS CONTAINER */ }


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
  },
  priceButton: {
    fontFamily: FONTFAMILY.font_medium,

  },
  buttonSubContainer: {
    backgroundColor: COLORS.LightBLue,
  },
  font: {
    fontFamily : FONTFAMILY.font_medium,
    fontWeight: 300
  },
  buttonsContainer: {
    height: '80%',
    justifyContent: 'center', 
    alignItems: 'center'
  }
 

} );

export default MyRevenueScreen