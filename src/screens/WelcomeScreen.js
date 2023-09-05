import { View, Text ,StatusBar , StyleSheet , SafeAreaView , Image ,TouchableOpacity } from 'react-native'
import React from 'react';

import { FONTFAMILY , COLORS } from '../theme/theme';

const WelcomeScreen = ( { navigation } ) => {
  return (
    <SafeAreaView>
 <View style={styles.container} >
  <StatusBar translucent backgroundColor="black" />
    { /* TOP HEADER TEXT */ }
    <View className="flex items-start mt-10  pb-5"   >

    <Text className="text-3xl text-right text-black"  style={styles.title} > أهلا بك في تشارك </Text>

    <Text className="mt-4  text-right text-black text-lg" style={styles.subtitle} >  منصة تأجير أجر و استأجر أي غرض </Text>

    </View>
  
    { /* TOP HEADER Image */ }
    <View style={styles.headerContent}  >

    <Image source={require('../assets/images/frames/welcome-frame.png')} style={styles.banner} className="mb-8" />

    { /* TOP HEADER Options */ }

    <TouchableOpacity
        className="mt-10  rounded-full p-4"
          style={styles.button}
          onPress={() => navigation.navigate('SignupOptionsScreen')}>
          <Text style={styles.buttonText}> مستخدم جديد ؟ أنشئ حساب  </Text>
        </TouchableOpacity>

    <TouchableOpacity
        className="mt-3  rounded-full p-4"
          style={[styles.button , styles.buttonTransparent]}
          onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.buttonText}> هل لديك حساب ؟ سجل دخول </Text>
        </TouchableOpacity>

    <TouchableOpacity
        className="mt-5 p-4"
          onPress={() => navigation.navigate('HomeTabs')}>
          <Text style={styles.exploreButtonText}>  أستكشف التطبيق </Text>
        </TouchableOpacity>

    </View>
    


    </View>
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

  headerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  
  },
  title: {
    color: COLORS.LightBLue,
    fontFamily: FONTFAMILY.font_bold,
    fontWeight: 'bold',
    
  },
  subtitle: {
    fontFamily: FONTFAMILY.font_regular,
  },
  banner: {
    resizeMode: 'contain',
    maxHeight: '45%',
  },
  button: {
    borderColor: 'none',
    width: 280,
    backgroundColor: COLORS.LightBLue,
  },
  buttonText: {
    fontFamily: FONTFAMILY.font_regular,
    fontSize: 15,
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
  },
  buttonTransparent: {
    opacity: 0.4
   },

})

export default WelcomeScreen