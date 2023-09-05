import { View, Text ,StatusBar , StyleSheet , ScrollView , Image ,TouchableOpacity , TextInput , KeyboardAvoidingView  , SafeAreaView , Keyboard } from 'react-native'
import React , {useState , useContext , useEffect} from 'react'
import { FONTFAMILY , COLORS } from '../theme/theme';
import Ionicons from '@expo/vector-icons/Ionicons';
import {  AuthenticationContext } from '../context/AuthContext';
import { ActivityIndicator, Colors } from "react-native-paper";
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { AppContext } from '../context/AppContext';

const SignupScreen = ({ navigation }) => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userEmail, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setConfirmPassword] = useState('');
  const [companyName , setCompanyName] = useState('');
  const [companyNumber , setCompanyNumber] = useState('');

  const { accountType  } = useContext(AppContext);

  const [ checkAgreement , setCheckAgreement ] = useState(false);
  const [ offersAgreement , setOffersAgreement ] = useState(false);

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



  const {  onRegisterCompany , onRegisterPersonal ,  isLoading, error } = useContext(AuthenticationContext);

  return (
    <SafeAreaView>
  <ScrollView>

<View style={[ styles.container , isKeyboardOpen ? styles.keyboardOn : '' ]}  >

 <StatusBar translucent backgroundColor="black" />
  { /* TOP HEADER TEXT */ }
  <View className="flex flex-row items-center  pt-20 pb-5" style={styles.topAreaHeadins}  >

<View>
<TouchableOpacity className="px-4" onPress={() => navigation.navigate('SignupOptionsScreen') } >
<SimpleLineIcons name="arrow-right" size={22} color="#fff" />
</TouchableOpacity>
</View>

<View>
<Text className="text-3xl text-center text-white"  style={styles.title} > أنشئ حساب </Text>

<Text className="mt-3  text-center text-white text-lg" style={styles.subtitle} >   إنشاء حساب شخصي أو حساب شركة </Text>
</View>
  

  </View>

  { /* SIGNUP BUTTONS */ }
 <View style={styles.headerContent}  >

      <View className="w-full max-w-sm mt-10 h-full" style={styles.headerContentInside} >

  <View className="mt-12" >
  {error && (
          <View className=" p-4  text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 text-right mb-5 flex items-start" >
            <Text style={styles.errorText}  >{error}</Text>
          </View>
        )}

    <KeyboardAvoidingView>


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
  {accountType == 'company' && (
    <View>

    <View className="mb-8">
    <Text style={styles.textInput} className="block text-gray-700 font-bold mb-2" htmlFor="username">
     اسم الشركة <Text className="text-red-500 text-base" > * </Text>  
    </Text>
    <TextInput
      style={styles.inputStyle}
      className="appearance-none border rounded-xl w-full py-4 px-3 text-gray-700 leading-tight"
      id="username"
      placeholder="أدخل اسم الشركة"
      value={companyName}
      onChangeText={(text) => setCompanyName(text)}
    />
  </View>

  <View className="mb-8">
    <Text style={styles.textInput} className="block text-gray-700 font-bold mb-2" htmlFor="username">
     رقم الترخيص <Text className="text-red-500 text-base" > * </Text>  
    </Text>
    <TextInput
    style={styles.inputStyle}
      className="appearance-none border rounded-xl w-full py-4 px-3 text-gray-700 leading-tight "
      id="username"
      placeholder="أدخل رقم الترخيص"
      value={companyNumber}
      onChangeText={(text) => setCompanyNumber(text) }
    />
  </View>


    </View>
  )}

  <View className="mb-8">
    <Text style={styles.textInput} className=" block text-gray-700 font-bold mb-2" htmlFor="username">
      كلمة المرور <Text className="text-red-500 text-base" > * </Text>    
    </Text>
    <TextInput
    style={styles.inputStyle}
      className="appearance-none border rounded-xl w-full py-4 px-3 text-gray-700 leading-tight "
      id="password"
      textContentType="password"
      secureTextEntry
      autoCapitalize="none"
      placeholder="*********"
      value={password}
      onChangeText={(text) => setPassword(text) }
    />
  </View>

  <View className="mb-8">
    <Text style={styles.textInput} className=" block text-gray-700 font-bold mb-2" htmlFor="username">
       أعد ادخال كلمة المرور <Text className="text-red-500 text-base" > * </Text>  
    </Text>
    <TextInput
    style={styles.inputStyle}
      className="appearance-none border rounded-xl w-full py-4 px-3 text-gray-700 leading-tight "
      id="confirm-password"
      textContentType="password"
      secureTextEntry
      autoCapitalize="none"
      placeholder="*********"
      value={passwordConfirm}
      onChangeText={(text) => setConfirmPassword(text) }
    />
  </View>
  
    </KeyboardAvoidingView>



    <TouchableOpacity onPress={() => setCheckAgreement(!checkAgreement) }>
  <View className="flex items-center flex-row mb-5">
    
        <View style={styles.checkboxForm}  >
        {checkAgreement && (
          <Ionicons name="checkmark" size={18} color="#22BCA0" className="font-bold" />
        )}
         
        </View>
    
      <Text className="text-gray-700 text-sm"> موافق على الشروط والأحكام وسياسة الخصوصية <Text className="text-red-500 text-base" > * </Text>   </Text> 
    </View>

    </TouchableOpacity>


    <TouchableOpacity onPress={() => setOffersAgreement(!offersAgreement) } >
  <View className="flex items-center flex-row ">
      
        <View style={styles.checkboxForm} >
        {offersAgreement &&(
          <Ionicons name="checkmark" size={18} color="#22BCA0" className="font-bold" />
        )}
       
        </View>
     
      <Text className="text-gray-700 text-sm"> أطلعني على العروض والرسائل الأخبارية  </Text>
    </View>
    </TouchableOpacity>
    {!isLoading ? (

    <View>  
    {accountType == 'company' ? (
        <TouchableOpacity
    className="mt-8  rounded-full p-3"
      style={styles.button}
      onPress={() => onRegisterCompany( accountType , companyName , companyNumber , firstName , lastName ,  userEmail, password, passwordConfirm , checkAgreement )}
      >
      
      <Text style={styles.buttonText}>  إنشاء حساب شركة </Text>
    </TouchableOpacity>
      ) : (
        <TouchableOpacity
    className="mt-8  rounded-full p-3"
      style={styles.button}
      onPress={() => onRegisterPersonal( accountType , firstName , lastName ,  userEmail, password, passwordConfirm , checkAgreement )}
      >
      
      <Text style={styles.buttonText}>  إنشاء حساب شخصي </Text>
    </TouchableOpacity>
      )}
       </View>
   
      ) : (
        <ActivityIndicator animating={true} color={'#007FB7'} />
      )}

      

   

  </View>
  <TouchableOpacity
    className="mt-5 mb-5 p-3"
      onPress={() => navigation.navigate('LoginScreen')}>
      <Text style={styles.exploreButtonText}>  لديك حساب بالفعل ؟ قم بتسجيل الدخول </Text>
    </TouchableOpacity>

</View>



</View>
 



  </View>
   
  </ScrollView>
    </SafeAreaView>
  
    )
  }
  
  const styles = StyleSheet.create({ 
  
    container: {
      backgroundColor: COLORS.White,
      height: '100%',
      direction: 'rtl',
      felx:1,
      
    },
    topAreaHeadins: {
      backgroundColor: COLORS.Blue,
      paddingHorizontal: 20,
    },
    hrText: { 
      marginHorizontal: 30 ,
      color: COLORS.Black,
      fontFamily: FONTFAMILY.font_light,
      fontWeight: 'light',
      fontSize: 18,
    },
  
    headerContent: {
      backgroundColor:'#fff',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      maxHeight: '100%',

    },
    headerContentInside: {
      paddingHorizontal: 20,
      borderRadius: 50,
    },
    boxContianer: {
      paddingHorizontal: 20 
    },
    title: {
      color: COLORS.White,
      fontFamily: FONTFAMILY.font_bold,
      fontWeight: 'bold',
      
    },
    textInput: {
      color: COLORS.Black,
      fontFamily: FONTFAMILY.font_light,
      fontWeight: 200,
      fontWeight: 'bold',
      textAlign: 'left',
      marginBottom: 10,
    },
    box1: {
      backgroundColor: COLORS.LightBLue
    },
    box2: {
      backgroundColor: COLORS.Green
    },
    button: {
      borderColor: 'none',
      width: 310,
      backgroundColor: COLORS.LightBLue,
    },
    buttonText: {
      fontFamily: FONTFAMILY.font_medium,
      fontSize: 15,
      fontWeight: 'bold',
      
      color: 'white',
      textAlign: 'center',
    },
    exploreButtonText:{
      fontFamily: FONTFAMILY.font_bold,
      fontSize: 14,
      fontWeight: 'bold',
      color: COLORS.Blue,
      textAlign: 'center',
    },
    forgetText:{
      fontFamily: FONTFAMILY.font_bold,
      fontWeight: 'bold',
      color: COLORS.LightBLue,
      textAlign: 'center',
    },
    inputStyle: {
      borderRadius: 20,
      borderWidth: 1,
      borderColor: '#DADADA',
      backgroundColor: '#FAFAFA',
      textAlign: 'right',

    },
    checkboxForm:{
      width: 25,
      height: 25,
      borderWidth: 2,
      borderColor: '#D1D5DB',
      borderRadius: 4,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 8,
    },
    errorContainer: {
      maxwidth: 300,
      alignItems: 'center',
      alignSelf: 'center',
      marginTop: 20,
      marginBottom: 20
    },
    errorText: {
      fontFamily: FONTFAMILY.font_regular,
      textAlign: 'right',
    },
    keyboardOn: {
      paddingBottom: 150,
    },
  
  });


export default SignupScreen