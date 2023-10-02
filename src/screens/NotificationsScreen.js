import { View, Text , SafeAreaView , StyleSheet , StatusBar , TouchableOpacity  , Image} from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native';
import { FONTFAMILY , COLORS } from '../theme/theme';
import Ionicons from '@expo/vector-icons/Ionicons';
import TopProfileNavigator from '../components/TopProfileNavigator';


const NotificationsScreen = ({ navigation }) => {
  return (
    <View>
      
      <View style={styles.container}  >

      <StatusBar translucent backgroundColor="black" />

      { /* NOTIFCATIONS COLUMN */ }
      <View className="flex-col items-center justify-center px-8 h-96"   >
      <Image source={require('../assets/icons/Notifications.png')} />

      <Text className="text-center text-2xl " style={styles.font}  >  لا توجد اشعارات حاليا </Text>

      </View>


      { /* END NOTIFCATIONS COLUMN */ }

      </View>



    </View>
  )
}

const styles = StyleSheet.create({ 

  container: {
    backgroundColor: COLORS.White,
    minHeight: '100%',
    direction: 'rtl',
    felx:1,
    borderRadius: 50,
    
  },
  topAreaHeadins: {
    backgroundColor: COLORS.Blue,
    paddingHorizontal: 20,
  },
  title: {
    color: COLORS.White,
    fontFamily: FONTFAMILY.font_bold,
    fontWeight: 'bold',
    
  },
  searchBarContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 50,
    alignItems: 'center',
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 20,
    elevation: 1,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: COLORS.Gray,
    fontFamily: FONTFAMILY.font_bold,
    fontWeight: 'bold',
  },
  button: {
    borderColor: 'none',
    backgroundColor: '#F4F3F3',
  },
  buttonText: {
    fontFamily: FONTFAMILY.font_medium,
    fontSize: 16,
    fontWeight: 'bold',
    
    color: COLORS.Black,
    textAlign: 'center',
  },
  exploreButtonText:{
    fontFamily: FONTFAMILY.font_bold,
    fontSize: 19,
    fontWeight: 'bold',
    color: COLORS.Blue,
    textAlign: 'center',
  },
  activeBtn: {
    backgroundColor: COLORS.White,
  },
  activeBtnText: {
    color: COLORS.Blue,
  },
  font: {
    fontFamily: FONTFAMILY.font_regular
  }
  

} );

export default NotificationsScreen