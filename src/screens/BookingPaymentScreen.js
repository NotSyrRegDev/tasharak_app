import { View, Text  , StyleSheet , StatusBar  , ScrollView , TouchableOpacity , ActivityIndicator} from 'react-native'
import React , {useContext , useState , useEffect} from 'react'
import { FONTFAMILY , COLORS } from '../theme/theme';
import { AppContext } from '../context/AppContext';
import TopStepNavigation from '../components/TopStepNavigation';
import TopStepCounter from '../components/TopStepCounter';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';


const BookingPaymentScreen = ({ navigation }) => {

  const { isLoading , bookingProduct , addNewBooking  , error , success , setBookingProduct } = useContext(AppContext);

  const [userId, setUserId] = useState('');
  const [userFullName, setUserFullName] = useState('');
  const [userEmail, setEmail] = useState('');
  const [paymentWay , setPaymentWay] = useState('on-delivery');


  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('tashark_user');
       let jsonPrsed = JSON.parse(value);
       setUserFullName(jsonPrsed.first_name + " " +  jsonPrsed.last_name);
       setEmail(jsonPrsed.email);
       setUserId(jsonPrsed.id);
      
      } catch (error) {
     
      }
    };

    getData();
  }, []);

  useEffect(() => {

    const currentDate = new Date();
    const orderStatus = {
      percentage: 20,
      statusHeadine: 'تم الطلب',
      stepDone: 1
    }

    setBookingProduct({ 
      ...bookingProduct,
      booking_date: currentDate,
      booking_order_status: orderStatus,
      booking_payment_way: paymentWay
   });
  } , [])


  const handleNextStep = () => {

    addNewBooking(userFullName , userEmail , userId , bookingProduct );
    setTimeout(() => {
      navigation.navigate('BookingSuccessScreen');
     }, 3500);
    
  }


  return (
   
      
      <ScrollView>

   

      <View style={styles.container}  >

      <StatusBar translucent backgroundColor="black" />
      { /* TOP HEADER TEXT */ }
      <View className="pt-20 pb-5" style={styles.topAreaHeadins}  >

        <TopStepNavigation navigation={navigation} />

        <View className="mt-12" >
        <TopStepCounter percentage={100} step={5} totalStep={5} headline="أختر طريقة الدفع" />
      </View>
   
      </View>

      { /* END TOP HEADER TEXT */ }

      { /* BODY HERE */}

      <View style={styles.containerMargin} >
      <View className="mt-12" >

      {error && (
          <View className=" p-4  text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 text-right mb-5 flex items-start" >
            <Text style={styles.errorText}  >{error}</Text>
          </View>
        )}

        {success && (
          <View className=" p-4  text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 text-right mb-5 flex items-start" >
            <Text style={styles.errorText}  >{success}</Text>
          </View>
        )}
      
      <Text className="text-lg text-black text-left" style={styles.font} > كيف ترد أن تدفع ؟  </Text>

      
      <TouchableOpacity    style={styles.borderButton} className="mt-8 flex flex-row items-center justify-center py-2 px-4" >
     
      <Ionicons name="checkmark-circle" size={25} color={COLORS.Green} className="font-bold" />
     
       <Text className="text-s font-bold text-right mx-1" style={[styles.font ]} > الدفع عند الأستلام  - 25 ريال  </Text>

     
     </TouchableOpacity>


     <View className="flex flex-row items-center justify-between mt-12" >
    
    <View>
    <Text style={styles.font} className="text-base text-left " >   المجموع   </Text>
    <Text style={styles.font} className="text-base text-left mt-3 " >    رسوم التوصيل   </Text>
    <Text style={styles.font} className="text-base text-left mt-3 " >   مبلغ التأمين   </Text>
    <Text style={styles.font} className="text-xs text-left mt-3 text-red-500" >   سيتم خصمه في حال ارجاع الغرض تالف      </Text>

    </View>

    <View className="flex flex-col items-center justify-center" >

    <Text style={styles.font} className="text-lg text-left " > 
      {bookingProduct?.dayPrice *  bookingProduct?.booking_total_days } ر.س  
       </Text>

<Text style={styles.font} className="text-lg text-left " >  +  </Text>
<Text style={styles.font} className="text-lg text-left " >   25 ر.س   </Text>

<Text style={styles.font} className="text-lg text-left " >  +  </Text>


<Text style={styles.font} className="text-lg text-left " >   {bookingProduct?.insurancePrice} ر.س   </Text> 

   </View>
  
    </View>

    <View className="flex flex-row items-center justify-between mt-10" >
    
    <View>
    <Text style={styles.font} className="text-lg text-left " >   المجموع   </Text>
  

    </View>
    <Text style={styles.font} className="text-lg text-left " >   {parseInt(bookingProduct?.dayPrice) * parseInt( bookingProduct?.booking_total_days) + 25 + parseInt(bookingProduct?.insurancePrice)  } ر.س   </Text>
    </View>


   
    </View>


          
      <View className="mt-16 mb-8" >

      {isLoading ? (
        <View className="mt-8 mb-8" >
    <ActivityIndicator animating={true} color={'#007FB7'} />
    </View>
      ) : (
        <TouchableOpacity
      className=" text-center rounded-full p-3"
      style={styles.button}
      onPress={() => handleNextStep() }
      >

      <Text style={styles.buttonText}>   أطلب الغرض </Text>
      </TouchableOpacity>
      )}
         
          </View>

        </View>




    { /* END BODY HERE */}

   

      </View>

      </ScrollView>

   
  )
}

const styles = StyleSheet.create({ 

  container: {
    backgroundColor: COLORS.White,
    height: '100%',
    direction: 'rtl',
    felx:1,
    borderRadius: 50,
    
  },
  topAreaHeadins: {
    backgroundColor: COLORS.Blue,
    paddingHorizontal: 20,
  },
  title: {
    color: COLORS.White,
    fontFamily: FONTFAMILY.font_bold,
    fontWeight: 'bold',
    
  },
  searchBarContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 50,
    alignItems: 'center',
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 20,
    elevation: 1,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: COLORS.Gray,
    fontFamily: FONTFAMILY.font_bold,
    fontWeight: 'bold',
  },
  loading: {
    marginLeft: -25,
  },
  loadingContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
  },
  font: {
    fontFamily: FONTFAMILY.font_regular
  },
  button: {
    borderColor: 'none',
    backgroundColor:COLORS.LightBLue,
    opacity: 1,
    paddingHorizontal: 8,
    paddingVertical: 8,
    
  },
  buttonText: {
    fontFamily: FONTFAMILY.font_medium,
    color: 'white',
    textAlign: 'center',
  },
  containerMargin: {
    paddingHorizontal: 20,
  },
  switch: {
    width: 50,
    height: 25,
    borderRadius: 15,
    justifyContent: 'center',
    padding: 2,
  },
  switchToggle: {
    width: 16,
    height: 16,
    borderRadius: 15,
    backgroundColor: 'white',
  },
  switchToggleOn: {
    backgroundColor:  COLORS.White,
    transform: [{ translateX: -26 }],
  },
  switchToggleOff: {
    backgroundColor: COLORS.White,
    transform: [{ translateX: -2 }],
  },
  switchText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  switchBgOff: {
    backgroundColor: COLORS.Gray,
  },
  switchBgOn: {
    backgroundColor: COLORS.LightBLue
  },
  textInput: {
    color: COLORS.Black,
    fontFamily: FONTFAMILY.font_regular,
    textAlign: 'left',
  },
  borderButton: {
    borderWidth: 1,
    borderRadius: 400,
    borderColor: COLORS.LightBLue,
    backgroundColor: 'transparent',
    
  },
  iconinc: {
    width: 70,
    height: 70,
  },
  errorText: {
    fontFamily: FONTFAMILY.font_regular,
      textAlign: 'right'
  },

} );

export default BookingPaymentScreen