import { View, Text , SafeAreaView , StyleSheet , StatusBar   , Image , TouchableOpacity , ScrollView} from 'react-native'
import React , {useCallback, useContext , useEffect , useState} from 'react'
import { FONTFAMILY , COLORS } from '../theme/theme';
import { AuthenticationContext } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Feather from '@expo/vector-icons/Feather';
import { accountAuthOptions } from '../common/Account';
import { useFocusEffect } from '@react-navigation/native';

const MyAccountScreen = ({ navigation }) => {

  const { onLogout  } = useContext(AuthenticationContext);
  const [user, setUser] = useState(null);



  useFocusEffect(
    useCallback(() => {
      const getData = async () => {
        try {
          const value = await AsyncStorage.getItem('tashark_user');
          setUser(JSON.parse(value));
        } catch (error) {
    
        }
      };
  
      getData();
    }, [])
  );

  return (
 
      
      <ScrollView bounces={false} >

      <View style={styles.container}  >

          <StatusBar translucent backgroundColor="black" />
          { /* TOP HEADER TEXT */ }
          <View className="flex items-center pb-8 pt-24" style={styles.topAreaHeadins}  >

          <Text className="text-3xl text-center text-white"  style={styles.title} > حسابي  </Text>

          <View className="flex-row items-center mt-3" >

      {user?.thum ? (
        <Image source={{ uri: user?.thum }}  className="w-20 h-20 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" />
      ) : (
        <Image source={require('../assets/icons/avatar.png')}  className="w-20 h-20 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" />
      )}
         

          <View className="flex items-start px-6 mt-2" >
            <Text className="text-white text-base " style={styles.font} > {user?.first_name} {user?.last_name} </Text>
            <Text className="text-white text-base mt-1" style={styles.font} > {user?.phone} </Text>
          </View>

          </View>


          </View>

          { /* END TOP HEADER TEXT */ }


          { /* CATEGORIES GRID */ }
          <View style={styles.accountContainer} className="mt-8" >
          <View  >

        {accountAuthOptions && accountAuthOptions.map(({id , icon , title , nav}) => (
          <TouchableOpacity 
          key={id}
          onPress={() => navigation.navigate(nav)}
          >
          { /* SINGLE ACCOUNT SETTING */}
          <View className="flex-row items-center justify-between mt-5" >
          <View  className="flex flex-row items-center" >
          <Image source={icon}  />
          <Text className="text-lg mx-2 font-medium" style={styles.font} >  {title} </Text>
          </View>
          
          <View>
          <Feather  name="chevron-left" size={28} color={COLORS.Gray} />
          </View>
          
          </View>
          </TouchableOpacity>
        )) }
        
          { /* END SINGLE ACCOUNT SETTING */}

          { /* SINGLE ACCOUNT SETTING */}
          <TouchableOpacity
          onPress={ onLogout  }
          >
          <View className="flex-row items-center mt-5" >
          <Image source={require('../assets/icons/account_icons/10.png')}  />
          <Text className="text-lg mx-2 font-medium" style={styles.font} >   تسجيل الخروج </Text>
          </View>
          </TouchableOpacity>

          { /* END SINGLE ACCOUNT SETTING */}

          </View>
            </View>



          { /* END CATEGORIES GRID */ }

          </View>
      </ScrollView>
     

    

    
  
  )
}

const styles = StyleSheet.create({ 

  container: {
    backgroundColor: COLORS.White,
    height: '100%',
    direction: 'rtl',
    felx:1,
    borderRadius: 50,
    paddingBottom: 30,
    
  },
  topAreaHeadins: {
    backgroundColor: COLORS.Blue,
    paddingHorizontal: 20,
  },
  title: {
    color: COLORS.White,
    fontFamily: FONTFAMILY.font_bold,
    fontWeight: 'bold',
    lineHeight: 60,
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
  accountContainer: {
    paddingHorizontal: 30
  },
  font: {
    fontFamily: FONTFAMILY.font_regular,
  }
  
  

} );

export default MyAccountScreen