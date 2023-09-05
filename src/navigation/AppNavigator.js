import {StyleSheet , Image , TouchableOpacity , Modal  , View , Text } from 'react-native';
import {useState} from 'react';
import { COLORS, FONTFAMILY } from '../theme/theme';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import CategoryScreen from '../screens/CategoryScreen';
import MyOrdersScreen from '../screens/MyOrdersScreen';
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
import Ionicons from '@expo/vector-icons/Ionicons';
import AddScreenCategory from '../screens/AddScreenCategory';
import { LinearGradient } from 'expo-linear-gradient';
import AccountScreenLogin from '../screens/AccountScreenLogin';
import CountriesScreen from '../screens/CountriesScreen';
import CountrySubScreen from '../screens/CountrySubScreen';
import WhoWeAreScreen from '../screens/WhoWeAreScreen';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import NeedLoginScreen from '../screens/NeedLoginScreen';
import SearchScreen from '../screens/SearchScreen';

const Stack = createStackNavigator();

export const AppNavigator = () => {

  const Tab = createBottomTabNavigator();

  const [modalVisible, setModalVisible] = useState(false);

  { /*  TABS   */   }

  function HomeStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen}  options={{headerShown: false}}  />
      </Stack.Navigator>
    );
  }
  
  function CateogryStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="CategoryScreen" component={CategoryScreen} options={{headerShown: false}}  />
      </Stack.Navigator>
    );
  }
  
  function AddStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="NeedLoginScreen" component={NeedLoginScreen} options={{headerShown: false}}  />
      </Stack.Navigator>
    );
  }

  function MyOrdersStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="MyOrdersScreen" component={MyOrdersScreen} options={{headerShown: false}}  />
      </Stack.Navigator>
    );
  }

  function MyAccountStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="AccountScreenLogin" component={AccountScreenLogin} options={{headerShown: false}}  />
      </Stack.Navigator>
    );
  }

  /* HOME TABS INITIALIZE */


  function HomeTabs() {
    return (

      <Tab.Navigator
      initialRouteName='HomeScreen'
      screenOptions={{ 
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          height: 70,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          elevation: 5, // Add elevation for the box shadow effect
          shadowColor: '#000', // Set shadow color
          shadowOffset: { width: 0, height: 2 }, // Set shadow offset
          shadowOpacity: 0.25, // Set shadow opacity
          shadowRadius: 3.84, // Set shadow radius
        },
        tabBarItemStyle: {
          marginTop: 25,
          borderRadius: 10,
        }
      }}
    >
        <Tab.Screen
          name="HomeScreen"
          component={HomeStack}
          options={({ route }) => ({
          title: '',
          tabBarIcon: ({ color, focused }) => {
            let iconSource = focused
              ? require('../assets/icons/bottom_icons/Home-Blue.png')
              : require('../assets/icons/bottom_icons/Home.png');
            return <Image source={iconSource} style={styles.icon_bottom} />;
          },
          headerTitleStyle: styles.headerTitle,
          headerTitleContainerStyle: styles.headerTitleContainer,
        })}
        />
  
     <Tab.Screen
        name="CategoryScreen"
        component={CateogryStack}
        options={({ route }) => ({
          title: '',
          tabBarIcon: ({ color, focused }) => {
            let iconSource = focused
              ? require('../assets/icons/bottom_icons/Category-Blue.png')
              : require('../assets/icons/bottom_icons/Category.png');
            return <Image source={iconSource} style={styles.icon_bottom} />;
          },
          headerTitleStyle: styles.headerTitle,
          headerTitleContainerStyle: styles.headerTitleContainer,
        })}
      />
  
        <Tab.Screen
          name="NeedLoginScreen"
          component={AddStack}
          options={{
  title: '',
  tabBarIcon: ({ color }) => (
    <LinearGradient
      colors={['#22BCA0', '#007FB6']}
      start={[0, 0]}
      end={[1, 0]}
      style={{
        width: 65,
        height: 65,
        borderRadius: 500,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -25,
      }}
    >
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Ionicons name="add-sharp" size={30} color="#fff" style={{ fontWeight: 'bold' }} />
      </TouchableOpacity>
    </LinearGradient>
  ),
  headerTitleStyle: styles.headerTitle,
  headerTitleContainerStyle: styles.headerTitleContainer,
}}
        />
  
        <Tab.Screen
          name="MyOrdersScreen"
          component={MyOrdersStack}
          options={({ route }) => ({
          title: '',
          tabBarIcon: ({ color, focused }) => {
            let iconSource = focused
              ? require('../assets/icons/bottom_icons/Store-Blue.png')
              : require('../assets/icons/bottom_icons/Store.png');
            return <Image source={iconSource} style={styles.icon_bottom} />;
          },
          headerTitleStyle: styles.headerTitle,
          headerTitleContainerStyle: styles.headerTitleContainer,
        })}
        />
  
        <Tab.Screen
          name="AccountScreenLogin"
          component={MyAccountStack}
          options={({ route }) => ({
          title: '',
          tabBarIcon: ({ color, focused }) => {
            let iconSource = focused
              ? require('../assets/icons/bottom_icons/Profile-Blue.png')
              : require('../assets/icons/bottom_icons/Profile.png');
            return <Image source={iconSource} style={styles.icon_bottom} />;
          },
          headerTitleStyle: styles.headerTitle,
          headerTitleContainerStyle: styles.headerTitleContainer,
        })}
        />
      </Tab.Navigator>
    );
  }

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

<Stack.Navigator initialRouteName='Loading' screenOptions={{ headerShown: false }}>

  <Stack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }} />

  <Stack.Screen name="Loading" component={LoadingScreen} options={{ headerShown: false }} />

  <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />

  <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />

  <Stack.Screen name="SignupOptionsScreen" component={SignupOptionsScreen} options={{ headerShown: false }} />

  <Stack.Screen name="SignupScreen" component={SignupScreen} options={{ headerShown: false }} />

  <Stack.Screen name="ForgetPasswordScreen" component={ForgetPasswordScreen} options={{ headerShown: false }} />


  <Stack.Screen name="CountriesScreen" component={CountriesScreen} options={{ headerShown: false }} />

  <Stack.Screen name="CountrySubScreen" component={CountrySubScreen} options={{ headerShown: false }} />

  <Stack.Screen name="WhoWeAreScreen" component={WhoWeAreScreen} options={{ headerShown: false }} />

  <Stack.Screen name="SingleProductScreen" component={SingleProductScreen} options={{ headerShown: false }} />

  <Stack.Screen name="SubCategoryScreen" component={SubCategoryScreen} options={{ headerShown: false }} />

  <Stack.Screen name="FaqScreen" component={FaqScreen} options={{ headerShown: false }} />

  <Stack.Screen name="ContactUsScreen" component={ContactUsScreen} options={{ headerShown: false }} />
  

  <Stack.Screen name="SearchScreen" component={SearchScreen} options={{ headerShown: false }} />
  
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
