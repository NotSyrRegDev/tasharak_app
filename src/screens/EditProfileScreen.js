import { View, Text , SafeAreaView , StyleSheet , StatusBar , TouchableOpacity  , Image , KeyboardAvoidingView , ScrollView , TextInput , ActivityIndicator , Platform , Keyboard} from 'react-native'
import React, { useContext , useState , useEffect, useCallback } from 'react'
import { FONTFAMILY , COLORS } from '../theme/theme';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AuthenticationContext } from '../context/AuthContext';
import TopProfileNavigator from '../components/TopProfileNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { AppContext } from '../context/AppContext';
import { useFocusEffect } from '@react-navigation/native';



const EditProfileScreen = ({ navigation }) => {


  const [isKeyboardOpen, setKeyboardOpen] = useState(false);

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

  
  const handlePhoneChange = (text) => {
    const cleanedText = text.replace(/[^0-9]/g, '');
    if (cleanedText.length <= 10) {
      setUserPhone(cleanedText);
    }
  };



  const {  editUserProfile , isLoading, error , success , setIsLoading } = useContext(AuthenticationContext );
  const {  uploadImage } = useContext(AppContext);
  const [userThum , setUserThum ] = useState('');
  const [selectedImageActor , setSelectedImageActor ] = useState(null);

  const handleChooseImageActor = async () => {
    setIsLoading(true);
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      setError("يرجى اعطاء الاذن بالوصول للمعرض");
      setIsLoading(false);
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      setError("يرجى اكمال العملية");
      setIsLoading(false);
    } else {
      setSelectedImageActor(pickerResult.uri);
      let imageActor =  uploadImage(pickerResult.uri);
      setUserThum(imageActor);
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      const getData = async () => {
        try {
          const value = await AsyncStorage.getItem('tashark_user');
         let jsonPrsed = JSON.parse(value);
         setFirstName(jsonPrsed.first_name);
         setLastName(jsonPrsed.last_name);
         setEmail(jsonPrsed.email);
         setUserPhone(jsonPrsed.phone);
         setSelectedImageActor(jsonPrsed.thum);
         setUserId(jsonPrsed.id);
        
        } catch (error) {
       
        }
      };
  
      getData();
    }, [])
  );



  const [userId, setUserId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userEmail, setEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');

  const editProfile = () => {
   
    editUserProfile(userId , firstName , lastName , userEmail , userPhone ,  userThum , () => {
      navigation.navigate('MyAccountScreen');
    } );

  }

  return (
    <SafeAreaView>
      
      <ScrollView>


      <View style={[styles.container ,  isKeyboardOpen ? styles.keyboardOn : '' ]}  >

      <StatusBar translucent backgroundColor="black" />

      { /* NOTIFCATIONS COLUMN */ }
      <View className="flex-col items-center justify-center mt-10 "   >

      <View className="realtive" >
      {selectedImageActor ? (
        <Image source={{ uri: selectedImageActor }}  className="w-24 h-24 p-1 rounded-full" />
      ) : (
        <Image source={require('../assets/icons/avatar.png')}  className="w-24 h-24 p-1 rounded-full" />
      )}  


      <View className="absolute bottom-0 left-0 p-1 rounded-full" style={styles.cameraContainer} >
      <TouchableOpacity  onPress={() =>  handleChooseImageActor() } >
      <Ionicons name="camera-outline" size={28} color="#fff" />
      </TouchableOpacity>

      </View>

      </View>   

      

      </View>

      <View className="px-6" >

      <View className="mt-12" >

      {error && (
          <View className=" p-4  text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 text-right mb-5 flex items-start" >
            <Text style={styles.errorText}  >{error}</Text>
          </View>
        )}

        {success && (
          <View className=" p-4  text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 text-right mb-5 flex items-start" >
            <Text style={styles.errorText}  >{success}</Text>
          </View>
        )}

        <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >


        <View className="mb-8">
        <Text style={styles.textInput} className="block text-gray-700 font-bold mb-2" htmlFor="username">
        الاسم الاول <Text className="text-red-500 text-base" > * </Text>  
        </Text>
        <TextInput
        style={styles.inputStyle}
        className="appearance-none border rounded-xl w-full py-4 px-3 text-gray-700 leading-tight"
        id="username"
        placeholder="أدخل اسمك الاول"
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
        />
        </View>

        <View className="mb-8">
        <Text style={styles.textInput} className="block text-gray-700 font-bold mb-2" htmlFor="username">
        الاسم الاخير <Text className="text-red-500 text-base" > * </Text>  
        </Text>
        <TextInput
        style={styles.inputStyle}
        className="appearance-none border rounded-xl w-full py-4 px-3 text-gray-700 leading-tight "
        id="username"
        placeholder="أدخل اسمك الاخير"
        value={lastName}
        onChangeText={(text) => setLastName(text) }
        />
        </View>

        
  <View className="mb-8">
    <Text style={styles.textInput} className="block text-gray-700 font-bold mb-2" htmlFor="username">
       رقم الهاتف <Text className="text-red-500 text-base" > * </Text>  
    </Text>
    <TextInput
      style={styles.inputStyle}
      className="appearance-none border rounded-xl w-full py-4 px-3 text-gray-700 leading-tight"
      id="phone"
      placeholder="05xxxxxxx"
      keyboardType="numeric"
      value={userPhone}
      onChangeText={handlePhoneChange}
    />
  </View>

        <View className="mb-8">
        <Text style={styles.textInput} className="block text-gray-700 font-bold mb-2" htmlFor="username">
        البريد الالكتروني <Text className="text-red-500 text-base" > * </Text>  
        </Text>
        <TextInput
        style={styles.inputStyle}
        className="appearance-none border rounded-xl w-full py-4 px-3 text-gray-700 leading-tight "
        id="email"
        placeholder="أدخل البريد الاكلتروني"
        textContentType="emailAddress"
        keyboardType="email-address"
        autoCapitalize="none"
        value={userEmail}
        onChangeText={(text) => setEmail(text) }
        />
        </View>

        </KeyboardAvoidingView>



        {!isLoading ? (

        <TouchableOpacity
        className="mt-8  rounded-full p-3"
        style={styles.button}
        onPress={() => editProfile() }
        >

        <Text style={styles.buttonText}>  حفظ التغييرات  </Text>
        </TouchableOpacity>
        ) : (
        <ActivityIndicator animating={true} color={'#007FB7'} />
        )}

        <TouchableOpacity
          className="mt-10 "
            onPress={() => navigation.navigate('ChangePasswordScreen')}>
            <Text style={styles.exploreButtonText}>  تغيير كلمة المرور  </Text>
          </TouchableOpacity>



        </View>

      </View>


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

} );

export default EditProfileScreen