import {StyleSheet , Image , TouchableOpacity , Modal  , View , Text } from 'react-native';
import {useContext} from 'react';
import { COLORS, FONTFAMILY } from '../theme/theme';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoadingScreen from '../screens/LoadingScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import SingleProductScreen from '../screens/SingleProductScreen';
import SubCategoryScreen from '../screens/SubCategoryScreen';
import FaqScreen from '../screens/FaqScreen';
import ContactUsScreen from '../screens/ContactUsScreen';
import SignupOptionsScreen from '../screens/SignupOptionsScreen';
import ForgetPasswordScreen from '../screens/ForgetPasswordScreen';
import CountriesScreen from '../screens/CountriesScreen';
import CountrySubScreen from '../screens/CountrySubScreen';
import WhoWeAreScreen from '../screens/WhoWeAreScreen';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import SearchScreen from '../screens/SearchScreen';
import LazyWaitingScreen from '../screens/LazyWaitingScreen';
import { HomeTabs } from './TapNavigator';
import { HeaderScreenGoBack, HeaderSubCategory } from '../common/CommonHeader';
import { AppContext } from '../context/AppContext';

const Stack = createStackNavigator();

export const AppNavigator = () => {

  const Tab = createBottomTabNavigator();

  const { setModalVisible , modalVisible } = useContext(AppContext);


  return (
        
  <>
          <Modal transparent={true} visible={modalVisible} animationType="slide">

<View style={styles.modalContainer} >
  <View style={styles.modalContent} className="realtive" >

  <View className="absolute top-5 left-5" >
<TouchableOpacity onPress={() => setModalVisible(!modalVisible) } >
<AntDesignIcons name="close" size={22} color="#007FB7" />
</TouchableOpacity>
</View>

    <View className="flex items-center mt-16" >
    <Image source={require('../assets/icons/logo-04.png')} style={styles.logo}  />
<Text style={styles.title} > أهلا بك في تشارك </Text>
    <Text style={styles.subtitle} >  يرجى تسجيل الدخول
لبدء عرض و تأجير الأغراض </Text>

    <View className="flex flex-row justify-center items-center mt-8" >
         

      <TouchableOpacity onPress={() => setModalVisible(!modalVisible) }  className="mx-4"  >
      <Text style={styles.blackButtonText}  >  عد الى الخلف </Text>
      </TouchableOpacity>

      <TouchableOpacity  className="rounded-lg mx-4" style={[ styles.activeBtnText ]}    >
      <Text style={styles.buttonText} className=" px-2 py-2 text-white" > تسجيل الدخول </Text>
      </TouchableOpacity>
          </View>

    </View>

 
  </View>
</View>
  

</Modal>

<Stack.Navigator initialRouteName='Loading'  >

  <Stack.Screen name="HomeTabs" component={HomeTabs} options={{
          title: 'Home',
          header: () => <View />
        }}  />

  <Stack.Screen name="Loading" component={LoadingScreen} options={{ headerShown: false }} />

  <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />

  <Stack.Screen name="LoginScreen" component={LoginScreen} options={({ navigation }) => ({
          header: () => <HeaderScreenGoBack navigation={navigation} title={"تسجيل الدخول"} />,
        })} />

  <Stack.Screen name="SignupOptionsScreen" component={SignupOptionsScreen} 
   options={({ navigation }) => ({
          header: () => <HeaderScreenGoBack navigation={navigation} title={"إنشاء حساب"} />,
        })}
         />

  <Stack.Screen name="SignupScreen" component={SignupScreen} 
  options={({ navigation }) => ({
          header: () => <HeaderScreenGoBack navigation={navigation} title={"إنشاء حساب"} />,
        })}
   />

  <Stack.Screen name="ForgetPasswordScreen" component={ForgetPasswordScreen} options={{ headerShown: false }} />


  <Stack.Screen name="CountriesScreen" component={CountriesScreen} 
  options={({ navigation }) => ({
          header: () => <HeaderScreenGoBack navigation={navigation} title={"إختيار الدولة"} />,
        })}
   />

  <Stack.Screen name="CountrySubScreen" component={CountrySubScreen} 
   options={({ navigation }) => ({
          header: () => <HeaderScreenGoBack navigation={navigation} title={"حدد المدينة"} />,
        })}
   />

  <Stack.Screen name="WhoWeAreScreen" component={WhoWeAreScreen} 
  options={({ navigation }) => ({
          header: () => <HeaderScreenGoBack navigation={navigation} title={"من نحن"} />,
        })}
   />

  <Stack.Screen name="SingleProductScreen" component={SingleProductScreen} 
  options={({ navigation }) => ({
          header: () => <HeaderScreenGoBack navigation={navigation} title={"تفاصيل الغرض"} />,
        })}
   />

  <Stack.Screen name="SubCategoryScreen" component={SubCategoryScreen}  options={({ navigation , route }) => ({
          header: () => <HeaderSubCategory navigation={navigation} title={route.params.categoryName} />,
        })} />

  <Stack.Screen name="FaqScreen" component={FaqScreen}  
  options={({ navigation }) => ({
          header: () => <HeaderScreenGoBack navigation={navigation} title={"الاسئلة الشائعة"} />,
        })} />

  <Stack.Screen name="ContactUsScreen" component={ContactUsScreen} options={({ navigation }) => ({
          header: () => <HeaderScreenGoBack navigation={navigation} title={"تواصل معنا"} />,
        })} />
  

  <Stack.Screen name="SearchScreen" component={SearchScreen}  options={({ navigation }) => ({
          header: () => <HeaderScreenGoBack navigation={navigation} title={"نتائج البحث"} />,
        })} />

  <Stack.Screen name="LazyWaitingScreen" component={LazyWaitingScreen} options={{ headerShown: false }} />
  
</Stack.Navigator>

  </>
 


      
  )
}

const styles = StyleSheet.create({ 

  headerTitle: {
    fontFamily: FONTFAMILY.font_medium,
    fontWeight: 600,
    fontSize: 24, 
  },
  headerTitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon_bottom: {
    height: 23,
    width: 23,
  },
  modalContainer: {
    flex: 1,
    alignItems:'center',
    justifyContent: 'center',
    paddingHorizontal: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContent: {
    borderRadius: 10,
    maxHeight: '40%',
    width: '100%',
    padding: 20,
    backgroundColor: 'white',
  },
  logo: {
    resizeMode: 'cover',
    maxHeight: 80,
    maxWidth: 250,
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
    marginTop: 15,
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
