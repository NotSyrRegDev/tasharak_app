import React, { useContext } from 'react';
import {StyleSheet , Image , TouchableOpacity  } from 'react-native';
import { COLORS, FONTFAMILY } from '../theme/theme';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import CategoryScreen from '../screens/CategoryScreen';
import NeedLoginScreen from '../screens/NeedLoginScreen';
import MyOrdersScreen from '../screens/MyOrdersScreen';
import AccountScreenLogin from '../screens/AccountScreenLogin';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import { HeaderCategories } from '../common/CommonHeader';
import { AppContext } from '../context/AppContext';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


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
      <Stack.Screen name="CategoryScreen" component={CategoryScreen}  
      options={() => ({
          header: () => <HeaderCategories />,
        })} 
         />
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
      <Stack.Screen name="MyOrdersScreen" component={MyOrdersScreen}  
     options={{headerShown: false}}
          />
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



export function HomeTabs() {

  const { setModalVisible  } = useContext(AppContext);

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