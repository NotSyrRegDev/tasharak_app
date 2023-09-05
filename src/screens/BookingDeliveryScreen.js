import { View, Text  , StyleSheet , StatusBar  , ScrollView , TouchableOpacity , Image} from 'react-native'
import React , {useContext , useState} from 'react'
import { FONTFAMILY , COLORS } from '../theme/theme';
import { AppContext } from '../context/AppContext';
import LoadingContainer from '../components/LoadingContainer';
import DatePicker from 'react-native-modern-datepicker';
import TopStepNavigation from '../components/TopStepNavigation';
import TopStepCounter from '../components/TopStepCounter';


const BookingDeliveryScreen = ({ navigation }) => {

  const getCurrentDateAsString = () => {
    const currentDate = new Date();
    return currentDate.toISOString().split('T')[0];
  };

  const { isLoading } = useContext(AppContext);
  const [currentDate, setCurrentDate] = useState(getCurrentDateAsString());
  const [selectedDate, setSelectedDate] = useState(getCurrentDateAsString());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  

const handleDayPress = (day) => {
  if (!startDate) {
   
    setStartDate(day.dateString);
    setSelectedDate(day.dateString);
  } else if (!endDate && day.dateString > startDate) {
   
    setEndDate(day.dateString);
    setSelectedDate(day.dateString);
  } else {
   
    setStartDate(null);
    setEndDate(null);
    setSelectedDate(day.dateString);
  }
};

  const handleNextStep = () => {
    navigation.navigate('BookingTimeScreen');
  }


  return (
   
      
      <ScrollView contentContainerStyle={styles.container} >

      {isLoading && (
       <LoadingContainer />
      )}

      <View   >

      <StatusBar translucent backgroundColor="black" />
      { /* TOP HEADER TEXT */ }
      <View className="pt-20 pb-5" style={styles.topAreaHeadins}  >

        <TopStepNavigation navigation={navigation} />

        <View className="mt-12" >
        <TopStepCounter percentage={40} step={2} totalStep={5} headline="اختر طرق التوصيل" />
      </View>
   
      </View>

      { /* END TOP HEADER TEXT */ }

      { /* BODY HERE */}

      <View style={styles.containerMargin} >
      <View className="mt-12" >

      <TouchableOpacity  onPress={() => handleNextStep() }  style={styles.borderButton} className="mt-5 flex flex-row items-center justify-center" >
     
     <Image source={require('../assets/icons/box_icon.png')} style={styles.iconinc} />
       <Text className="text-base font-bold text-right mx-1" style={[styles.font ]} > التوصيل عبر تشارك   </Text>

     
     </TouchableOpacity>

      {/* <TouchableOpacity style={styles.borderButton} className="mt-5 flex flex-row items-center justify-center" >
     
     <Image source={require('../assets/icons/box_icon.png')} style={styles.iconinc} />
       <Text className="text-base font-bold text-right mx-1" style={[styles.font ]} > التوصيل  عن طريق البائع   </Text>

     
     </TouchableOpacity> */}


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
  borderButton: {
    borderWidth: 1,
    borderRadius: 400,
    borderColor: COLORS.LightBLue,
    backgroundColor: 'transparent',
    
  },
  buttonText: {
    fontFamily: FONTFAMILY.font_medium,
    color: 'white',
    textAlign: 'center',
  },
  containerMargin: {
    paddingHorizontal: 20,
  },
  iconinc: {
    width: 70,
    height: 70,
  },

} );

export default BookingDeliveryScreen