import { View, Text ,StatusBar , StyleSheet , SafeAreaView , Image ,TouchableOpacity , TextInput  ,ScrollView, KeyboardAvoidingView , Platform , Keyboard } from 'react-native'
import React, { useState , useContext , useEffect } from 'react'
import { FONTFAMILY , COLORS } from '../theme/theme';
import {  AuthenticationContext } from '../context/AuthContext';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ActivityIndicator, Colors } from "react-native-paper";

const LoginScreen = ( { navigation } ) => {

    const [ loginContainerShow , setLoginContainerShow ] = useState(false);
    const [userEmail, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { onLogin, error, isLoading  } = useContext(AuthenticationContext);
    const [ checkRemeber , setCheckRemeber ] = useState(false);

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



  return (
    <SafeAreaView   >
 <ScrollView contentContainerStyle={styles.container} >
 <KeyboardAvoidingView style={styles.keyboardContianer}   >
<View  >

 <StatusBar translucent backgroundColor="black" />
  { /* TOP HEADER TEXT */ }
  <View className="flex items-start mt-16 pb-5" style={{ paddingHorizontal: 10 }}  >

  <Text className="text-3xl text-right text-black"  style={styles.title} > مرحبا ! </Text>

  <Text className="mt-3  text-right text-black text-xl" style={styles.subtitle} >   الرجاء تسجيل الدخول </Text>

  </View>

  { /* SIGNUP BUTTONS */ }
 <View style={[styles.headerContent , isKeyboardOpen ? styles.keyboardOn : '' ]}  >

 { /* SIGNUP OPTIONS START */  }

<TouchableOpacity
  className="mt-10  rounded-full p-3"
    style={styles.button}
    onPress={() =>  setLoginContainerShow(!loginContainerShow) }>
    <View className="flex flex-row items-center " >
    <Image source={require('../assets/icons/gmail.png')} className="mx-2 justify-end" />
    <Text style={styles.buttonText}>  التسجيل من خلال البريد الإلكتروني   </Text>
    </View>
  </TouchableOpacity>

<TouchableOpacity
  className="mt-5  rounded-full p-3"
    style={styles.button}
    onPress={() => signInWithGoogleProvider() }>
    <View className="flex flex-row items-center  " >
    <Image source={require('../assets/icons/google.png')} className="mx-2 justify-end" />
    <Text style={styles.buttonText}> التسجيل من خلال جوجل</Text>
    </View>
   
  </TouchableOpacity>

<TouchableOpacity
  className="mt-5  rounded-full p-3"
    style={styles.button}
    onPress={() => navigation.navigate('LoginScreen')}>
    <View className="flex flex-row items-center " >
    <Image source={require('../assets/icons/apple.png')} className="mx-2 justify-end" />
    <Text style={styles.buttonText}> التسجيل من خلال ابل</Text>
    </View>
   
  </TouchableOpacity>

  { /* SIGN UP OPTIONS END */}

  {loginContainerShow && (
   
    <View className="w-full max-w-sm mt-10"  >
    
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
  <View style={{ flex: 1, height: 2, backgroundColor: '#DADADA' }} />
  <Text style={styles.hrTexterrorText}>   أو </Text>
  <View style={{ flex: 1, height: 2, backgroundColor: '#DADADA' }} />
  </View>


  <View className="mt-12" >



  {error && (
          <View className=" p-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 text-right mb-5 flex items-start" >
            <Text style={styles.errorText}  >{error}</Text>
          </View>
        )}
   

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

  <View className="mb-8">
  <Text style={styles.textInput} className=" block text-gray-700 font-bold mb-2" htmlFor="username">
  كلمة المرور <Text className="text-red-500 text-base" > * </Text>    
  </Text>
  <TextInput
  style={styles.inputStyle}
  className="appearance-none border rounded-xl w-full py-4 px-3 text-gray-700 leading-tight "
  id="password"
  placeholder="*********"
  textContentType="password"
      secureTextEntry
      autoCapitalize="none"
  value={password}
  onChangeText={(text) => setPassword(text) }
  />
  </View>



  <View className="flex flex-row items-center justify-between mb-4">
  <TouchableOpacity onPress={() => setCheckRemeber(!checkRemeber) } >
  <View className="flex items-center flex-row">

    <View style={styles.checkboxForm} >
    {checkRemeber && (
          <Ionicons name="checkmark" size={18} color="#22BCA0" className="font-bold" />
        )}
    </View>

  <Text className="text-gray-700 text-base" style={styles.font} > تذكرني </Text>
  </View>
  </TouchableOpacity>
  <TouchableOpacity
  onPress={() => navigation.navigate('ForgetPasswordScreen')}
  >
  <Text style={styles.forgetText} className="inline-block align-baseline text-sm  ">
  نسيت كلمة المرور ؟
  </Text>
  </TouchableOpacity>
  
  </View>

    <View className="flex-col items-center" >

          {!isLoading ? (

  <TouchableOpacity
  className="mt-8  rounded-full p-3"
  style={styles.button}
  onPress={() => onLogin(userEmail, password)}
  >

  <Text style={styles.buttonText}> تسجيل الدخول </Text>
  </TouchableOpacity>
  ) : (
    <ActivityIndicator animating={true} color={'#007FB7'} />
  )}

    </View>





  </View>


  </View>
 
    )}


   

  <TouchableOpacity
      className="mt-5 mb-5 p-3"
        onPress={() => navigation.navigate('SignupOptionsScreen')}>
        <Text style={styles.exploreButtonText}>  ليس لديك حساب ؟ قم بانساء حسابك  </Text>
      </TouchableOpacity>

</View>
 



  </View>
  </KeyboardAvoidingView>
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
      
    },
    hrText: { 
      marginHorizontal: 30 ,
      color: COLORS.Black,
      fontFamily: FONTFAMILY.font_light,
      fontWeight: 'light',
      fontSize: 18,
    },
  
    headerContent: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      maxHeight: '100%',
    },
    subtitle: {
      fontFamily: FONTFAMILY.font_regular
    },
    keyboardOn: {
      paddingBottom: 150,
    },
    boxContianer: {
      paddingHorizontal: 20 
    },
    title: {
      color: COLORS.LightBLue,
      fontFamily: FONTFAMILY.font_bold,
      fontWeight: 'bold',
      
    },
    textInput: {
      color: COLORS.Black,
      fontFamily: FONTFAMILY.font_regular,
      fontWeight: 'bold',
      textAlign: 'left',
    },
    box1: {
      backgroundColor: COLORS.LightBLue
    },
    box2: {
      backgroundColor: COLORS.Green
    },
    button: {
      borderColor: 'none',
      width: '85%',
      backgroundColor: COLORS.LightBLue,
      opacity: 0.8
    },
    buttonText: {
      fontFamily: FONTFAMILY.font_medium,
      fontSize: 14,
      fontWeight: 400,
      
      color: 'white',
      textAlign: 'center',
    },
    exploreButtonText:{
      fontFamily: FONTFAMILY.font_bold,
      fontSize: 16,
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
      textAlign: 'right'
    },
    font: {
      fontFamily: FONTFAMILY.font_light,
    },
    keyboardContianer: {
      flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    }
  
  });


export default LoginScreen