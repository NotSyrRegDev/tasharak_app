import {Image , StyleSheet} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import HomeScreen from '../screens/HomeScreen';
import CategoryScreen from '../screens/CategoryScreen';
import MyOrdersScreen from '../screens/MyOrdersScreen';
import MyAccountScreen from '../screens/MyAccountScreen';
import AddScreenInfo from '../screens/AddScreenInfo';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FONTFAMILY } from '../theme/theme';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderCategories } from '../common/CommonHeader';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

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

/* HOME TABS INITIALIZE */

const TabNavigatorAuth = () => {
  return (

    <Tab.Navigator
    initialRouteName='HomeScreen'
    screenOptions={{ 
      headerShown: false,
      tabBarStyle: {
        backgroundColor: '#fff',
        height: 75,
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
        component={HomeScreen}
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
        name="AddScreenInfo"
        component={AddScreenInfo}
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
<Ionicons name="add-sharp" size={30} color="#fff" clas style={{ fontWeight: 'bold'  }}  />
</LinearGradient>
          ),
          headerTitleStyle: styles.headerTitle,
          headerTitleContainerStyle: styles.headerTitleContainer,
        }}
      />

      <Tab.Screen
        name="MyOrdersScreen"
        component={MyOrdersScreen}
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
        name="MyAccountScreen"
        component={MyAccountScreen}
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
};

export default TabNavigatorAuth;

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
    }
  
  });
  