import { View, Text  , StyleSheet , StatusBar  , ScrollView , TouchableOpacity} from 'react-native'
import React , {useContext , useState} from 'react'
import { FONTFAMILY , COLORS } from '../theme/theme';
import { AppContext } from '../context/AppContext';
import LoadingContainer from '../components/LoadingContainer';
import TopStepNavigation from '../components/TopStepNavigation';
import TopStepCounter from '../components/TopStepCounter';
import Ionicons from '@expo/vector-icons/Ionicons';


const BookingTimeScreen = ({ navigation }) => {

  const { isLoading , error , setError , setBookingProduct , bookingProduct } = useContext(AppContext);
  const [ insuranceStatus , setInsuranceStatus ] = useState(true);
  const [timePickupState ,  setTimePickupState ] = useState('');
  const [timeRevState ,  setTimeRevState ] = useState('');

  const toggleSwitch = () => {
    setInsuranceStatus(!insuranceStatus);
  };


  const handleNextStep = () => {
    console.log(bookingProduct)
    setBookingProduct({
      ...bookingProduct,
      booking_time: insuranceStatus ? 'أنا مرن مع وقت استلام الغرض وارجاعه' : `من ${timePickupState} الى ${timeRevState}`
    })
    navigation.navigate('BookingOrderSummaryScreen');
  }


  return (
   
      
      <ScrollView>

      {isLoading && (
       <LoadingContainer />
      )}

      <View style={styles.container}  >

      <StatusBar translucent backgroundColor="black" />
      { /* TOP HEADER TEXT */ }
      <View className="pt-20 pb-5" style={styles.topAreaHeadins}  >

        <TopStepNavigation navigation={navigation} />

        <View className="mt-12" >
        <TopStepCounter percentage={60} step={3} totalStep={5} headline="وقت الاستلام" />
      </View>
   
      </View>

      { /* END TOP HEADER TEXT */ }

      { /* BODY HERE */}

      <View style={styles.containerMargin} >
      <View className="mt-12" >
      <View className="flex flex-row items-center justify-between mx-2">

  
    <Text style={styles.textInput} className="text-base  block text-gray-700 font-bold mb-2" htmlFor="username">
       أنا مرن مع وقت استلام الغرض وارجاعه
      </Text>
  

  
  <TouchableOpacity onPress={toggleSwitch} style={[styles.switch , insuranceStatus ? styles.switchBgOn : styles.switchBgOff  ]}>
        <View style={[styles.switchToggle, insuranceStatus ? styles.switchToggleOn : styles.switchToggleOff]} />
      </TouchableOpacity>

     
      </View>
   
</View>

{!insuranceStatus && (
  <View className="mt-16 mb-8" >

  <View  > 
  <Text className="text-base text-black text-left" style={styles.font} > الوقت المفضل لاستلام الغرض </Text>

<TouchableOpacity onPress={() => setTimePickupState('9pm-12pm') }  style={styles.borderButton} className="mt-5 flex flex-row items-center justify-center py-2" >
  {timePickupState == '9pm-12pm' && (
    <Ionicons name="checkmark-circle" size={25} color={COLORS.Green} className="font-bold" />
  ) }


     <Text className="text-sm font-bold  mx-1" style={[styles.font ]} > 09 AM - 12 PM  </Text>
   </TouchableOpacity>

<TouchableOpacity onPress={() => setTimePickupState('12pm-03pm') }   style={styles.borderButton} className="mt-5 flex flex-row items-center justify-center py-2" >

{timePickupState == '12pm-03pm' && (
    <Ionicons name="checkmark-circle" size={25} color={COLORS.Green} className="font-bold" />
  ) }


     <Text className="text-sm font-bold  mx-1" style={[styles.font ]} > 12 PM - 03 PM  </Text>
   </TouchableOpacity>

<TouchableOpacity onPress={() => setTimePickupState('03pm-06pm') }  style={styles.borderButton} className="mt-5 flex flex-row items-center justify-center py-2" >

{timePickupState == '03pm-06pm' && (
    <Ionicons name="checkmark-circle" size={25} color={COLORS.Green} className="font-bold" />
  ) }
     <Text className="text-sm font-bold  mx-1" style={[styles.font ]} > 03 PM - 06 PM  </Text>
   </TouchableOpacity>
<TouchableOpacity  onPress={() => setTimePickupState('6pm') }  style={styles.borderButton} className="mt-5 flex flex-row items-center justify-center py-2" >

{timePickupState == '6pm' && (
    <Ionicons name="checkmark-circle" size={25} color={COLORS.Green} className="font-bold" />
  ) }
     <Text className="text-sm font-bold  mx-1" style={[styles.font ]} >  6 PM بعد  </Text>
   </TouchableOpacity>
  </View>

  <View className="mt-12" > 
  <Text className="text-base text-black text-left" style={styles.font} > الوقت المفضل لارجاع الغرض </Text>

  
<TouchableOpacity onPress={() => setTimeRevState('9pm-12pm') }  style={styles.borderButton} className="mt-5 flex flex-row items-center justify-center py-2" >
  {timeRevState == '9pm-12pm' && (
    <Ionicons name="checkmark-circle" size={25} color={COLORS.Green} className="font-bold" />
  ) }


     <Text className="text-sm font-bold  mx-1" style={[styles.font ]} > 09 AM - 12 PM  </Text>
   </TouchableOpacity>

<TouchableOpacity onPress={() => setTimeRevState('12pm-03pm') }   style={styles.borderButton} className="mt-5 flex flex-row items-center justify-center py-2" >

{timeRevState == '12pm-03pm' && (
    <Ionicons name="checkmark-circle" size={25} color={COLORS.Green} className="font-bold" />
  ) }


     <Text className="text-sm font-bold  mx-1" style={[styles.font ]} > 12 PM - 03 PM  </Text>
   </TouchableOpacity>

<TouchableOpacity onPress={() => setTimeRevState('03pm-06pm') }  style={styles.borderButton} className="mt-5 flex flex-row items-center justify-center py-2" >

{timeRevState == '03pm-06pm' && (
    <Ionicons name="checkmark-circle" size={25} color={COLORS.Green} className="font-bold" />
  ) }
     <Text className="text-sm font-bold  mx-1" style={[styles.font ]} > 03 PM - 06 PM  </Text>
   </TouchableOpacity>
<TouchableOpacity  onPress={() => setTimeRevState('6pm') }  style={styles.borderButton} className="mt-5 flex flex-row items-center justify-center py-2" >

{timeRevState == '6pm' && (
    <Ionicons name="checkmark-circle" size={25} color={COLORS.Green} className="font-bold" />
  ) }
     <Text className="text-sm font-bold  mx-1" style={[styles.font ]} >  6 PM بعد  </Text>
   </TouchableOpacity>


  </View>



          </View>
      )}
          
      <View className="mt-16 mb-8" >
          <TouchableOpacity
      className=" text-center rounded-full p-3"
      style={styles.button}
      onPress={() => handleNextStep() }
      >

      <Text style={styles.buttonText}>  ملخص الطلب </Text>
      </TouchableOpacity>
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

} );

export default BookingTimeScreen