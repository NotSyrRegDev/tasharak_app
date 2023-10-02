import { View, Text , SafeAreaView , StyleSheet , StatusBar , Image , TouchableOpacity , ScrollView , TextInput  , Modal  , KeyboardAvoidingView   , Keyboard , TouchableWithoutFeedback , ActivityIndicator} from 'react-native'
import React , {useContext , useState , useEffect , useRef} from 'react'
import { FONTFAMILY , COLORS, BORDERRADIUS, SPACING, FONTSIZE } from '../../../theme/theme';
import { AppContext } from '../../../context/AppContext';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TopStepCounter from '../../../components/TopStepCounter';
import TopStepNavigation from '../../../components/TopStepNavigation';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { FontAwesome } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import CategorySelect from '../../../components/CategorySelect';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { AdminContext } from '../../../context/AdminContext';
import {  query , collection , getDocs , db    } from "../../../../firebase";


const AddEvent = ({ navigation }) => {

  const [isLoading , setIsLoading] = useState(false);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('jwlat_user');
       let jsonPrsed = JSON.parse(value);
       setUserId(jsonPrsed.id);
      
      } catch (error) {
     
      }
    };

    getData();
  }, []);

  const [ actorsArray , setActorsArray ] = useState([]);

  useEffect(() => {
    const getActorsData = async () => {
      try {
        const q = query(collection(db, "tour_guides"));
        const querySnapshot = await getDocs(q);
        const actorsData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setActorsArray(actorsData);
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getActorsData();
  } , [])

  const {  setError , error  , categoryArray , citiesArray } = useContext(AppContext);

  const { addEvent   , setSucces , uploadImage } = useContext(AdminContext);

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

  const [loading ,setLoading] = useState(false);
  const [stepDesciption , setStepDescription ] = useState('اضافة المعلومات');
  const [currentStep , setCurrentStep ] = useState(1);
  const [productName , setProductName] = useState('');
  const [productDesc , setProductDesc] = useState('');
  const [eventIncludes , setEventIncludes] = useState('');
  const [eventNotIncludes , setEventNotIncludes] = useState('');
  const [eventMettingPoint , setEventMettingPoint] = useState({
    latitude: 24.68204,
    latitudeDelta: 0.0922,
    longitude: 46.68725,
    longitudeDelta: 0.0421,
  });;
  const [categoryName , setCateogryName] = useState('');
  const [productImages , setProductImages] = useState([]);
  const [eventProvider , setEventProvider] = useState('');
  const [eventCapacity , setEventCapacity] = useState(0);
  const [eventPrice , setEventPrice] = useState(0);
  const [eventDate , setEventDate] = useState(new Date());
  const [eventDuration , setEventDuration] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [selectedTourInfo , setSelectedTourInfo] = useState('');
  const [modalVisible , setModalVisible] = useState(false);
  const [cityModalVisible , setCityModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [tagsProductArray , setTagsProductArray] = useState([
    "فعالية" , "سياحة"  
  ]);
  const [eventDestination , setEventDestination] = useState('');
  const [selectedCity , setSelectedCity] = useState('');
  const [productTag , setProductTag] = useState('');


  const handleOverlayPress = () => {
    setModalVisible(false);
  };

  const handleSelectItem = (index , name) => {
    setSelectedItem(index);
    setCateogryName(name);
  };
  
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(() => {
    const currentDate = new Date();
    const newEndTime = new Date(currentDate.getTime() + (60 * 60 * 1000)); 
    return newEndTime;
  });

  useEffect(() => {
    const getPermissions = async () => {
  
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError("يرجى منح الاذن للوصول للموقع");
        setLoading(false);
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      const desiredZoomLevel = 10; 
      setObjectLocation({
        latitude: currentLocation.coords.latitude,
        latitudeDelta: 360 / Math.pow(2, desiredZoomLevel),
        longitude: currentLocation.coords.longitude,
        longitudeDelta: 15.952148000000022,
      })
      setDraggableMarkerCoord({
        longitude: currentLocation.coords.longitude,
        latitude: currentLocation.coords.latitude
      });
      setEventMettingPoint({
        longitude: currentLocation.coords.longitude,
        latitude: currentLocation.coords.latitude
      });
     
    };
    getPermissions();
  }, []);


  const [objectLocation , setObjectLocation] = useState({
    latitude: 24.68204,
    latitudeDelta: 0.0922,
    longitude: 46.68725,
    longitudeDelta: 0.0421,
  });

  const [draggableMarkerCoord, setDraggableMarkerCoord] = useState({
    longitude: 46.68725,
    latitude: 24.68204
  });

  const [meetingPoint, setMeetingPoint] = useState({
    longitude: 46.68725,
    latitude: 24.68204
  });

  const handleChooseImageThum = async () => {
    setLoading(true);
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      setError("يرجى اعطاء الاذن بالوصول للمعرض");
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
    });

    if (pickerResult.canceled === true) {
      setError("يرجى اكمال العملية");
    } else {
      const selectedUris = pickerResult?.assets?.map((image) => image.uri) || [];
      if (selectedUris.length > 0) {
        setLoading(true);
        setSucces("تمت اضافة الصور بنجاح");
        setSelectedImages((prevImages) => [...prevImages, ...selectedUris]);
        setLoading(false);
      }
     
    }
  };

  const handleRemoveImage = (index) => {
    setSelectedImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };

  const mapRef = useRef();


  const handleNextStep =  async () => {
    
    if (currentStep == 1) {
      if (productName !== '' && productDesc !== '' && categoryName !== ''   ) {
        setCurrentStep(2);
        setStepDescription('إضافة الموعد');
      }
      else {
        setError("يرجى ادخال جميع الحقول المطلوبة");
        setTimeout(() => {
          setError('');
        } , 3200)
      }
    }

    if (currentStep == 2) {
      if (eventDuration !== ''   ) {
        setCurrentStep(3);
        setStepDescription('اضافة العنوان');
      }else {
        setError("يرجى ادخال جميع الحقول المطلوبة");
        setTimeout(() => {
          setError('');
        } , 3200)
      }
    }

    if (currentStep == 3)  {
      setCurrentStep(4);
        setStepDescription('اضافة الصور');
    } 
   
    if (currentStep == 4 ) {
      if (selectedImages.length > 0) {
        setIsLoading(true);
        try {
          const uploadPromises = selectedImages.map((uri) => uploadImage(uri));
          const uploadedUrls = await Promise.all(uploadPromises);
          setUploadedImages((prevImages) => [...prevImages, ...uploadedUrls]);
          setProductImages(uploadedUrls);
          setIsLoading(false);
        

        } catch (error) {
          setError("حدث خطأ في تحميل الصور");
        }
      } 
      setCurrentStep(5);
      setStepDescription('اختيار التنظيم');
    }

    if (currentStep == 5) {
      setIsLoading(true);
      addEvent( productName , productDesc , categoryName , eventProvider , eventCapacity , eventPrice , eventDate , eventDuration , selectedCity , productImages , eventIncludes , eventNotIncludes , eventMettingPoint , eventDestination , tagsProductArray , draggableMarkerCoord , selectedTourInfo ,   () => {
        navigation.navigate('AdminTabs');
        setIsLoading(false);
      } );
    }
  }

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || timeDate;
    setEventDate(currentDate);
  };

  const handleStartTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || startTime;
    setStartTime(currentTime);
  };

  const handleEndTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || endTime;
    setEndTime(currentTime);
  };

  
  const handleAddTags = () => {
    if (productTag !== '') {
      setTagsProductArray(prevArray => [...prevArray, productTag]);
      setProductTag('');
    }
    else {
      setError("يرجى ادخال نص الدلالة")
    }
  
  };

  const scrollViewRef = useRef();
  Location.setGoogleApiKey("AIzaSyD5GUOMMrDY5Ml8JOQ5j7z7p9f8GaGCDBg");
  
  return (
    
    <SafeAreaView  >

      
<ScrollView
  ref={scrollViewRef}
  contentContainerStyle={{ flexGrow: 1 }} 
      >

    <View  style={[ styles.container , isKeyboardOpen ? styles.keyboardOn : '' ]}  >

<StatusBar translucent backgroundColor="black" />

    <View style={styles.topAreaHeadins}  >

    <TopStepNavigation navigation={navigation} />

    <View className="mt-12" >
    <TopStepCounter percentage={ (currentStep / 5) * 100 } step={currentStep} totalStep={5} headline={stepDesciption} />
    </View>

    </View>


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

      {currentStep == 1 && (
        <View>
        <View className="mb-8">

<Text style={styles.textInput} className="block text-gray-700 font-bold mb-3" htmlFor="username">
     اسم الفعالية <Text className="text-red-500 text-base" > * </Text>  
    </Text>
  <TextInput
  style={styles.inputStyle}
  className="appearance-none border rounded-xl w-full py-4 px-3 text-gray-700 leading-tight "
  id="title"
  placeholder="اكتب لنا اسم الفعالية"
      value={productName}
      onChangeText={(text) => setProductName(text) }
  />
  </View>

<View className="mb-8">

<Text style={styles.textInput} className="block text-gray-700 font-bold mb-3" htmlFor="username">
     وصف الفعالية <Text className="text-red-500 text-base" > * </Text>  
    </Text>
  <TextInput
  style={[styles.inputStyle , styles.inputAreaStyle]}
  className="appearance-none border rounded-xl w-full py-4 px-3 text-gray-700 leading-tight "
  id="descrition"
  multiline={true}
  numberOfLines={8}
  placeholder="عرفنا أكثر على الفعالية الي بتضيفها"
  autoCapitalize="none"
  value={productDesc}
  onChangeText={(text) => setProductDesc(text) }
  />
  </View>

  <View className="mb-8">

<Text style={styles.textInput} className="block text-gray-700 font-bold mb-3" htmlFor="username">
     تصنيف الفعالية <Text className="text-red-500 text-base" > * </Text>  
    </Text>
  <TouchableOpacity
  onPress={() => setModalVisible(!modalVisible)  }
  style={styles.inputStyle}
  className="appearance-none border rounded-xl w-full py-3 px-3 text-gray-700 leading-tight "
      editable={false}
    >
  <Text style={styles.font} className="text-left" > {categoryName} </Text>
  </TouchableOpacity>
  </View>

  <View  >
<Text style={styles.textInput} className="block text-gray-700 font-bold mb-2" htmlFor="username">
  دلالات الفعالية <Text className="text-red-500 text-base" > * </Text>  
</Text>

<View className="realtive" >

<View style={styles.inputBox} >
 
<TextInput
  style={styles.inputStyle}
  className="appearance-none border rounded-xl w-full py-4 px-3 text-gray-700 leading-tight "
  id="title"
  placeholder="اكتب لنا اسم الفعالية"
      value={productTag}
      onChangeText={(text) => setProductTag(text) }
  />
</View>

<View className="absolute top-2 right-8 " >

<TouchableOpacity
className="text-center rounded-full px-3 py-1"
style={styles.button}
onPress={() => handleAddTags() }
>

<Text style={styles.buttonText}> اضافة  </Text>
</TouchableOpacity>

</View>
</View>

</View>

<View className="mb-8 flex flex-row items-start justify-start flex-wrap mt-2" >
{tagsProductArray && tagsProductArray.map((item , index) => (
<View key={index} className="rounded-full w-24 mx-1 py-2 text-center mt-2" style={styles.buttonTag} >
<Text className="text-xs text-white " style={styles.buttonText} >  {item}  </Text>
</View>

)) }

</View>

        </View>
      )}

      {currentStep == 2 && (
        <View>

        <View className="mb-8">

    <Text style={styles.textInput} className="block text-gray-700 font-bold mb-3" htmlFor="username">
          مقدم الفعالية  <Text className="text-red-500 text-base" > * </Text>  
        </Text>
      <TextInput
      style={styles.inputStyle}
      className="appearance-none border rounded-xl w-full py-4 px-3 text-gray-700 leading-tight "
      id="title"
      placeholder="يرجى كتابة اسم الجهة المقدمة للفعالية"
          value={eventProvider}
          onChangeText={(text) => setEventProvider(text) }
      />
      </View>

      <View className="mb-8 " >
<Text style={styles.textInput} className="block text-gray-700 font-bold mb-2" htmlFor="username">
   عدد مقاعد الرحلة <Text className="text-red-500 text-base" > * </Text>  
</Text>

<View style={styles.inputBox} >
 
<TextInput
      style={styles.inputStyle}
      className="appearance-none border rounded-xl w-full py-4 px-3 text-gray-700 leading-tight "
   id="ticketSeat"
   value={eventCapacity}
   keyboardType="numeric"
   onChangeText={(text) => setEventCapacity(text)}
 />
</View>

    </View>

      <View className="mb-8 " >
<Text style={styles.textInput} className="block text-gray-700 font-bold mb-2" htmlFor="username">
   السعر لكل حجز <Text className="text-red-500 text-base" > * </Text>  
</Text>

<View style={styles.inputBox} >
 
<TextInput
      style={styles.inputStyle}
      className="appearance-none border rounded-xl w-full py-4 px-3 text-gray-700 leading-tight "
   id="ticketSeat"
   value={eventPrice}
   keyboardType="numeric"
   onChangeText={(text) => setEventPrice(text)}
 />
</View>

    </View>

        <View className="mb-8 " >
<Text style={styles.textInput} className="block text-gray-700 font-bold mb-2" htmlFor="username">
 مدة الفعالية بالساعات <Text className="text-red-500 text-base" > * </Text>  
</Text>

<View style={styles.inputBox} >
 
 <TextInput
       style={styles.inputStyle}
       className="appearance-none border rounded-xl w-full py-4 px-3 text-gray-700 leading-tight "
    id="ticketSeat"
    value={eventDuration}
    keyboardType="numeric"
    onChangeText={(text) => setEventDuration(text)}
  />
 </View>

</View>

        <View className="mb-8">

<Text style={styles.textInput} className="block text-gray-700 font-bold mb-3" htmlFor="username">
     تاريخ الفعالية <Text className="text-red-500 text-base" > * </Text>  
    </Text>

    <View className="mt-2 " style={styles.datePickerButton} >
   <DateTimePicker
        className=""
          value={eventDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
   </View>
  </View>


        </View>
      )}

      {currentStep == 3 && (
        <View  >

<Text style={styles.textInput} className="block text-lg text-gray-700 font-bold mb-3" htmlFor="username">
        تحديد المكان  <Text className="text-red-500 text-base" > * </Text>  
    </Text>


    <View
        className="py-2 rounded-lg text-sm px-4 w-full mb-4 flex flex-row items-center justify-between"
          style={styles.buttonBorder}
         >
          <View className="flex flex-row items-center" >
        
          <FontAwesome name="location-arrow" size={18} color={COLORS.Red} style={styles.starIcon} />
      <Text style={styles.buttonTextBorder}>  تحديد المكان  </Text>
          </View>

          <View>
          <FontAwesome name="check-circle" size={18} color={COLORS.Green} style={styles.starIcon} />
       
          </View>
        </View>

        <View className="mb-8">

<Text style={styles.textInput} className="block text-gray-700 font-bold mb-3" htmlFor="username">
      مدينة الفعالية  <Text className="text-red-500 text-base" > * </Text>  
    </Text>
    <TouchableOpacity
  onPress={() => setCityModalVisible(!cityModalVisible)  }
  style={styles.inputStyle}
  className="appearance-none border rounded-xl w-full py-3 px-3 text-gray-700 leading-tight "
      editable={false}
    >
  <Text style={styles.font} className="text-left" > {selectedCity} </Text>
  </TouchableOpacity>
  </View>


        <View className="mb-8">

<Text style={styles.textInput} className="block text-gray-700 font-bold mb-3" htmlFor="username">
       وجهة الفعالية  <Text className="text-red-500 text-base" > * </Text>  
    </Text>
  <TextInput
  style={styles.inputStyle}
  className="appearance-none border rounded-xl w-full py-4 px-3 text-gray-700 leading-tight "
  id="title"
  placeholder="يرجى كتابة وجهة الفعالية"
      value={eventDestination}
      onChangeText={(text) => setEventDestination(text) }
  />
  </View>
          <View  >
      <View className="mt-1 text-sm rounded-lg bg-green-50 text-right  flex items-start py-2 px-2" >
      <Text className="text-base text-center " style={styles.font} >  فضلا قم بتحديد وسحب العلامة الخضراء على الخريطة لتوضيح مكان الفعالية  </Text>
        </View>
      
      <View style={{ flex: 1 }}  className="h-96" >
      <MapView
      className="realtive"
      provider={PROVIDER_GOOGLE}
      ref={mapRef} 
      style={styles.map}
      initialRegion={{
        latitude: objectLocation.latitude,
      longitude: objectLocation.longitude,
      latitudeDelta: 0.01, 
       longitudeDelta: 0.01, 
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
      </View>
      
  </View>
      ) }

  {currentStep == 4 && (
    <View  >

<Text style={styles.textInput} className="block text-lg text-gray-700 font-bold mb-1" htmlFor="username">
     إضافة صور للتجربة 
    </Text>

    

  {selectedImages.length > 0 ? (
    <View  className="mt-3 mb-3 flex flex-row items-center justify-center flex-wrap">
  {selectedImages && selectedImages.map((uri, index) => (
    <View key={index} className="relative">
    <Image  source={{ uri }} className="rounded-lg" style={{ width: 110, height: 110 , margin: 5, }} />
    <TouchableOpacity style={{ backgroundColor: COLORS.Green }} className="absolute top-2 left-2  w-8 h-8  rounded-full flex items-center justify-center" onPress={() => handleRemoveImage(index) } >
  <AntDesignIcons
                name="closecircleo"
                color={'#fff'}
                size={22}
              />
    </TouchableOpacity>

    </View>
))}
</View>
  ) : (
      <View className="w-full  h-80" >
      <Image source={require('../../../assets/images/frames/image-frame.png')} style={styles.banner} className="mt-3 " />
      </View>
    
    )}

    <View className="flex items-center justify-center" >

    <TouchableOpacity
    onPress={() =>  handleChooseImageThum() }
    className="text-center rounded-full py-2 items-center flex w-2/3"
      style={[styles.buttonBorder , styles.opacity]}
     >
      <View className="flex-row items-center" >
      <Ionicons name="image-outline" size={22} color={COLORS.Red} style={styles.checkmark} />
      <Text style={styles.buttonTextBorder}>   إختيار الصور </Text>
      </View>
    </TouchableOpacity>

    </View>
 

   
  </View>
  ) }

  {currentStep == 5 && (
    <View  >

  <Text style={styles.textInput} className="block text-lg text-gray-700 font-bold mb-1" htmlFor="username">
    إختيار المرشد السياحي <Text className="text-red-500 text-base" > * </Text>  
    </Text>

    <View className="flex flex-row items-start flex-wrap justify-around mt-2 mx-2 mb-8" >
    {actorsArray  &&  actorsArray.length !== 0 ? actorsArray.map(({ tour_thum , id  , tour_language  , tour_name } , index) => (

      <TouchableOpacity key={index} onPress={() => setSelectedTourInfo({
        id , tour_thum , tour_name , tour_language
      }) } className="relative h-16 w-16 mt-5" >
    <Image className="h-16 w-16   object-cover rounded-full " source={ { uri: tour_thum  }}  resizeMode="cover" />
  <View className="absolute top-1 -translate-y-2 right-1 bg-white rounded-full p-1" >
  {selectedTourInfo?.id == id && (
    <Ionicons name={`checkmark-circle`} size={18} color={COLORS.Green} className="font-bold" />
  ) }
   </View>
    </TouchableOpacity>

))  : (
     <View className="mb-5 mt-5" >
    <ActivityIndicator size={'large'} color={COLORS.DarkRed} />
      </View>
)}

    </View>

    <View className="mb-8">
    <Text style={styles.textInput} className="block text-gray-700 font-bold mb-3" htmlFor="username">
      الفعالية تحتوي على   
    </Text>
  <TextInput
  style={[styles.inputStyle , styles.inputAreaStyle]}
  className="appearance-none border rounded-xl w-full py-4 px-3 text-gray-700 leading-tight "
  id="descrition"
  multiline={true}
  numberOfLines={8}
  placeholder="تكلم عن الاشياء التي تحتويها الفعالية"
  autoCapitalize="none"
  value={eventIncludes}
  onChangeText={(text) => setEventIncludes(text) }
  />
  </View>

    <View className="mb-8">
    <Text style={styles.textInput} className="block text-gray-700 font-bold mb-3" htmlFor="username">
      الفعالية لا تحتوي على   
    </Text>
  <TextInput
  style={[styles.inputStyle , styles.inputAreaStyle]}
  className="appearance-none border rounded-xl w-full py-4 px-3 text-gray-700 leading-tight "
  id="descrition"
  multiline={true}
  numberOfLines={8}
  placeholder="تكلم عن الاشياء التي لا تحتويها الفعالية"
  autoCapitalize="none"
  value={eventNotIncludes}
  onChangeText={(text) => setEventNotIncludes(text) }
  />
  </View>

    <View className="mb-8">
    <Text style={styles.textInput} className="block text-gray-700 font-bold mb-3" htmlFor="username">
    تحديد نقطة الالتقاء
    </Text>

    <View  >
      <View className="mt-1 text-sm rounded-lg bg-green-50 text-right  flex items-start py-2 px-2" >
      <Text className="text-base text-center " style={styles.font} >  فضلا قم بتحديد وسحب العلامة الخضراء على الخريطة لتوضيح نقطة الالتقاء  </Text>
        </View>

        <View style={{ flex: 1 }}  className="h-96" >
      <MapView
      className="realtive"
      provider={PROVIDER_GOOGLE}
      ref={mapRef} 
      style={styles.map}
      initialRegion={{
        latitude: objectLocation.latitude,
      longitude: objectLocation.longitude,
      latitudeDelta: 0.01, 
       longitudeDelta: 0.01, 
      }}
      >
      <Marker
      draggable
      pinColor="#22BC9F"
      coordinate={eventMettingPoint}
      onDragEnd={(e) => setEventMettingPoint(e.nativeEvent.coordinate)}
      tooltip={true}
      >
      <Callout>
        <Text style={styles.font}>هذه المكان الذي سيظهر للمستخدمين</Text>
      </Callout>
      </Marker>


      </MapView>

      </View>
      
    
      </View>
  </View>
  </View>
  ) }

  <View className="items-center flex-col mt-8 mb-8" >
    {isLoading ? (
    
    <View className="mb-5 mt-5" >
    <ActivityIndicator size={'large'} color={COLORS.DarkRed} />
      </View>
    ) : (
      <TouchableOpacity
      className=" text-center rounded-full w-2/3 py-1 px-1"
      style={styles.button}
      onPress={() => handleNextStep() }
      >
      {currentStep == 5 ?(
        <Text style={styles.buttonText}> إضافة الفعالية  </Text>
      ):(
        <Text style={styles.buttonText}> المتابعة  </Text>
      )}

      </TouchableOpacity>
    )}

     
      </View>
      
    </KeyboardAvoidingView>

</View>

</View>


    <Modal transparent={true} visible={modalVisible} animationType="slide">
    <TouchableWithoutFeedback onPress={handleOverlayPress}>

    <View style={styles.modalContainer}  >
    <ScrollView style={{ maxHeight: '80%' }}>
      <View style={styles.modalContent} className="relative " >

      <View className="flex flex-col items-center justify-between "  >
        
      <Text className="text-lg" style={styles.font} > اختر التصنيف  </Text>

      <View className="flex mt-8" >
        
      {categoryArray &&
            categoryArray.map(({ id, category_name, category_image }, index) => (
              <CategorySelect
                key={id}
                title={category_name}
                image={category_image}
                index={index}
                handleSelectItem={() => handleSelectItem(index , category_name)}
                selectedItem={selectedItem}
              />
            ))}

          

      </View>
      <TouchableOpacity
          className="mt-8 w-full pb-5 text-center rounded-full p-3"
          style={styles.button}
          onPress={() => {
      setModalVisible(!modalVisible);
    }} 
          >

          <Text style={styles.buttonText}> المتابعة  </Text>
          </TouchableOpacity>

      </View>

    <View className="absolute top-5 left-5" >
    <TouchableOpacity onPress={() => {
      setModalVisible(!modalVisible);
    }} >
    <AntDesignIcons name="close" size={22} color={COLORS.Black} />
    </TouchableOpacity>
    </View>

      </View>
      </ScrollView>
    </View>

    </TouchableWithoutFeedback>

    </Modal>

      <Modal transparent={true} visible={cityModalVisible} animationType="slide">
        <TouchableWithoutFeedback onPress={() => setCityModalVisible(!cityModalVisible) } >

        <View style={styles.modalContainer}  >
<ScrollView style={{ maxHeight: '80%' }}>
  <View style={styles.modalContent} className="relative " >
      <View className="flex flex-col items-center justify-between "  >
      <Text className="text-lg" style={styles.font} > اختر التصنيف  </Text>

      <View className="flex mt-8" >
        
      {citiesArray && citiesArray.map((item) => (
            <TouchableOpacity onPress={() => {
              setSelectedCity(item.city_name)
            }}
            key={item.city_name}
            className="flex flex-row  w-60 items-center justify-between mt-5" >
            {selectedCity == item.city_name  ? (
              <Fontisto
                        name="checkbox-active"
                        color={COLORS.DarkRed}
                        size={FONTSIZE.size_18}
                      />
            ) : (
              <Fontisto
                        name="checkbox-passive"
                        color={COLORS.Black}
                        size={FONTSIZE.size_18}
                      />
            )}

          <Text className="text-black text-base" style={styles.font} > {item.city_name} </Text>
          </TouchableOpacity>
          ))  }

      </View>
      <TouchableOpacity
          className="mt-8 w-full pb-5 text-center rounded-full py-1 px-1"
          style={styles.button}
          onPress={() => {
      setCityModalVisible(!cityModalVisible);
    }} >
   <Text style={styles.buttonText}> المتابعة  </Text>
          </TouchableOpacity>

      </View>

      <View className="absolute top-5 left-5" >
      <TouchableOpacity onPress={() => {
        setCityModalVisible(!cityModalVisible);
      }} >
      <AntDesignIcons name="close" size={22} color={COLORS.Black} />
      </TouchableOpacity>
      </View>

        </View>
  </ScrollView>
</View>
        </TouchableWithoutFeedback>

      </Modal>


    </ScrollView>
      
  

    </SafeAreaView>
  )
}


const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    minWidth: '100%',
    fontSize: 16,
    fontFamily: FONTFAMILY.tajawal,
    color: COLORS.Black,
    paddingVertical: SPACING.space_8,
    paddingHorizontal: SPACING.space_32,
    borderWidth: 2,
    borderColor: '#e9e9e9',
    borderRadius: BORDERRADIUS.radius_25,
    textAlign: 'right',
    paddingRight: 30, 
  },
  inputAndroid: {
    minWidth: '100%',
    fontSize: 16,
    fontFamily: FONTFAMILY.tajawal,
    color: COLORS.White,
    paddingVertical: SPACING.space_8,
    paddingHorizontal: SPACING.space_32,
    borderWidth: 2,
    borderColor: COLORS.WhiteRGBA15,
    borderRadius: BORDERRADIUS.radius_25,
    textAlign: 'right',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});


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
    fontFamily: FONTFAMILY.cairo,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  containerMargin: {
    paddingHorizontal: 20,
  },

  button: {
    borderColor: 'none',
    backgroundColor: COLORS.Red,
  },
  buttonText: {
    fontFamily: FONTFAMILY.cairo,
    fontSize: 14,
    fontWeight: 400,
    
    color: 'white',
    textAlign: 'center',
  },
  inputStyle: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#DADADA',
    backgroundColor: '#FAFAFA',
    textAlign: 'right',
  },
  inputAreaStyle: {
    textAlignVertical: 'top',
    height: 150, 
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingBottom: 25,
   
  },
  modalContent: {
    borderRadius: 10,
    minWidth: '79%',
    padding: 20,
    backgroundColor: COLORS.White,
  },
  font: {
    fontFamily: FONTFAMILY.cairo
  },
  errorText: {
    fontFamily: FONTFAMILY.cairo,
    textAlign: 'right',
  },
  keyboardOn: {
    paddingBottom: 150,
  },
  topAreaHeadins: {
   
    paddingHorizontal: 20,
  },
  datePickerButton: {
    minWidth: '100%',
    fontSize: 14,
    fontFamily: FONTFAMILY.tajawal,
    color: COLORS.White,
    borderWidth: 2,
    borderColor: '#e9e9e9',
    borderRadius: BORDERRADIUS.radius_25,
    textAlign: 'right',
    paddingRight: 0, 
  },
  timePickerButton: {
    backgroundColor: '#f9f9f9',
    color: COLORS.White,
    fontFamily: FONTFAMILY.tajawal_bold,
    color: 'white',
  },
  buttonBorder: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.DarkRed,
    borderRadius: BORDERRADIUS.radius_25,
  },
  buttonTextBorder: {
    fontFamily: FONTFAMILY.tajawal,
    fontSize: 15,
    color: COLORS.Black,
    textAlign: 'center',
  },

  opacity: {
    opacity: 1,
  },
  map: {
    marginTop: 30,
    width:'100%',
    height: '95%',
  },
  banner: {
    width: '100%',
    height: '75%'
  },
  buttonTag: {
    borderColor: 'none',
    backgroundColor: COLORS.DarkRed,
    opacity: 0.6
  },


});

export default AddEvent