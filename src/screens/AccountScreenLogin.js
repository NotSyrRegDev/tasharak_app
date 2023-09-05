import { View, Text , SafeAreaView , StyleSheet , StatusBar   , Image , TouchableOpacity , ScrollView} from 'react-native'
import React , {useContext , useEffect , useState} from 'react'
import { FONTFAMILY , COLORS } from '../theme/theme';
import Feather from '@expo/vector-icons/Feather';
import { accountOptions } from '../common/Account';

const AccountScreenLogin = ({ navigation }) => {




  return (
    <SafeAreaView>
      
      <ScrollView bounces={false} >

      <View style={styles.container}  >

          <StatusBar translucent backgroundColor="black" />
          { /* TOP HEADER TEXT */ }

          { /* END TOP HEADER TEXT */ }

          <View className="pt-16 pb-5" >

<View className="flex items-center justify-center"   >
<Text className="text-3xl text-center"  style={styles.title} > حسابي   </Text>

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

</View>



    </View>


          { /* CATEGORIES GRID */ }
          <View style={styles.accountContainer} className="mt-8" >
          <View  >

        {accountOptions && accountOptions.map(({id , icon , title , nav}) => (
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
        


          </View>
            </View>


          { /* END CATEGORIES GRID */ }

          </View>
      </ScrollView>
     

    

    
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({ 

  container: {
    backgroundColor: COLORS.White,
    minHeight: '100%',
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
  },
  title: {
    color: COLORS.LightBLue,
    fontFamily: FONTFAMILY.font_bold,
    fontWeight: 'bold',
  },
  button: {
    borderColor: 'none',
    width: 280,
    backgroundColor: COLORS.LightBLue,
  },
  buttonTransparent: {
   opacity: 0.4
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
  }
  

} );

export default AccountScreenLogin