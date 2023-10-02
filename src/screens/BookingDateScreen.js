import { View, Text  , StyleSheet , StatusBar  , ScrollView , TouchableOpacity , Button} from 'react-native'
import React , {useContext , useState , useRef} from 'react'
import { FONTFAMILY , COLORS } from '../theme/theme';
import { AppContext } from '../context/AppContext';
import LoadingContainer from '../components/LoadingContainer';
import TopStepNavigation from '../components/TopStepNavigation';
import TopStepCounter from '../components/TopStepCounter';
import DateTimePicker from '@react-native-community/datetimepicker';


const BookingDateScreen = ({ navigation  }) => {

  const scrollViewRef = useRef();

  const { isLoading , error , setError , setBookingProduct , bookingProduct } = useContext(AppContext);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [numberOfDays, setNumberOfDays] = useState(null);

  const onChangeStartDate = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setStartDate(currentDate);
    calculateNumberOfDays(currentDate, endDate);
  };

  const onChangeEndDate = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    if (currentDate >= startDate) {
      setEndDate(currentDate);
      calculateNumberOfDays(startDate, currentDate);
    }
  };

  const calculateNumberOfDays = (start, end) => {
    const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds
    const diffDays = Math.round(Math.abs((start - end) / oneDay));
    setNumberOfDays(diffDays);
    
if (diffDays < bookingProduct?.minDay || diffDays > bookingProduct?.maxDay) {
      setError(`عدد الايام لاستئجار الغرض يجب ان يكون بحد اقل  ${route.params.minDay} وعدد أقصى ${route.params.maxDay}`);
    } else {
      setError('');
    }

  };

  const handleNextStep = () => {
    if (error == '' ) {
     
      setBookingProduct({ 
          ...bookingProduct,
          booking_start_date: startDate,
          booking_end_date: endDate,
          booking_total_days: numberOfDays
       });

      navigation.navigate('BookingDeliveryScreen');
    }
  
  }


  return (
   
      
    <ScrollView
    style={{ flex: 1 }}
ref={scrollViewRef}
contentContainerStyle={{ flexGrow: 1 }} 
  >

      {isLoading && (
       <LoadingContainer />
      )}

      <View style={styles.container}  >

      <StatusBar translucent backgroundColor="black" />
      { /* TOP HEADER TEXT */ }
      <View className="pt-20 pb-5" style={styles.topAreaHeadins}  >

        <TopStepNavigation navigation={navigation} />

        <View className="mt-12" >
        <TopStepCounter percentage={20} step={1} totalStep={5} headline="اختر فترة الايجار" />
      </View>
   
      </View>

      { /* END TOP HEADER TEXT */ }

      { /* BODY HERE */}

      <View style={styles.containerMargin} >
      <View className="mt-12" >

      {error && (
        <>
          {scrollViewRef.current.scrollTo({ y: 0, animated: true })}
          <View className="p-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 text-right mb-5 flex items-start">
            <Text style={styles.errorText}>{error}</Text>
          </View>
        </>
      )}


        <Text className="text-xl text-black text-left" style={styles.font} >  اختيار التواريخ </Text>
        
        <View className="bg-gray-100 shadow-lg py-2 px-4 mt-8" >

        <View style={styles.dateContainer}>
        <Text className="text-base text-blue-500 text-left" style={styles.font}  >   من تاريخ </Text>
        <Text style={styles.font} >{startDate.toDateString()}</Text>
      </View>

     <View style={styles.datePickerButton} className="mt-3" >
     <DateTimePicker
          testID="startDatePicker"
          value={startDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChangeStartDate}
        />
     </View>
      
    
        </View>
        
        <View className="bg-gray-100 shadow-lg py-2 px-4 mt-8" >
        <View style={styles.dateContainer}>
        <Text className="text-base text-blue-500 text-left" style={styles.font}  >   الى تاريخ </Text>
        <Text style={styles.font} >{endDate.toDateString()}</Text>
      </View>
     
      <View style={styles.datePickerButton} className="mt-3" >
      <DateTimePicker
          testID="endDatePicker"
          value={endDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChangeEndDate}
        />
    
     </View>
       
        </View>
        
     
        {numberOfDays !== null && (
          <View className="flex flex-row items-center justify-between mt-8" >
    
    <View>
    <Text style={styles.font} className="text-lg text-left " >   مجموع الايام   </Text>

    </View>
    <Text style={styles.font} className="text-lg text-left " >  {numberOfDays} أيام  </Text>
    </View>
      )}

  



        </View>

        <View className="mt-10 mb-8" >
          <TouchableOpacity
      className=" text-center rounded-full p-3"
      style={styles.button}
      onPress={() => handleNextStep() }
      >

      <Text style={styles.buttonText}>  اختر طرق التوصيل  </Text>
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
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  datePickerButton: {
    marginBottom: 20,
    fontFamily: FONTFAMILY.font_regular,
    fontSize: 18,
    textAlign: 'center',
  },
  errorText: {
    fontFamily: FONTFAMILY.font_regular,
    lineHeight: 24,
      textAlign: 'left'
  },

} );

export default BookingDateScreen