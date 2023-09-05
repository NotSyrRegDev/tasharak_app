import { View , StyleSheet , Image  , StatusBar , Text , TextInput  , TouchableOpacity , KeyboardAvoidingView , ScrollView , SafeAreaView } from 'react-native'
import React , {useState}  from 'react';
import { FONTFAMILY , COLORS } from '../theme/theme';
import { fetchSignInMethodsForEmail , sendPasswordResetEmail , auth } from '../../firebase';
 
const ForgetPasswordScreen = ( { navigation } ) => {

  const [email , setEmail ] = useState('');
  const [error , setError] = useState('');
  const [loading , setLoading] = useState(false);
  const [success , setSuccess ] = useState(false);


  const sendResetEmail= ()    =>  {
    setLoading(true);
    if (email == '') {
        setError("يرجى ادخال الايميل")
    }

    setTimeout(() => {
        setLoading(false);
        setError('');
      } , 4500)

    if (email !== '') {
        fetchSignInMethodsForEmail(auth, email)
.then((signInMethods) => {
  if (signInMethods.length === 0) {
    // User does not exist
   setError("لم نستطع العثور على الايميل");
  } else {
    // User exists, send password reset email
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Reset email sent successfully
        setSuccess("تم ارسال ايميل اعادة تعيين كلمة المرور");
        setTimeout(() => {
          navigation.navigate('LoginScreen')
        } , 4500)
        // Add your success handling code here
      })
      .catch((e) => {
       
        setError("حدث خطا في الارسال , يرجى التحقق من البيانات")
       
      });
  }
})
.catch((error) => {
  // Error fetching sign-in methods
  setError("حدث خطا في الارسال , يرجى التحقق من البيانات")
  // Add your error handling code here
});
    }
}

  return (

      <SafeAreaView>
    <ScrollView contentContainerStyle={styles.container} >
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
    <View   >
    <StatusBar />

   <View style={styles.textContainer}>
     <Image source={require('../assets/icons/forgot_password.png')} style={styles.logo} />

     <Text className="mt-8 text-center text-black"  style={styles.title} > هل نسيت كلمة المرور؟ </Text>
  
  <Text className="mt-5  text-center text-black text-xl" style={styles.subtitle} >   لا تقلق ! أدخل عنوان البريد الإلكتروني المرتبط بحسابك 
على تشارك، وسوف نرسل لك رابط إعادة التعيين. </Text>

   </View>


   <View className="w-full max-w-sm mt-16" style={styles.inputContainer} >

   {error && (
          <View className=" p-4  text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 text-right mb-5" >
            <Text style={styles.errorText}  >{error}</Text>
          </View>
        )}

   {success && (
          <View className=" p-4  text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 text-right mb-5" >
            <Text style={styles.errorText}  >{success}</Text>
          </View>
        )}
  
<View className="mb-8">
  <Text style={styles.textInput} className="block text-gray-700 font-bold mb-2" htmlFor="username">
    البريد الالكتروني *
  </Text>
  <TextInput
  style={styles.inputStyle}
    className="appearance-none border rounded-xl w-full py-4 px-3 text-gray-700 leading-tight "
    id="username"
    textContentType="emailAddress"
      keyboardType="email-address"
      autoCapitalize="none"
      value={email}
      onChangeText={(text) => setEmail(text) }
    placeholder="أدخل البريد الاكلتروني"
  />

<TouchableOpacity
      className="mt-3  rounded-full p-3 text-center"
        style={styles.button}
        onPress={() =>  sendResetEmail() }>
        <Text style={styles.buttonText}>  أرسل </Text>
   
      </TouchableOpacity>

      <TouchableOpacity
          className="mt-5 "
            onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.exploreButtonText}>  العودة  </Text>
          </TouchableOpacity>
</View>





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
   direction: 'ltr',
   justifyContent: 'center',
   felx:1,
 },
 textContainer: {
   alignItems: 'center',
   paddingHorizontal: 30,
 },
 logo: {
   resizeMode: 'cover',
   maxHeight: 110,
   maxWidth: 350,
 },
 title: {
  fontSize: 28,
  color: COLORS.Black,
  fontFamily: FONTFAMILY.font_medium,
  fontWeight: 500,
 },
 subtitle: {
  fontSize: 14,
  color: COLORS.Black,
  fontFamily: FONTFAMILY.font_regular,
  fontWeight: 'light',
 },
 textInput: {
  color: COLORS.Black,
  fontSize: 18,
  fontFamily: FONTFAMILY.font_regular,
  fontWeight: 600,
  textAlign: 'right',
  marginBottom: 15,
},

inputStyle: {
  borderRadius: 20,
  borderWidth: 4,
  borderColor: '#DADADA',
  backgroundColor: '#FAFAFA',
  textAlign: 'right',
},
 button: {
   marginTop: 25,
   borderRadius: 5,
   marginBottom: 20,
   backgroundColor: COLORS.Blue,
 },
 inputContainer:{
  paddingHorizontal: 20,
 },
 
 buttonText: {
   fontFamily: FONTFAMILY.font_bold,
   fontSize: 14,
   fontWeight: 'bold',
   color: 'white',
   textAlign: 'center',
 },
 exploreButtonText:{
  marginTop: 25,
  fontFamily: FONTFAMILY.font_bold,
  fontSize: 18,
  fontWeight: 300,
  color: COLORS.LightBLue,
  textAlign: 'center',
},
errorText: {
  fontFamily: FONTFAMILY.font_regular,
  textAlign: 'right',
}
});

export default ForgetPasswordScreen