import { View, Text ,StatusBar , StyleSheet , SafeAreaView , Image ,TouchableOpacity , ScrollView} from 'react-native'
import React , {useContext, useState} from 'react'
import { FONTFAMILY , COLORS } from '../theme/theme';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AppContext } from '../context/AppContext';


const SignupOptionsScreen = ( { navigation } ) => {

  const { accountType , setAccountType } = useContext(AppContext);


  return (
    <SafeAreaView  style={styles.container} >
    <ScrollView>
    <View  >

<StatusBar translucent backgroundColor="black" />

 <View className="mt-5 px-6" style={styles.boxContianer}   >

<TouchableOpacity className="flex flex-row justify-center " onPress={() => setAccountType('personal') } >
 <View style={styles.box1} className="relative w-48 h-48 bg-gray-200 rounded-2xl flex items-center justify-center ">
 <Ionicons name="people-outline" size={68} color="#fff" className="font-bold" />
   <Text className="mt-1 text-white text-xl"> شخصي </Text>
   <View className="absolute top-5 left-5" >
   <Ionicons name={`${accountType == 'personal' ? 'checkmark-circle':  'ellipse-outline' }`} size={25} color="#fff" className="font-bold" />
   </View>
 </View>

 <View className="mx-2" >

 </View>

 <TouchableOpacity style={styles.box2} className="relative w-48 h-48 bg-gray-200 rounded-2xl flex items-center justify-center " onPress={() => setAccountType('company') } >
 <Ionicons name="people-circle-outline" size={68} color="#fff" className="font-bold" />
   <Text className="mt-1 text-white text-xl"> شركة </Text>
   <View className="absolute top-5 left-5" >
   <Ionicons name={`${accountType == 'company' ? 'checkmark-circle':  'ellipse-outline' }`} size={25} color="#fff" className="font-bold" />
   </View>
 </TouchableOpacity>
</TouchableOpacity>
</View>


{ /* SIGNUP BUTTONS */ }
 {accountType == "single" ? (
   <View style={styles.headerContent}  >

<Text className="mt-8  text-center text-black text-lg" sstyle={styles.subtitle} >   أنشئ حساب شخصي لكي تستأجر و تؤجر الأغراض </Text>

<TouchableOpacity
className="mt-8  rounded-full p-3"
style={styles.button}
onPress={() => navigation.navigate('SignupScreen')}>
<View className="flex flex-row items-center " >
<Image source={require('../assets/icons/gmail.png')} className="mx-2 justify-end" />
<Text style={styles.buttonText}>  التسجيل من خلال البريد الإلكتروني   </Text>
</View>
</TouchableOpacity>

{/* <TouchableOpacity
className="mt-5  rounded-full p-3"
style={styles.button}
onPress={() => navigation.navigate('LoginScreen')}>
<View className="flex flex-row items-center  " >
<Image source={require('../assets/icons/google.png')} className="mx-2 justify-end" />
<Text style={styles.buttonText}> التسجيل من خلال جوجل</Text>
</View>

</TouchableOpacity> */}

{/* <TouchableOpacity
className="mt-5  rounded-full p-3"
style={styles.button}
onPress={() => navigation.navigate('LoginScreen')}>
<View className="flex flex-row items-center " >
<Image source={require('../assets/icons/apple.png')} className="mx-2 justify-end" />
<Text style={styles.buttonText}> التسجيل من خلال ابل</Text>
</View>

</TouchableOpacity> */}

<TouchableOpacity
  className="mt-5 p-3"
    onPress={() => navigation.navigate('LoginScreen')}>
    <Text style={styles.exploreButtonText}>  لديك حساب بافعل ؟ قم بتسجيل الدخول </Text>
  </TouchableOpacity>

</View>
 ) : (
   <View className="mt-10"  >


<View className="" >

  {accountType == "company" && (
    <View className="px-6 mt-2"  >

    <Text className="mt-2  text-center text-black text-lg" sstyle={styles.subtitle} >   أنشئ حساب شركة لكي تستأجر و تؤجر الأغراض </Text>
   { /* SINGLE ACCOUNT SETTING */}
<View className="flex-row items-center mt-5" >
<Ionicons name="ellipse" size={20} color="#007FB7" className="font-bold" />
<Text className="text-lg mx-2" > تسويق و إعلان مجاني  </Text>
</View>
{ /* END SINGLE ACCOUNT SETTING */}

{ /* SINGLE ACCOUNT SETTING */}
<View className="flex-row items-center mt-5" >
<Ionicons name="ellipse" size={20} color="#007FB7" className="font-bold" />
<Text className="text-lg mx-2" >  معاملات الدفع الآمنة عبر الإنترنت </Text>
</View>
{ /* END SINGLE ACCOUNT SETTING */}

{ /* SINGLE ACCOUNT SETTING */}
<View className="flex-row items-center mt-5" >
<Ionicons name="ellipse" size={20} color="#007FB7" className="font-bold" />
<Text className="text-lg mx-2" >  خدمة عملاء مميزة </Text>
</View>
{ /* END SINGLE ACCOUNT SETTING */}

{ /* SINGLE ACCOUNT SETTING */}
<View className="flex-row items-center mt-5" >
<Ionicons name="ellipse" size={20} color="#007FB7" className="font-bold" />
<Text className="text-lg mx-2" >  الوصول إلى جمهور أكبر أسواق جديدة </Text>
</View>
{ /* END SINGLE ACCOUNT SETTING */}

{ /* SINGLE ACCOUNT SETTING */}
<View className="flex-row items-center mt-5" >
<Ionicons name="ellipse" size={20} color="#007FB7" className="font-bold" />
<Text className="text-lg mx-2" >  بوابة لعرض التقارير ومتابعة سير 
عمليات الإيجار </Text>
</View>
{ /* END SINGLE ACCOUNT SETTING */}

   </View>

  ) }

</View>

<View className="flex-col items-center justift-center"  >


<TouchableOpacity
className="mt-10  rounded-full p-3"
style={styles.button}
onPress={() => navigation.navigate('SignupScreen')}>
<View className="flex flex-row items-center " >
<Image source={require('../assets/icons/gmail.png')} className="mx-2 justify-end" />
<Text style={styles.buttonText}>  التسجيل من خلال البريد الإلكتروني   </Text>
</View>
</TouchableOpacity>

{/* <TouchableOpacity
className="mt-5  rounded-full p-3"
style={styles.button}
onPress={() => navigation.navigate('LoginScreen')}>
<View className="flex flex-row items-center  " >
<Image source={require('../assets/icons/google.png')} className="mx-2 justify-end" />
<Text style={styles.buttonText}> التسجيل من خلال جوجل</Text>
</View>

</TouchableOpacity> */}

{/* <TouchableOpacity
className="mt-5  rounded-full p-3"
style={styles.button}
onPress={() => navigation.navigate('LoginScreen')}>
<View className="flex flex-row items-center " >
<Image source={require('../assets/icons/apple.png')} className="mx-2 justify-end" />
<Text style={styles.buttonText}> التسجيل من خلال ابل</Text>
</View>

</TouchableOpacity> */}

<TouchableOpacity
  className="mt-5 p-3"
    onPress={() => navigation.navigate('LoginScreen')}>
    <Text style={styles.exploreButtonText}>  لديك حساب بالفعل ؟ قم بتسجيل الدخول </Text>
  </TouchableOpacity>

</View>



</View>
 )}




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
    
  },

  headerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: '55%',
  },
  boxContianer: {
    paddingHorizontal: 20 
  },
  title: {
    color: COLORS.LightBLue,
    fontFamily: FONTFAMILY.font_bold,
    fontWeight: 'bold',
    
  },
  box1: {
    backgroundColor: COLORS.LightBLue,
    opacity: 0.6,
  },
  box2: {
    backgroundColor: COLORS.Green,
    opacity: 0.6,
  },
  button: {
    borderColor: 'none',
    width: '85%',
    backgroundColor: COLORS.LightBLue,
    opacity: 0.8,
  },
  buttonText: {
    fontFamily: FONTFAMILY.font_regular,
    fontSize: 14,
    fontWeight: 200,
    color: 'white',
    textAlign: 'center',
  },
  exploreButtonText:{
    fontFamily: FONTFAMILY.font_bold,
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.Blue,
    textAlign: 'center',
  }

});

export default SignupOptionsScreen