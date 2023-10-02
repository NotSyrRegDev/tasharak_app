import { View, Text , SafeAreaView , StyleSheet , StatusBar , TouchableOpacity   , KeyboardAvoidingView , ScrollView , TextInput , ActivityIndicator , Platform , Keyboard , Image} from 'react-native'
import React, { useContext , useState , useEffect , useRef } from 'react'
import { FONTFAMILY , COLORS } from '../theme/theme';
import Ionicons from '@expo/vector-icons/Ionicons';
import TopProfileNavigator from '../components/TopProfileNavigator'; 
import Slider from '@react-native-community/slider';
import DaysInput from '../components/DaysInput';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import PricingInput from '../components/PricingInput';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { getDoc , doc , db   } from '../../firebase';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import { AppContext } from '../context/AppContext';


const EditProductScreen = ({ navigation , route }) => {

  const [loading ,setLoading] = useState(false);

  const [isKeyboardOpen, setKeyboardOpen] = useState(false);
  const [productName , setProductName] = useState('');
  const [productDesc , setProductDesc] = useState('');
  const [categoryName , setCateogryName] = useState('');
  const [productTag , setProductTag] = useState('');
  const [modalVisible , setModalVisible] = useState(false);
  const [tagsProductArray , setTagsProductArray] = useState([]);
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
  const [selectedImages, setSelectedImages] = useState([]);
  const [fullScreen , setFullScreen] = useState(false);

  const [cityLocation  ,setCityLocation] = useState('');
  const [districyLocation  ,setDistricyLocation] = useState('');
  const [streetLocation  ,setStreetLocation] = useState('');
  const [productAvaliable  ,setProductAvaliable] = useState(true);

  const [draggableMarkerCoord, setDraggableMarkerCoord] = useState({
    longitude: 46.68725,
    latitude: 24.68204
  });

  const [objectLocation , setObjectLocation] = useState({
    latitude: 24.68204,
    latitudeDelta: 0.0922,
    longitude: 46.68725,
    longitudeDelta: 0.0421,
  });



  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow);
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', handleKeyboardDidHide);

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const mapRef = useRef();

  const handleKeyboardDidShow = () => {
    setKeyboardOpen(true);
  };

  const handleKeyboardDidHide = () => {
    setKeyboardOpen(false);
  };

  const toggleSwitch = () => {
    setInsuranceStatus(!insuranceStatus);
  };

  const toggleSwitchAvaliable = () => {
    setProductAvaliable(!productAvaliable);
  };

  const handleFullScreenMap = () => {
    setFullScreen(!fullScreen);
  }

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


  const {     error , success , editProduct  } = useContext(AppContext);


  const handleEditProduct = () => {

    editProduct(productName , productDesc , categoryName , tagsProductArray , productCase , productCount , dailyRentPrice , weekRentPrice , monthlyRentPrice , minRentalPrice , maxRentalPrice , deliveryWay , insurancePrice , insuranceStatus , deliveryPlan , selectedImages , draggableMarkerCoord , route.params.productId , productAvaliable , cityLocation , districyLocation , streetLocation );

    setTimeout(() => {
      navigation.navigate('MyAccountScreen');
     }, 3500);
  
  }

  const handleAddTags = () => {
    if (productTag !== '') {
      setTagsProductArray(prevArray => [...prevArray, productTag]);
      setProductTag('');
    }
    else {
      setError("يرجى ادخال نص الدلالة")
    }
  
  };


  
  useEffect(() => {
    const getInfoFromFireStore = async () => {
      setLoading(true);
      const docRef = doc(db, "products", route.params.productId );
      const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log(docSnap.data());
          setProductName(docSnap.data().product_name);
          setProductDesc(docSnap.data().product_desc);
          setCateogryName(docSnap.data().product_category);
          setProductAvaliable(docSnap.data().is_available);
          setTagsProductArray(docSnap.data().product_tags);
          setProductCase(docSnap.data().productAdditional[0].productCase);
          setProductCount(docSnap.data().productAdditional[0].productCount);
          setDailyRentPrice(docSnap.data().productAdditional[0].dailyRentPrice);
          setWeekRentPrice(docSnap.data().productAdditional[0].weekRentPrice);
          setMonthlyRentPrice(docSnap.data().productAdditional[0].monthlyRentPrice);
          setMinRentalPrice(docSnap.data().productAdditional[0].minRentalPrice);
          setMaxRentalPrice(docSnap.data().productAdditional[0].maxRentalPrice);
          setDeliveryWay(docSnap.data().productAdditional[0].deliveryWay);
          setInsuranceStatus(docSnap.data().productAdditional[0].insuranceStatus);
          setInsurancePrice(docSnap.data().productAdditional[0].insurancePrice);
          setDeliveryPlan(docSnap.data().productAdditional[0].deliveryPlan);
          setSelectedImages(docSnap.data().product_images);
          setDraggableMarkerCoord(docSnap.data().product_location);
          setObjectLocation(docSnap.data().product_location);
          setCityLocation(docSnap.data().location_details.cityLocation);
          setDistricyLocation(docSnap.data().location_details.districyLocation);
          setStreetLocation(docSnap.data().location_details.streetLocation);

          setLoading(false);
        } 
    }
    getInfoFromFireStore();
  } , []);

  const handleAddCountProduct = () => {

    if (bookingProduct?.productCount < productCount) {
      setProductCount(productCount + 1);
    }
  }
  const handleMinusCountProduct = () => {

    if (productCount > 1) { // Check if productCount is greater than 1 before decrementing
      setProductCount(productCount - 1);
    }
  }

  const scrollViewRef = useRef();

  return (
    <SafeAreaView>
      
      <ScrollView
      
  ref={scrollViewRef}
  contentContainerStyle={{ flexGrow: 1 }} 
      >


      <View style={[styles.container ,  isKeyboardOpen ? styles.keyboardOn : '' ]}  >

      <StatusBar translucent backgroundColor="black" />
 

      {loading ? (
        <View className="mt-8 mb-8" >
    <ActivityIndicator animating={true} color={'#007FB7'} />
    </View>
      ) : (
        <View className="px-6" >

<View className="mt-12" >


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
        

  {!fullScreen ? (

    <KeyboardAvoidingView

>

{error && (
    <View className=" p-4  text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 text-right mb-5 flex items-start" >
      <Text style={styles.errorText}  >{error}</Text>
    </View>
  )}

  <View className="mb-8 flex flex-row items-center justify-between mx-2">
<View className="w-2/3 mx-2" >
<Text style={styles.textInput} className="text-lg  block text-gray-700 font-bold mb-2" htmlFor="username">
    الغرض متاح للايجار
  </Text>
</View>


  <View className="w-1/3 mx-2" >
  <TouchableOpacity onPress={toggleSwitchAvaliable} style={[styles.switch , productAvaliable ? styles.switchBgOn : styles.switchBgOff  ]}>
        <View style={[styles.switchToggle, productAvaliable ? styles.switchToggleOn : styles.switchToggleOff]} />
      </TouchableOpacity>

      </View>
   
</View>

<View className="mb-8">

<Text style={styles.textInput} className="block text-gray-700 font-bold mb-3" htmlFor="username">
اسم الغرض <Text className="text-red-500 text-base" > *  </Text>  
</Text>
<TextInput
style={styles.inputStyle}
className="appearance-none border rounded-xl w-full py-4 px-3 text-gray-700 leading-tight "
id="title"
placeholder="أكتب اسم الغرض المراد اضافته"
value={productName}
onChangeText={(text) => setProductName(text) }
/>
</View>

<View className="mb-8">

<Text style={styles.textInput} className="block text-gray-700 font-bold mb-3" htmlFor="username">
وصف الغرض <Text className="text-red-500 text-base" > * </Text>  
</Text>
<TextInput
style={[styles.inputStyle , styles.inputAreaStyle]}
className="appearance-none border rounded-xl w-full py-4 px-3 text-gray-700 leading-tight "
id="descrition"
multiline={true}
numberOfLines={8}
placeholder="أكتب وصف تفصيلي عن الغرض"
autoCapitalize="none"
value={productDesc}
onChangeText={(text) => setProductDesc(text) }
/>
</View>

<View className="mb-8">

<Text style={styles.textInput} className="block text-gray-700 font-bold mb-3" htmlFor="username">
تصنيف الغرض <Text className="text-red-500 text-base" > * </Text>  
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

<View className="mb-8">

<Text style={styles.textInput} className=" block text-gray-700 font-bold mb-3" htmlFor="username">
دلالة الغرض 
</Text>
<View className="realtive" >

<TextInput
style={styles.inputStyle}
className="appearance-none border rounded-xl w-full py-4 px-3 text-gray-700 leading-tight "
id="title"
placeholder="قم بادخل دلالات الغرض"
onChangeText={(text) => setProductTag(text) }
value={productTag}

/>
<View className="absolute top-2 right-0" >

<TouchableOpacity
className="text-center rounded-full px-6 py-2"
style={styles.button}
onPress={() => handleAddTags() }
>

<Text style={styles.buttonText}> اضافة  </Text>
</TouchableOpacity>

</View>
</View>

<View className="mb-8 flex flex-row items-center flex-wrap mt-5" >
{tagsProductArray && tagsProductArray.map((item , index) => (
<View key={index} className="rounded-full w-24 mx-1 py-2 text-center mt-2" style={styles.buttonTag} >
<Text className="text-xs text-white " style={styles.buttonText} >  {item}  </Text>
</View>

)) }

</View>

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
<TouchableOpacity onPress={() => {
  if (productCount > 1) {
    setProductCount(productCount - 1)
  }
} } >
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


  
<View className="mb-8 mt-8">

<Text style={styles.textInput} className="block text-lg text-gray-700 font-bold mb-1" htmlFor="username">
إضافة صورة للغرض  <Text className="text-red-500 text-base" > * </Text>  
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
<Image source={require('../assets/images/frames/image-frame.png')} style={styles.banner} className="mt-3 mb-5" />
)}



<View className="flex flex-col justify-center items-center" >

<TouchableOpacity
onPress={() =>  handleChooseImageThum() }
className="mt-5 text-center rounded-full pt-4 h-14 items-center flex w-full"
style={[styles.button , styles.opacity]}
>
<View className="flex-row items-center" >
<Ionicons name="image-outline" size={22} color="#fff" style={styles.checkmark} />
<Text style={styles.buttonText}>  إضافة صورة </Text>
</View>

</TouchableOpacity>



</View>

</View>


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


<View className="mb-8">

<Text style={styles.textInput} className="block text-lg text-gray-700 font-bold mb-5" htmlFor="username">
     عنوان الغرض  <Text className="text-red-500 text-base" > * </Text>  
  </Text>

  <View  >

<View className="mt-1 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 text-right  flex items-start" >
<Text className="text-sm mb-2 text-center " syle={styles.errorText} >  فضلا قم بتحديد وسحب العلامة الخضراء على الخريطة لتوضيح مكان تواجد الغرض  </Text>
  </View>

  <View className="flex h-96 bg-white" >

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


</View>
 
</View>

<TouchableOpacity
  className="mt-8  rounded-full p-3"
  style={styles.button}
  onPress={() => handleEditProduct() }
  >

  <Text style={styles.buttonText}>  تعديل المنتج   </Text>
  </TouchableOpacity>

</View>

</KeyboardAvoidingView>

  ) : (

    <View className="h-96 bg-white" >

    <MapView

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


  </View>

</View>
      )}


      { /* END NOTIFCATIONS COLUMN */ }

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
    paddingBottom: 20,
    
  },
  topAreaHeadins: {
    backgroundColor: COLORS.Blue,
    paddingHorizontal: 20,
  },
  title: {
    color: COLORS.LightBLue,
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
  button: {
    borderColor: 'none',
    backgroundColor: COLORS.LightBLue,
  },
  buttonText: {
    fontFamily: FONTFAMILY.font_medium,
    fontSize: 16,
    fontWeight: 'bold',
    
    color: COLORS.White,
    textAlign: 'center',
  },
  exploreButtonText:{
    fontFamily: FONTFAMILY.font_bold,
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.Blue,
    textAlign: 'center',
  },
  activeBtn: {
    backgroundColor: COLORS.White,
  },
  activeBtnText: {
    color: COLORS.Blue,
  },
  cameraContainer: {
    backgroundColor: COLORS.LightBLue,

  },
  textInput: {
    color: COLORS.Black,
    fontFamily: FONTFAMILY.font_light,
    fontWeight: 200,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 10,
  },
  inputStyle: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#DADADA',
    backgroundColor: '#FAFAFA',
    textAlign: 'right',

  },
  errorText: {
    fontFamily: FONTFAMILY.font_regular,
      textAlign: 'right'
  },
  keyboardOn: {
    paddingBottom: 150,
  },
  buttonTag: {
    borderColor: 'none',
    backgroundColor: COLORS.LightBLue,
    opacity: 0.6
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
  banner: {
    width: '100%',
    height: '15%'
  },

  map: {
    marginTop: 30,
    width:'100%',
    height: '85%'
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


} );

export default EditProductScreen