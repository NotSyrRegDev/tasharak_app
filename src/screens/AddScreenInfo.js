import { View, Text , SafeAreaView , StyleSheet , StatusBar , Image , TouchableOpacity , ScrollView , TextInput  , Modal  , KeyboardAvoidingView  , TouchableWithoutFeedback , Keyboard} from 'react-native'
import React , {useContext , useState , useEffect , useRef} from 'react'
import TopProfileNavigator from '../components/TopProfileNavigator';
import { FONTFAMILY , COLORS } from '../theme/theme';
import CategorySelect from '../components/CategorySelect';
import { AppContext } from '../context/AppContext';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';


const AddScreenInfo = ({ navigation }) => {

  const [userId, setUserId] = useState('');

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


  const { isLoading, categoryArray  , setError , error , setProductInfo , setObjectLocation  , setDraggableMarkerCoord} = useContext(AppContext);

  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError("يرجى منح الاذن للوصول للموقع")
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
      setDraggableMarkerCoord({
        longitude: currentLocation.coords.longitude,
        latitude: currentLocation.coords.latitude
      });
     
    };
    getPermissions();
  }, []);

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
  
  const [productName , setProductName] = useState('');
  const [productDesc , setProductDesc] = useState('');
  const [categoryName , setCateogryName] = useState('');
  const [productTag , setProductTag] = useState('');
  const [modalVisible , setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [tagsProductArray , setTagsProductArray] = useState([]);

  const handleOverlayPress = () => {
    setModalVisible(false);
  };

  const handleSelectItem = (index , name) => {
    setSelectedItem(index);
    setCateogryName(name);
  };

  const handleNextStep = () => {
    if (productName !== '' && productDesc !== '' && categoryName !== ''   ) {
      setProductInfo([
        productName, productDesc, categoryName  , tagsProductArray , userId
      ]);
      
      navigation.navigate('AddScreenDetails');
    }else {
      setError("يرجى ادخال جميع الحقول المطلوبة");
      setTimeout(() => {
        setError('');
      } , 3200)
    }
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

  const scrollViewRef = useRef();
  
  return (
    
    <SafeAreaView  >

      
<ScrollView
  ref={scrollViewRef}
  contentContainerStyle={{ flexGrow: 1 }} 
      >

    <View  style={[ styles.container , isKeyboardOpen ? styles.keyboardOn : '' ]}  >


<StatusBar translucent backgroundColor="black" />
{ /* TOP HEADER TEXT */ }
<TopProfileNavigator navigation={navigation} text={"إضافة غرض"} />

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

<Text style={styles.textInput} className="block text-gray-700 font-bold mb-3" htmlFor="username">
     اسم الغرض <Text className="text-red-500 text-base" > * </Text>  
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

    <View className="mt-5 flex flex-row items-center flex-wrap " >
  {tagsProductArray && tagsProductArray.map((item , index) => (
    <View key={index} className="rounded-full w-24 mx-1 py-2 text-center mt-2" style={styles.buttonTag} >
      <Text className="text-xs text-white " style={styles.buttonText} >  {item}  </Text>
      </View>

  )) }

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



</View>

{ /* END CHOOSING CATEGORY */ }

</View>


<Modal transparent={true} visible={modalVisible} animationType="slide">
<TouchableWithoutFeedback onPress={handleOverlayPress}>



<View style={styles.modalContainer} >
<ScrollView style={{ maxHeight: '80%' }}>
  <View style={styles.modalContent} className="relative" >

  <View className="flex flex-col items-center justify-between" >
    
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

<View className="absolute top-5 right-5" >
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
  categoryTitle: {
    fontFamily: FONTFAMILY.font_medium,
  },
  checkboxForm:{
    width: 35,
    height: 35,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderRadius: 500,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  button: {
    borderColor: 'none',
    width: '85%',
    backgroundColor: COLORS.LightBLue,
  },
  buttonTag: {
    borderColor: 'none',
    backgroundColor: COLORS.LightBLue,
    opacity: 0.6
  },
  buttonText: {
    fontFamily: FONTFAMILY.font_medium,
    fontSize: 16,
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
    width: '100%',
    padding: 20,
    backgroundColor: COLORS.White,
  },
  font: {
    fontFamily: FONTFAMILY.font_regular
  },
  errorText: {
    fontFamily: FONTFAMILY.font_regular,
    textAlign: 'right',
  },
  keyboardOn: {
    paddingBottom: 150,
  },

});

export default AddScreenInfo