import { View, Text , SafeAreaView , StyleSheet , StatusBar , Image , TouchableOpacity , ScrollView  ,ActivityIndicator  } from 'react-native'
import React , {useContext , useState , useRef} from 'react'
import TopProfileNavigator from '../components/TopProfileNavigator';
import { FONTFAMILY , COLORS } from '../theme/theme';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { AppContext } from '../context/AppContext';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';

const AddScreenImages = ({ navigation }) => {
  const scrollViewRef = useRef();

  const [productImage , setProductImage] = useState('');

  const [isLoading , setIsLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const {  setError , error  , uploadImage , success  , setSucces , setProductImages } = useContext(AppContext);

  const handleRemoveImage = (index) => {
    setSelectedImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };

  const handleChooseImageThum = async () => {
    setIsLoading(true);
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
        setIsLoading(true);
        setSucces("تمت اضافة الصور بنجاح");
        setSelectedImages((prevImages) => [...prevImages, ...selectedUris]);
        
        setIsLoading(false);
      }
     
    }
  };


  const handleNextStep = async () => {
    if (selectedImages.length > 0) {
      setIsLoading(true);
      try {
        const uploadPromises = selectedImages.map((uri) => uploadImage(uri));
        const uploadedUrls = await Promise.all(uploadPromises);
        setUploadedImages((prevImages) => [...prevImages, ...uploadedUrls]);
        setProductImages(uploadedUrls);
        setIsLoading(false);
        navigation.navigate('AddScreenAddress');
      } catch (error) {
        setIsLoading(false);
        setError("حدث خطأ في تحميل الصور");
      }
    } else {
      setError("يجب عليك رفع صورة واحدة على الأقل");
    }
  };

  
  return (
    
    <SafeAreaView style={styles.container} >

    
<ScrollView
     
  ref={scrollViewRef}
  contentContainerStyle={{ flexGrow: 1 }} 
      >

    <View>


<StatusBar translucent backgroundColor="black" />
{ /* TOP HEADER TEXT */ }
<TopProfileNavigator navigation={navigation} text={"إضافة غرض"} />

{ /* CHOOSING CATEGORY */ }
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
        className="mt-5 text-center rounded-full pt-4 h-14 items-center flex "
          style={[styles.button , styles.opacity]}
         >
          <View className="flex-row items-center" >
          <Ionicons name="image-outline" size={22} color="#fff" style={styles.checkmark} />
          <Text style={styles.buttonText}>  إضافة صورة </Text>
          </View>
        
        </TouchableOpacity>

        </View>
       
      </View>

      <View className="items-center flex-col mt-8 mb-8" >
      {!isLoading ? (
        <TouchableOpacity
      className=" text-center rounded-full p-3"
      style={styles.button}
      onPress={() => { handleNextStep() } }
      >

      <Text style={styles.buttonText}> المتابعة  </Text>
      </TouchableOpacity>
      ) :(
        <ActivityIndicator animating={true} color={'#007FB7'} />
      )}
        
          </View>

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

  opacity: {
    opacity: 1,
  },
  errorText: {
    fontFamily: FONTFAMILY.font_regular,
      textAlign: 'right'
  },
  banner: {
    width: '100%',
    height: '45%'
  }
  

});

export default AddScreenImages