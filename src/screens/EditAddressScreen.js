import { View, Text , SafeAreaView , StyleSheet , StatusBar  , TouchableOpacity , ScrollView , ActivityIndicator , TextInput  } from 'react-native'
import React , {useContext , useState , useEffect , useRef} from 'react'
import TopProfileNavigator from '../components/TopProfileNavigator';
import { FONTFAMILY , COLORS } from '../theme/theme';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Octicons from 'react-native-vector-icons/Octicons';
import { AppContext } from '../context/AppContext';
import * as Location from 'expo-location';
import { getDoc , doc , db   } from '../../firebase';


const EditAddressScreen = ({ navigation  , route }) => {

  const {  editAddress , setError , error   , success   } = useContext(AppContext);

  const [objectLocation , setObjectLocation] = useState({
    latitude: 24.68204,
    latitudeDelta: 27.499085419977938,
    longitude: 46.68725,
    longitudeDelta: 15.952148000000022,
  });

  const [draggableMarkerCoord, setDraggableMarkerCoord] = useState({
  });
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

  const handleEditAddress = () => {
    editAddress(savedLoocation , cityLoocation , streetLoocation , draggableMarkerCoord , route.params.addressId   );

    setTimeout(() => {
      navigation.navigate('MyAccountScreen');
     }, 3500);
 
  }

  useEffect(() => {
    const getInfoFromFireStore = async () => {
      setLoading(true);

      
      const docRef = doc(db, "products", route.params.productId );
      const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setSavedLocation(docSnap.data().address_name);
          setCityLocation(docSnap.data().address_city);
          setStreetLocation(docSnap.data().address_street);
          setDraggableMarkerCoord(docSnap.data().address_codinates);
          setObjectLocation(docSnap.data().address_codinates);
          setLoading(false);
        } 
    }
    getInfoFromFireStore();
  } , []);

  const scrollViewRef = useRef();
  
  return (
    
    <SafeAreaView style={styles.container} >

    <ScrollView
       
  ref={scrollViewRef}
  contentContainerStyle={{ flexGrow: 1 }} 
      >

    {!fullScreen  ? (
      <View>


<StatusBar translucent backgroundColor="black" />

{ /* CHOOSING CATEGORY */ }

      {loading ? (
        <View className="mt-8 mb-8" >
    <ActivityIndicator animating={true} color={'#007FB7'} />
    </View>
      ) : (
        <View style={styles.containerMargin} className="mt-10" >

        {error && (
        <>
          {scrollViewRef.current.scrollTo({ y: 0, animated: true })}
          <View className="p-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 text-right mb-5 flex items-start">
            <Text style={styles.errorText}>{error}</Text>
          </View>
        </>
      )}

        {success && (
          <>
          {scrollViewRef.current.scrollTo({ y: 0, animated: true })}
          <View className=" p-4  text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 text-right mb-5 flex items-start" >
            <Text style={styles.errorText}  >{success}</Text>
          </View>
          </>
        
        )}

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


<View className="mb-8">

    <Text style={styles.textInput} className="block text-lg text-gray-700 font-bold mb-5" htmlFor="username">
           المكان على الخريطة   <Text className="text-red-500 text-base" > * </Text>  
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

        <View className="mt-1 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 text-right  flex items-start" >
        <Text className="text-sm mb-2 text-center " syle={styles.errorText} >  فضلا قم بتحديد وسحب العلامة الخضراء على الخريطة    </Text>
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
      </View>
      )}


     
       
      </View>

    
         
        

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
    <View className="flex items-center mt-5" >
      <TouchableOpacity
      className="text-center rounded-full p-3"
      style={styles.button}
      onPress={() => handleEditAddress() }
      >

      <Text style={styles.buttonText}> تأكيد العنوان  </Text>
      </TouchableOpacity>
      </View>
  

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
    paddingBottom: 120,
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

});

export default EditAddressScreen;