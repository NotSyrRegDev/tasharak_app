import { View, Text, StyleSheet , Image , StatusBar , TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, FONTFAMILY } from '../theme/theme';

const NeedLoginScreen = ( { navigation } ) => {
  return (
    <View style={[styles.container, {justifyContent: 'center', alignItems: 'center'}]}>
        <StatusBar translucent backgroundColor="black" />
   <View style={styles.textContainer} className="mt-8" >
     <Image source={require('../assets/icons/logo-04.png')} style={styles.logo} />

    <Text style={styles.title}  > أهلا بك في تشارك </Text>
    <Text style={styles.subtitle} >  يرجى تسجيل الدخول
لبدء عرض و تأجير الأغراض </Text>

       
         
          <View className="flex justify-center items-center mt-8" >

          <TouchableOpacity  className="rounded-lg mx-4" style={[ styles.activeBtnText ]}  onPress={() => navigation.navigate('LoginScreen') }  >
      <Text style={styles.buttonText} className=" px-6 py-4 text-white" > تسجيل الدخول  </Text>
      </TouchableOpacity>

 
          </View>
    
        

   </View>
  
 </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.White,
    flex: 1,
  },
  textContainer: {
    alignItems: 'center',
  },
  logo: {
    resizeMode: 'cover',
    maxHeight: 120,
    maxWidth: 350,
  },
  title: {
    fontSize: 22,
    fontFamily: FONTFAMILY.font_medium,
    color: COLORS.Black,
    marginTop: 25,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: FONTFAMILY.font_light,
    fontSize: 16,
    color: COLORS.Black,
    marginTop: 20,
    textAlign: 'center',
  },
  button: {
    marginTop: 55,
    borderRadius: 5,
    marginBottom: 20,
    width: 220,
    backgroundColor: '#020404',
  },
  buttonText: {
    fontFamily: FONTFAMILY.font_bold,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  blackButtonText: {
    fontFamily: FONTFAMILY.font_medium,
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.Black,
    textAlign: 'center',
  },
  activeBtn: {
    backgroundColor: COLORS.White,
  },
  activeBtnText: {
    backgroundColor: COLORS.Blue,
    color: COLORS.White,
  },
});

export default NeedLoginScreen