import { View , StyleSheet , Image  , StatusBar } from 'react-native'
import React , {useEffect , useContext} from 'react';
import { FONTFAMILY , COLORS } from '../theme/theme';
import { AuthenticationContext } from '../context/AuthContext';


const LoadingScreen = ({ navigation }) => {
  useEffect(() => {

    setTimeout(() => {
      navigation.navigate('WelcomeScreen');
      
     
    }, 2000);

 } , [])

  return (
    <View style={[styles.container, {justifyContent: 'center', alignItems: 'center'}]}>
     <StatusBar />
    <View style={styles.textContainer}>
      <Image source={require('../assets/icons/logo-green.png')} style={styles.logo} />
    
    </View>
   
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.Blue,
    flex: 1,
  },
  textContainer: {
    alignItems: 'center',
  },
  logo: {
    resizeMode: 'cover',
    maxHeight: 110,
    maxWidth: 350,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    fontFamily: FONTFAMILY.font_bold,
    color: 'white',
    marginTop: 25,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: FONTFAMILY.font_light,
    fontSize: 18,
    color: 'white',
    marginTop: 25,
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
});

export default LoadingScreen