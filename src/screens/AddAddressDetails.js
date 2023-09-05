import { View, Text , SafeAreaView , StyleSheet , StatusBar  , TouchableOpacity , ScrollView , ActivityIndicator , TextInput , Keyboard , KeyboardAvoidingView  } from 'react-native'
import React , {useContext , useState , useEffect , useRef} from 'react'
import TopProfileNavigator from '../components/TopProfileNavigator';
import { FONTFAMILY , COLORS } from '../theme/theme';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Octicons from 'react-native-vector-icons/Octicons';
import { AppContext } from '../context/AppContext';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';


const AddAddressDetails = ({ navigation }) => {

  const [isKeyboardOpen, setKeyboardOpen] = useState(false);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow);
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', handleKeyboardDidHide);

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleKeyboardDidShow = () => {
    setKeyboardOpen(true);
  };

  const handleKeyboardDidHide = () => {
    setKeyboardOpen(false);
  };

    useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('tashark_user');
       let jsonPrsed = JSON.parse(value);
       setUserId(jsonPrsed.id);
      
      } catch (error) {
      
      }
    };

    getData();
  }, []);

  const [stepOne , setStepOne] = useState(true);
  const [stepTwo , setStepTwo] = useState(false);

  const {   setError , error   , addAddress , success  } = useContext(AppContext);

  const [draggableMarkerCoord, setDraggableMarkerCoord] = useState({
    longitude: 46.68725,
    latitude: 24.68204
  });

  const [objectLocation , setObjectLocation] = useState({
    latitude: 24.68204,
    latitudeDelta: 27.499085419977938,
    longitude: 46.68725,
    longitudeDelta: 15.952148000000022,
  });

  useEffect(() => {
    const getPermissions = async () => {
      setLoading(true);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError("يرجى منح الاذن للوصول للموقع");
        setLoading(false);
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
     
      const desiredZoomLevel = 10; // Adjust this as needed
      setObjectLocation({
        latitude: currentLocation.coords.latitude,
        latitudeDelta: 360 / Math.pow(2, desiredZoomLevel),
        longitude: currentLocation.coords.longitude,
        longitudeDelta: 15.952148000000022,
      })

      // Set initial draggable marker coordinate to user's location
      setDraggableMarkerCoord({
        longitude: currentLocation.coords.longitude,
        latitude: currentLocation.coords.latitude
      });
      setLoading(false);
    };
    getPermissions();
  }, []);

  const [ savedLoocation , setSavedLocation ] = useState('');
  const [ cityLoocation , setCityLocation ] = useState('');
  const [ streetLoocation , setStreetLocation ] = useState('');

  const [loading ,setLoading] = useState(false);
  const [fullScreen , setFullScreen] = useState(false);

  Location.setGoogleApiKey("AIzaSyD5GUOMMrDY5Ml8JOQ5j7z7p9f8GaGCDBg");
    const mapRef = useRef();

  const handleFullScreenMap = () => {
    setFullScreen(!fullScreen);
  }

  const handleAddAddress =  () => {
    addAddress(savedLoocation , cityLoocation , streetLoocation , draggableMarkerCoord , userId);

    setTimeout(() => {
      navigation.navigate('MyAccountScreen');
     }, 3500);
  }

  const clearError = () => {
    setTimeout(() => {
      setError('');
    } , 1800)
  }

  const handleNextStep = () => {

    if (savedLoocation == '') {
      setError("يرجى ادخال اسم العنوان المحفوظ");
      clearError();
    }

    if (cityLoocation == '') {
      setError("يرجى ادخال المدينة");
      clearError();
    }

    if (streetLoocation == '') {
      setError("يرجى ادخال الشارع");
      clearError();
    }
    if ( savedLoocation !== '' && cityLoocation !== '' && streetLoocation !== ''   ) {
      setStepOne(!stepOne);
      setStepTwo(!stepTwo);
    }

  }
  
  return (
    
    <SafeAreaView style={[styles.container ,  isKeyboardOpen ? styles.keyboardOn : '' ]} >

    <ScrollView>
    {!fullScreen  ? (
      <View>


<StatusBar translucent backgroundColor="black" />


{ /* TOP HEADER TEXT */ }
<TopProfileNavigator navigation={navigation} text={"إضافة عنوان"} />

{ /* CHOOSING CATEGORY */ }

    {stepOne && (
      <View style={styles.containerMargin} className="mt-10" >

      {error && (
      <View className=" p-4  text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 text-right mb-5 flex items-start" >
        <Text style={styles.errorText}  >{error}</Text>
      </View>
    )}

    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >

<View className="mb-8">

<Text style={styles.textInput} className="block text-gray-700 font-bold mb-3" htmlFor="username">
     اسم العنوان <Text className="text-red-500 text-base" > * </Text>  
    </Text>
  <TextInput
  style={styles.inputStyle}
  className="appearance-none border rounded-xl w-full py-4 px-3 text-gray-700 leading-tight "
  id="title"
  placeholder="منزلي"
      value={savedLoocation}
      onChangeText={(text) => setSavedLocation(text) }
  />
  </View>

<View className="mb-8">

<Text style={styles.textInput} className="block text-gray-700 font-bold mb-3" htmlFor="username">
     المدينة  <Text className="text-red-500 text-base" > * </Text>  
    </Text>
  <TextInput
  style={styles.inputStyle}
  className="appearance-none border rounded-xl w-full py-4 px-3 text-gray-700 leading-tight "
  id="title"
  placeholder="قم بادخل المدينة"
      value={cityLoocation}
      onChangeText={(text) => setCityLocation(text) }
  />
  </View>

<View className="mb-8">

<Text style={styles.textInput} className="block text-gray-700 font-bold mb-3" htmlFor="username">
     الشارع  <Text className="text-red-500 text-base" > * </Text>  
    </Text>
  <TextInput
  style={styles.inputStyle}
  className="appearance-none border rounded-xl w-full py-4 px-3 text-gray-700 leading-tight "
  id="title"
  placeholder="قم بادخل الشارع"
      value={streetLoocation}
      onChangeText={(text) => setStreetLocation(text) }
  />
  </View>

  </KeyboardAvoidingView>



  <View className="flex items-center" >
          <TouchableOpacity
      className="text-center rounded-full p-3"
      style={styles.button}
      onPress={() => handleNextStep()  }
      >

      <Text style={styles.buttonText}>  تحديد المكان على الخريطة  </Text>
      </TouchableOpacity>
          </View>


</View>
    )}

    {stepTwo && (
      <View className="mb-8 mt-8" style={styles.containerMargin} >

<Text style={styles.textInput} className="block text-lg text-gray-700 font-bold mb-5" htmlFor="username">
        تحديد المكان  <Text className="text-red-500 text-base" > * </Text>  
    </Text>

    {error && (
      <View className=" p-4  text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 text-right mb-5 flex items-start" >
        <Text style={styles.errorText}  >{error}</Text>
      </View>
    )}


   {loading ? (
    <View className="mt-8 mb-8" >
    <ActivityIndicator animating={true} color={'#007FB7'} />
    </View>
   ) : (
    <View  >

    {success && (
          <View className=" p-4  text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 text-right mb-5 flex items-start" >
            <Text style={styles.errorText}  >{success}</Text>
          </View>
        )}


    <View className="mt-1 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 text-right  flex items-start" >
    <Text className="text-sm mb-2 text-center " syle={styles.errorText} >  فضلا قم بتحديد وسحب العلامة الخضراء على الخريطة لتوضيح مكان تواجد الغرض  </Text>
      </View>
     
    <MapView
    className="realtive"
     onPress={handleFullScreenMap}
    provider={PROVIDER_GOOGLE}
    ref={mapRef} 
    style={styles.map}
    initialRegion={objectLocation}
  >
  <Marker
    draggable
    pinColor="#22BC9F"
    coordinate={draggableMarkerCoord}
    onDragEnd={(e) => setDraggableMarkerCoord(e.nativeEvent.coordinate)}
    tooltip={true}
  >
    <Callout>
      <Text style={styles.font}>هذه المكان الذي سيظهر للمستخدمين</Text>
    </Callout>
  </Marker>

    
  </MapView>

  <View className="flex items-center mt-5" >

  <TouchableOpacity
  className="text-center rounded-full p-2 mb-5"

  onPress={() => handleNextStep() }
  >

  <Text style={styles.exploreButtonText}> الرجوع   </Text>
  </TouchableOpacity>

  <TouchableOpacity
  className="text-center rounded-full p-2"
  style={styles.button}
  onPress={() => handleAddAddress() }
  >

  <Text style={styles.buttonText}> تأكيد العنوان  </Text>
  </TouchableOpacity>
  </View>

  </View>
  )}

  </View>

    )}


{ /* END CHOOSING CATEGORY */ }

</View>
) :(
  <View style={styles.container} >
  <MapView
   
  className="realtive"
        provider={PROVIDER_GOOGLE}
        ref={mapRef} 
        style={styles.fullMap}
        initialRegion={objectLocation}
      >

    <Marker
      draggable
      pinColor="#22BC9F"
      coordinate={draggableMarkerCoord}
      onDragEnd={(e) => setDraggableMarkerCoord(e.nativeEvent.coordinate)}
    >
      <Callout>
        <Text>هذه المكان الذي سيظهر للمستخدمين</Text>
      </Callout>
    </Marker>

       <TouchableOpacity onPress={() => handleFullScreenMap() } className="absolute top-2 right-2 w-12 h-12 rounded-lg  bg-white flex items-center justify-center shadow-lg" >
      
      <Octicons name="screen-full" size={26} color="#007FB7" />
     
      </TouchableOpacity>
       
      </MapView>
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
  textInput: {
    color: COLORS.Black,
    fontFamily: FONTFAMILY.font_medium,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  containerMargin: {
    paddingHorizontal: 25,
  },
 
  button: {
    borderColor: 'none',
    width: '85%',
    backgroundColor: COLORS.LightBLue,
    
  },
  buttonText: {
    fontFamily: FONTFAMILY.font_medium,
    fontSize: 18,
    fontWeight: 400,
    
    color: 'white',
    textAlign: 'center',
  },
  banner: {
    resizeMode: 'contain',
    marginTop: -20,
    maxWidth: '100%',
  },
  opacity: {
    opacity: 1,
  },
  map: {
    marginTop: 30,
    width:'100%',
    height: '55%',
  },
  fullMap: {
    width:'100%',
    height: '100%'
  },
  mapOverlay: {
    position: "absolute",
    bottom: 50,
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderRadius: 5,
    padding: 16,
    left: "25%",
    width: "50%",
    textAlign: "center"
  },
  font: {
    fontFamily: FONTFAMILY.font_regular
  },
  errorText: {
    fontFamily: FONTFAMILY.font_regular,
      textAlign: 'right'
  },
  inputStyle: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#DADADA',
    backgroundColor: '#FAFAFA',
    textAlign: 'right',
  },
  exploreButtonText:{
    fontFamily: FONTFAMILY.font_bold,
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.Blue,
    textAlign: 'center',
  },
  keyboardOn: {
    paddingBottom: 150,
  },

});

export default AddAddressDetails;