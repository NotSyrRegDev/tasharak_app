import {  StyleSheet} from 'react-native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import SingleProductScreen from '../screens/SingleProductScreen';
import SubCategoryScreen from '../screens/SubCategoryScreen';
import FaqScreen from '../screens/FaqScreen';
import MessagesScreen from '../screens/MessagesScreen';
import AddressesScreen from '../screens/AddressesScreen';
import ContactUsScreen from '../screens/ContactUsScreen';
import ForgetPasswordScreen from '../screens/ForgetPasswordScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import MyFavouritesScreen from '../screens/MyFavouritesScreen';
import OrderSummaryScreen from '../screens/OrderSummaryScreen';
import MyRevenueScreen from '../screens/MyRevenueScreen';
import { FONTFAMILY } from '../theme/theme';
import AddScreenDetails from '../screens/AddScreenDetails';
import AddScreenImages from '../screens/AddScreenImages';
import AddScreenAddress from '../screens/AddScreenAddress';
import AddScreenSuccess from '../screens/AddScreenSuccess';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import WhoWeAreScreen from '../screens/WhoWeAreScreen';
import MyPointsScreen from '../screens/MyPointsScreen';
import CountriesScreen from '../screens/CountriesScreen';
import CountrySubScreen from '../screens/CountrySubScreen';
import TabNavigator from './TapNavigator';
import SearchScreen from '../screens/SearchScreen';
import EditProductScreen from '../screens/EditProductScreen';
import EditAddressScreen from '../screens/EditAddressScreen';
import AddAddressDetails from '../screens/AddAddressDetails';
import BookingDateScreen from '../screens/BookingDateScreen';
import BookingDeliveryScreen from '../screens/BookingDeliveryScreen';
import BookingTimeScreen from '../screens/BookingTimeScreen';
import BookingOrderSummaryScreen from '../screens/BookingOrderSummaryScreen';
import BookingPaymentScreen from '../screens/BookingPaymentScreen';
import BookingSuccessScreen from '../screens/BookingSuccessScreen';
import BookingDetailScreen from '../screens/BookingDetailsScreen';
import AddProductRating from '../screens/AddProductRating';
import AddDeliveryRating from '../screens/AddDeliveryRating';
import AddSellerRating from '../screens/AddSellerRating';
import LazyWaitingScreen from '../screens/LazyWaitingScreen';


const Stack = createStackNavigator();

export const AuthNavigator = () => {


  return (
       
     
<Stack.Navigator initialRouteName='HomeTabs' screenOptions={{ headerShown: false }}>

  <Stack.Screen name="HomeTabs" component={TabNavigator} options={{ headerShown: false }} />

  <Stack.Screen name="ForgetPasswordScreen" component={ForgetPasswordScreen} options={{ headerShown: false }} />

  <Stack.Screen name="SingleProductScreen" component={SingleProductScreen} options={{ headerShown: false }} />

  <Stack.Screen name="SubCategoryScreen" component={SubCategoryScreen} options={{ headerShown: false }} />

  <Stack.Screen name="AddressesScreen" component={AddressesScreen} options={{ headerShown: false }} />

  <Stack.Screen name="ContactUsScreen" component={ContactUsScreen} options={{ headerShown: false }} />

  <Stack.Screen name="CountriesScreen" component={CountriesScreen} options={{ headerShown: false }} />

  <Stack.Screen name="CountrySubScreen" component={CountrySubScreen} options={{ headerShown: false }} />

  <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} options={{ headerShown: false }} />

  <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} options={{ headerShown: false }} />

  <Stack.Screen name="MyFavouritesScreen" component={MyFavouritesScreen} options={{ headerShown: false }} />

  <Stack.Screen name="OrderSummaryScreen" component={OrderSummaryScreen} options={{ headerShown: false }} />

  <Stack.Screen name="EditProductScreen" component={EditProductScreen} options={{ headerShown: false }} />

  <Stack.Screen name="MessagesScreen" component={MessagesScreen} options={{ headerShown: false }} />

  <Stack.Screen name="MyRevenueScreen" component={MyRevenueScreen} options={{ headerShown: false }} />

  <Stack.Screen name="FaqScreen" component={FaqScreen} options={{ headerShown: false }} />

  <Stack.Screen name="WhoWeAreScreen" component={WhoWeAreScreen} options={{ headerShown: false }} />

  <Stack.Screen name="MyPointsScreen" component={MyPointsScreen} options={{ headerShown: false }} />


  <Stack.Screen name="AddScreenDetails" component={AddScreenDetails} options={{ headerShown: false }} />

  <Stack.Screen name="AddAddressDetails" component={AddAddressDetails} options={{ headerShown: false }} />

  <Stack.Screen name="AddScreenImages" component={AddScreenImages} options={{ headerShown: false }} />

  <Stack.Screen name="AddScreenAddress" component={AddScreenAddress} options={{ headerShown: false }} />

  <Stack.Screen name="EditAddressScreen" component={EditAddressScreen} options={{ headerShown: false }} />

  <Stack.Screen name="AddScreenSuccess" component={AddScreenSuccess} options={{ headerShown: false }} />

  <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} options={{ headerShown: false }} />

  <Stack.Screen name="SearchScreen" component={SearchScreen} options={{ headerShown: false }} />

  <Stack.Screen name="BookingDateScreen" component={BookingDateScreen} options={{ headerShown: false }} />

  <Stack.Screen name="BookingDeliveryScreen" component={BookingDeliveryScreen} options={{ headerShown: false }} />

  <Stack.Screen name="BookingTimeScreen" component={BookingTimeScreen} options={{ headerShown: false }} />

  <Stack.Screen name="BookingOrderSummaryScreen" component={BookingOrderSummaryScreen} options={{ headerShown: false }} />

  <Stack.Screen name="BookingPaymentScreen" component={BookingPaymentScreen} options={{ headerShown: false }} />

  <Stack.Screen name="BookingSuccessScreen" component={BookingSuccessScreen} options={{ headerShown: false }} />

  <Stack.Screen name="BookingDetailScreen" component={BookingDetailScreen} options={{ headerShown: false }} />

  <Stack.Screen name="AddSellerRating" component={AddSellerRating} options={{ headerShown: false }} />

  <Stack.Screen name="AddProductRating" component={AddProductRating} options={{ headerShown: false }} />

  <Stack.Screen name="AddDeliveryRating" component={AddDeliveryRating} options={{ headerShown: false }} />

  <Stack.Screen name="LazyWaitingScreen" component={LazyWaitingScreen} options={{ headerShown: false }} />
  
</Stack.Navigator>

  
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
  }

});

