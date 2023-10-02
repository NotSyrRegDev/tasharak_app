import { View, Text , SafeAreaView , StyleSheet , StatusBar  , TouchableOpacity , ScrollView  , KeyboardAvoidingView   , Keyboard} from 'react-native'
import React , {useContext , useState , useEffect , useRef} from 'react'
import TopProfileNavigator from '../components/TopProfileNavigator';
import { FONTFAMILY , COLORS } from '../theme/theme';
import Slider from '@react-native-community/slider';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import PricingInput from '../components/PricingInput';
import { AppContext } from '../context/AppContext';
import DaysInput from '../components/DaysInput';


const AddScreenDetails = ({ navigation }) => {

  const [ productCase , setProductCase ] = useState('');
  const [ productCount , setProductCount ] = useState(1);
  const [ dailyRentPrice , setDailyRentPrice ] = useState(0);
  const [ weekRentPrice , setWeekRentPrice ] = useState(0);
  const [ monthlyRentPrice , setMonthlyRentPrice ] = useState(0);
  const [ minRentalPrice , setMinRentalPrice ] = useState(0);
  const [ maxRentalPrice , setMaxRentalPrice ] = useState(0);
  const [ deliveryWay , setDeliveryWay ] = useState('tasharak');
  const [ insuranceStatus , setInsuranceStatus ] = useState(false);
  const [ insurancePrice , setInsurancePrice ] = useState(0);
  const [ deliveryPlan , setDeliveryPlan ] = useState('free');

  const [sliderValue, setSliderValue] = useState(0);

  const { isLoading  , setError , error , setProductAdditional  } = useContext(AppContext);


  const toggleSwitch = () => {
    setInsuranceStatus(!insuranceStatus);
  };

  const handleSliderChange = (value) => {

    if (value == 0) {
      setProductCase('جيد')
    }

    if (value == 1) {
      setProductCase('بالكاد مستعمل')
    }

    if (value == 2) {
      setProductCase('جديد')
    }

    setSliderValue(value);
  };

  const renderOption = (optionValue, optionTitle) => {
    const isSelected = optionValue === sliderValue;
    const optionContainerStyle = isSelected ? styles.selectedOptionContainer : styles.optionContainer;
    const optionTitleStyle = isSelected ? styles.selectedOptionTitle : styles.optionTitle;

    return (
      <View style={optionContainerStyle}>
        <Text style={optionTitleStyle}>{optionTitle}</Text>
     
      </View>
    );
  };

  const handleNextStep = () => {
    console.log(productCase)
    if (   productCount > 0 && dailyRentPrice > 0 && weekRentPrice > 0 && monthlyRentPrice > 0  && minRentalPrice > 0 && maxRentalPrice > 0  ) {
        
      setProductAdditional([{productCase , productCount, dailyRentPrice, weekRentPrice  , monthlyRentPrice ,minRentalPrice , maxRentalPrice ,deliveryWay , insuranceStatus , insurancePrice , deliveryPlan}]);
     
      navigation.navigate('AddScreenImages');
    }else {
      setError("يرجى ادخال جميع الحقول المطلوبة");
      setTimeout(() => {
        setError('');
      } , 3200)
    }
   
  }

  const [isKeyboardOpen, setKeyboardOpen] = useState(false);
  
  const handleKeyboardDidShow = () => {
    setKeyboardOpen(true);
  };

  const handleKeyboardDidHide = () => {
    setKeyboardOpen(false);
  };


  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow);
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', handleKeyboardDidHide);

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const scrollViewRef = useRef();

  return (
    
    <SafeAreaView  >

<ScrollView
       
  ref={scrollViewRef}
  contentContainerStyle={{ flexGrow: 1 }} 
      >

    <View style={[ styles.container , isKeyboardOpen ? styles.keyboardOn : '' ]} >

<StatusBar translucent backgroundColor="black" />

{ /* CHOOSING CATEGORY */ }
<View style={styles.containerMargin} className="mt-10" >

<KeyboardAvoidingView
    
    >


{error && (
        <>
          {scrollViewRef.current.scrollTo({ y: 0, animated: true })}
          <View className="p-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 text-right mb-5 flex items-start">
            <Text style={styles.errorText}>{error}</Text>
          </View>
        </>
      )}


            
<View className="mb-8">
<Text style={styles.textInput} className="text-lg block text-gray-700 font-bold mb-5" htmlFor="username">
    حالة الغرض  <Text className="text-red-500 text-base" > * </Text>  
  </Text>

  <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={2}
        step={1}
        value={sliderValue}
        onValueChange={handleSliderChange}
        minimumTrackTintColor="#22BC9F"
          maximumTrackTintColor="#FAFAFA"
          thumbTintColor="#007FB7"
      />
      <View style={styles.optionsContainer}>
        {renderOption(0, 'جيد')}
        {renderOption(1, 'بالكاد مستعمل')}
        {renderOption(2, 'جديد')}
      </View>
</View>

<View className="mt-8 flex flex-row justify-between">
<Text style={styles.textInput} className="text-lg block text-gray-700 font-bold mb-2" htmlFor="username">
     الكمية المتوفرة <Text className="text-red-500 text-base" > * </Text>  
  </Text>

    <View className="flex flex-row items-center " >

      { /*  INCREMENT */ }
      <TouchableOpacity onPress={() => setProductCount(productCount + 1) } >
      <View style={[styles.circleButton , styles.incButton]} >
      <Ionicons name="add-sharp" size={22} color="#fff" clas style={{ fontWeight: 'bold'  }}  />
      </View>
      </TouchableOpacity>
      
    
      { /* THE VALUE */ }
      <Text style={styles.countTitle} className="text-xl" >  {productCount} </Text>

      { /*  DECREMENT */ }
      <TouchableOpacity onPress={() => setProductCount(productCount - 1) } >
      <View style={[styles.circleButton , styles.minusButton]} >
      <MaterialCommunityIcons name="minus" size={22} color="#fff" clas style={{ fontWeight: 'bold'  }}  />
      </View>
      </TouchableOpacity>
      

    </View>
</View>

<View className="mt-8 ">
<Text style={styles.textInput} className="text-lg block text-gray-700 font-bold mb-2" htmlFor="username">
      سعر التأجير <Text className="text-red-500 text-base" > * </Text>  
  </Text>

    <View className="flex flex-row items-center mt-8 justify-between mr-4" >

    <View className="w-1/2 mr-4" >
    <PricingInput title={"يومي"} state={dailyRentPrice} setState={setDailyRentPrice}  />
    </View>
    <View className="w-1/2" >
    <PricingInput title={"أسبوعي"} state={weekRentPrice} setState={setWeekRentPrice}  />
    </View>
  
    </View>

    <View className="mt-12  mx-4">

    <PricingInput title={"شهري"} state={monthlyRentPrice} setState={setMonthlyRentPrice}  />

    </View>

</View>

<View className="mt-12 ">
<Text style={styles.textInput} className="text-lg block text-gray-700 font-bold mb-2" htmlFor="username">
      مدة التأجير <Text className="text-red-500 text-base" > * </Text>  
  </Text>

    <View className="flex flex-row items-center mt-8 justify-between mr-4" >

    <View className="w-1/2 mr-4" >
    <DaysInput title={"الحد الأدنى للتأجير"} state={minRentalPrice} setState={setMinRentalPrice}  />
    </View>
    <View className="w-1/2" >
    <DaysInput title={"الحد الأعلى للتأجير"} state={maxRentalPrice} setState={setMaxRentalPrice}  />
    </View>
  
    </View>

</View>

<View className="mt-16 flex flex-row justify-between">
<Text style={styles.textInput} className="text-lg block text-gray-700 font-bold mb-2" htmlFor="username">
    توصيل مجاني؟  <Text className="text-red-500 text-base" > * </Text>  
  </Text>

    <View className="flex flex-row items-center " >

    <TouchableOpacity onPress={() => setDeliveryPlan('free') } className="flex flex-row items-center mx-2" >
    <View style={styles.checkboxForm}  >
            {deliveryPlan === "free" && (
              <Ionicons name="checkmark" size={18} color="#22BCA0" className="font-bold" />
            )}
          </View>
          <Text style={styles.font} > نعم </Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => setDeliveryPlan('paid') } className="flex flex-row items-center mx-2" >
    <View style={styles.checkboxForm}   >
            {deliveryPlan === "paid" && (
              <Ionicons name="checkmark" size={18} color="#22BCA0" className="font-bold" />
            )}
          </View>
          <Text style={styles.font} > لا </Text>
    </TouchableOpacity>
      

    </View>
</View>

<View className="mt-8 ">
<Text style={styles.textInput} className="text-lg block text-gray-700 font-bold mb-2" htmlFor="username">
     اختر طريقة التوصيل <Text className="text-red-500 text-base" > * </Text>  
  </Text>

    <View className="flex flex-col  mt-5" >

    <TouchableOpacity onPress={() => setDeliveryWay('tasharak') } className="flex flex-row items-center mx-2 mb-2" >
    <View style={styles.checkboxForm}>
            {deliveryWay === "tasharak" && (
              <Ionicons name="checkmark" size={18} color="#22BCA0" className="font-bold" />
            )}
          </View>
          <Text style={styles.font} > التوصيل عبر تشارك </Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => setDeliveryWay('myself') } className="flex flex-row items-center mx-2 mb-2" >
    <View style={styles.checkboxForm}>
            {deliveryWay === "myself" && (
              <Ionicons name="checkmark" size={18} color="#22BCA0" className="font-bold" />
            )}
          </View>
          <Text style={styles.font} > سأقوم بتوصيل الغرض بنفسي </Text>
    </TouchableOpacity>
      

    </View>
</View>

<View className="mt-8 flex flex-row items-center justify-between mx-2">
<View className="w-2/3 mx-2" >
<Text style={styles.textInput} className="text-lg  block text-gray-700 font-bold mb-2" htmlFor="username">
     هل ترغب باضافة مبلغ تأمين على غرضك  
  </Text>
</View>


  <View className="w-1/3 mx-2" >
  <TouchableOpacity onPress={toggleSwitch} style={[styles.switch , insuranceStatus ? styles.switchBgOn : styles.switchBgOff  ]}>
        <View style={[styles.switchToggle, insuranceStatus ? styles.switchToggleOn : styles.switchToggleOff]} />
      </TouchableOpacity>

      {insuranceStatus && (
        <View>

        <PricingInput state={insurancePrice} setState={setInsurancePrice} />
        </View>
      )}
      </View>
   
</View>

<View className="items-center flex-col mt-8 mb-8" >
          <TouchableOpacity
      className=" text-center rounded-full p-3"
      style={styles.button}
      onPress={() => handleNextStep() }
      >

      <Text style={styles.buttonText}> المتابعة  </Text>
      </TouchableOpacity>
          </View>


    </KeyboardAvoidingView>


      
  { /* CHOOSING CATEOGRIES */}
  


     
 
  { /* CHOOSING CATEOGRIES */}


</View>

{ /* END CHOOSING CATEGORY */ }

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
  textInput: {
    color: COLORS.Black,
    fontFamily: FONTFAMILY.font_medium,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  containerMargin: {
    paddingHorizontal: 25,
  },

  checkboxForm:{
    width: 25,
    height: 25,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderRadius: 500,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 4,
  },
  button: {
    borderColor: 'none',
    width: '85%',
    backgroundColor: COLORS.LightBLue,
  },
  buttonText: {
    fontFamily: FONTFAMILY.font_medium,
    fontSize: 16,
    fontWeight: 400,
    
    color: 'white',
    textAlign: 'center',
  },
  slider: {
    width: '100%',
    marginBottom: 20,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionContainer: {
    alignItems: 'center',
  },
  selectedOptionContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  optionTitle: {
    fontSize: 15,
    fontFamily: FONTFAMILY.font_light,
  },
  selectedOptionTitle: {
    fontFamily: FONTFAMILY.font_medium,
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.Blue
  },
  incButton: {
  
    backgroundColor: COLORS.Blue
  },
  minusButton: {
  
    backgroundColor: COLORS.Gray
  },
  circleButton: {
    width: 30,
    height: 30,
    borderRadius: 500,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 12
  },
  countTitle: {
    color: COLORS.LightBLue,
      fontFamily: FONTFAMILY.font_bold,
      fontWeight: 'bold',
  },
  inputStyle: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.Blue,
    backgroundColor: '#FAFAFA',
    textAlign: 'right',
  },
  buttonSubContainer: {
    backgroundColor: COLORS.LightBLue,
    borderRadius: 20,
  },
  errorText: {
    fontFamily: FONTFAMILY.font_regular,
      textAlign: 'right'
  },
  font: {
    fontFamily : FONTFAMILY.font_medium,
    fontWeight: 300
  },
  switch: {
    width: 60,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    padding: 2,
  },
  switchToggle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'white',
  },
  switchToggleOn: {
    backgroundColor:  COLORS.White,
    transform: [{ translateX: -28 }],
  },
  switchToggleOff: {
    backgroundColor: COLORS.White,
    transform: [{ translateX: 2 }],
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
  }

});

export default AddScreenDetails