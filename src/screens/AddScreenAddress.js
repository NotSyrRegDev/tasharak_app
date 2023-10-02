import { View, Text , SafeAreaView , StyleSheet , StatusBar  , TouchableOpacity , ScrollView , ActivityIndicator , TextInput  } from 'react-native'
import React , {useContext , useState , useEffect , useRef} from 'react'
import TopProfileNavigator from '../components/TopProfileNavigator';
import { FONTFAMILY , COLORS } from '../theme/theme';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Octicons from 'react-native-vector-icons/Octicons';
import { AppContext } from '../context/AppContext';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';


const AddScreenAddress = ({ navigation }) => {

  const [user, setUser] = useState(null);
  const {  setProductLocation , setError , error  , draggableMarkerCoord , objectLocation  , setDraggableMarkerCoord , setProductLocationDetails , findMyAddresses , myFoundedAddresses  } = useContext(AppContext);

  const [chooseLocation , setChooseLocation] = useState('auto');
  const [loading ,setLoading] = useState(false);
  const [fullScreen , setFullScreen] = useState(false);
  const [addressId  ,setAddressId] = useState('');
  const [cityLocation  ,setCityLocation] = useState('');
  const [districyLocation  ,setDistricyLocation] = useState('');
  const [streetLocation  ,setStreetLocation] = useState('');

  Location.setGoogleApiKey("AIzaSyD5GUOMMrDY5Ml8JOQ5j7z7p9f8GaGCDBg");
    const mapRef = useRef();

  const handleFullScreenMap = () => {
    setFullScreen(!fullScreen);
  }

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const value = await AsyncStorage.getItem('tashark_user');
        let jsonPrsed = JSON.parse(value);
        setUser(jsonPrsed);
        findMyAddresses(jsonPrsed.id);
        setLoading(false);
      } catch (error) {
   
      }
    };

    getData();
  }, [user?.id]);

  const handleNextStep = () => {
  
    if (cityLocation !== '' && districyLocation !== ''   ) { 
      setProductLocation(draggableMarkerCoord);
      setProductLocationDetails({
        cityLocation,
        districyLocation,
        streetLocation
      })
      navigation.navigate('AddScreenSuccess')
    }
    else {
      setError("يرجى ادخال جميع الحقول المطلوبة");
      setTimeout(() => {
        setError('');
      } , 3200)
    }
  }


  const handleChooseAddress = (id ,   address_districty , address_street , address_city ) => {
    setAddressId(id);
    setCityLocation(address_city);
    setDistricyLocation(address_districty);
    setStreetLocation(address_street);
  }
  
  return (
    
    <SafeAreaView style={styles.container} >

    <ScrollView>
    {!fullScreen  ? (
      <View>


<StatusBar translucent backgroundColor="black" />


{ /* CHOOSING CATEGORY */ }
<View style={styles.containerMargin} className="mt-10" >

  {error && (
            <View className=" p-4  text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 text-right mb-5 flex items-start" >
              <Text style={styles.errorText}  >{error}</Text>
            </View>
          )}

  <Text style={styles.font} className="text-lg text-left mb-5" > اختيار العنوان  </Text>

  {chooseLocation == 'auto' ? (

    <View className="flex items-start relative mb-8" style={styles.topAreaHeadins}>
  {!loading ? (
    myFoundedAddresses && myFoundedAddresses.length !== 0 ? (
      myFoundedAddresses.map(({id , address_name , address_street , address_city , address_districty }) => (
        <TouchableOpacity
        onPress={() => {
               handleChooseAddress( id , address_districty , address_street , address_city  )
              }}
          className="bg-white mt-8 px-4 py-6 flex flex-col items-start w-full rounded-xl"
          style={styles.box}
          key={id}
        >
          <Text style={styles.fontBold} className="text-base">
           {address_name}
          </Text>

          <Text style={styles.font} className="text-base mt-6 text-gray-300">
           {address_street}
          </Text>
          <Text style={styles.font} className="text-base mt-1 text-gray-300">
          {address_city}
          </Text>

          <View className="absolute top-5 right-5">
            
            {addressId == id && (
              <AntDesignIcons name="checkcircle" size={25} color="#007FB7" />
            )}
          </View>
        
        </TouchableOpacity>
      ))
    ) : (
      <View className="mt-8 mb-8" >
    <ActivityIndicator animating={true} color={'#007FB7'} />
    </View>
    )
  ) : (
    <View
      className="mt-5 text-center rounded-full p-3"
      style={styles.borderButton}
      >

<Text style={styles.font} className="text-black text-center" > لم نستطع العثور على اية عناوين  </Text>
      </View>
  )}

      <View className="flex items-center justify-center " >
      <TouchableOpacity
      className="mt-5 text-center rounded-full p-3"
      style={styles.borderButton}
      onPress={() => setChooseLocation('manual') }
      >

<Text style={styles.font} className="text-black text-center" >   كتابة العنوان يدوي  </Text>
      </TouchableOpacity>
  </View>

</View>
  ) : (
    <View> 

    <View className="mb-8">

<Text style={styles.textInput} className="block text-gray-700 font-bold mb-3" htmlFor="username">
     المدينة <Text className="text-red-500 text-base" > * </Text>  
    </Text>
  <TextInput
  style={styles.inputStyle}
  className="appearance-none border rounded-xl w-full py-4 px-3 text-gray-700 leading-tight "
  id="title"
  placeholder="أكتب اسم المدينة المتوافر فيها الغرض"
      value={cityLocation}
      onChangeText={(text) => setCityLocation(text) }
  />
  </View>

<View className="mb-8">

<Text style={styles.textInput} className="block text-gray-700 font-bold mb-3" htmlFor="username">
     الحي <Text className="text-red-500 text-base" > * </Text>  
    </Text>
  <TextInput
  style={styles.inputStyle}
  className="appearance-none border rounded-xl w-full py-4 px-3 text-gray-700 leading-tight "
  id="title"
  placeholder="أكتب اسم الحي المتوافر فيها الغرض"
      value={districyLocation}
      onChangeText={(text) => setDistricyLocation(text) }
  />
  </View>

<View className="mb-8">

<Text style={styles.textInput} className="block text-gray-700 font-bold mb-3" htmlFor="username">
     الشارع 
    </Text>
  <TextInput
  style={styles.inputStyle}
  className="appearance-none border rounded-xl w-full py-4 px-3 text-gray-700 leading-tight "
  id="title"
  placeholder="أكتب اسم الشارع المتوافر فيها الغرض"
      value={streetLocation} 
      onChangeText={(text) => setStreetLocation(text) }
  />
  </View>

  <View className="flex items-center justify-center " >
      <TouchableOpacity
      className="mt-2 mb-8 text-center rounded-full p-3"
      style={styles.borderButton}
      onPress={() => setChooseLocation('auto') }
      >

<Text style={styles.font} className="text-black text-center" >    اختيار عنوان من المحفوظة   </Text>
      </TouchableOpacity>
  </View>

    </View>
  )}






<View className="mb-8">

    <Text style={styles.textInput} className="block text-lg text-gray-700 font-bold mb-5" htmlFor="username">
           عنوان الغرض  <Text className="text-red-500 text-base" > * </Text>  
        </Text>

       {loading ? (
        <View className="mt-8 mb-8" >
        <ActivityIndicator animating={true} color={'#007FB7'} />
        </View>
       ) : (
        <View  >

        <View className="mt-1 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 text-right  flex items-start" >
        <Text className="text-sm mb-2 text-center " syle={styles.errorText} >  فضلا قم بتحديد وسحب العلامة الخضراء على الخريطة لتوضيح مكان تواجد الغرض  </Text>
          </View>
         
      <View style={{ flex:1 }}  className="h-40" > 
      <MapView
        className="realtive"
         onPress={handleFullScreenMap}
        provider={PROVIDER_GOOGLE}
        ref={mapRef} 
        style={styles.map}
        initialRegion={{
      latitude: objectLocation.latitude,
    latitudeDelta: 0.0922,
    longitude: objectLocation.longitude,
    longitudeDelta: 0.0421,
    }}
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
      </View>

      <View className="flex items-center mt-5" >
      <TouchableOpacity
      className="text-center rounded-full p-3"
      style={styles.button}
      onPress={() => handleNextStep() }
      >

      <Text style={styles.buttonText}> تأكيد العنوان  </Text>
      </TouchableOpacity>
      </View>

      </View>
      )}


     
       
      </View>

    
         
        

</View>

{ /* END CHOOSING CATEGORY */ }

</View>
) :(
  <View style={styles.container} >
  <MapView
   
  className="realtive"
        provider={PROVIDER_GOOGLE}
        ref={mapRef} 
        style={styles.fullMap}
        initialRegion={{
      latitude: objectLocation.latitude,
    latitudeDelta: 0.0922,
    longitude: objectLocation.longitude,
    longitudeDelta: 0.0421,
    }}
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
    height: '75%'
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
  box: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  fontBold: {
    fontFamily: FONTFAMILY.font_semi_bold,
  },
  borderButton: {
    borderWidth: 1,
    borderRadius: 400,
    borderColor: COLORS.LightBLue,
    backgroundColor: 'transparent',
    
  },

});

export default AddScreenAddress;