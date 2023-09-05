import { View, Text , SafeAreaView , StyleSheet , StatusBar , TouchableOpacity  , Image , KeyboardAvoidingView , ScrollView , TextInput , Platform } from 'react-native'
import React, { useContext , useState  } from 'react'
import { FONTFAMILY , COLORS } from '../theme/theme';
import { AuthenticationContext } from '../context/AuthContext';
import TopProfileNavigator from '../components/TopProfileNavigator';


const ChangePasswordScreen = ({ navigation }) => {

    const {  updateUserPassword , isLoading, error , success } = useContext(AuthenticationContext);

  const [password, setPassword] = useState('');
  const [passwordConfirm, setConfirmPassword] = useState('');

  const updatePassword = () => {

    updateUserPassword( password , passwordConfirm  );
    setTimeout(() => {
      navigation.navigate('MyAccountScreen');
     }, 2500);
  }

  

  return (
    <SafeAreaView>
      
      <ScrollView>


      <View style={styles.container}  >

      <StatusBar translucent backgroundColor="black" />
      { /* TOP HEADER TEXT */ }
    <TopProfileNavigator navigation={navigation} text={"تغيير كلمة المرور"} />

      { /* END TOP HEADER TEXT */ }


      { /* NOTIFCATIONS COLUMN */ }


      <View className="px-6" >

      <View className="mt-16" >

      {error && (
          <View className=" p-4  text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 text-right mb-5 flex items-start" >
            <Text style={styles.errorText}  >{error}</Text>
          </View>
        )}

        {success && (
          <View className=" p-4  text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 text-right mb-5 flex items-start" >
            <Text style={styles.errorText}  >{success}</Text>
          </View>
        )}

        <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >


        <View className="mb-8">
        <Text style={styles.textInput} className=" block text-gray-700 font-bold mb-2" htmlFor="username">
        كلمة المرور الجديدة <Text className="text-red-500 text-base" > * </Text>    
        </Text>
        <TextInput
        style={styles.inputStyle}
        className="appearance-none border rounded-xl w-full py-4 px-3 text-gray-700 leading-tight "
        id="password"
        textContentType="password"
        secureTextEntry
        autoCapitalize="none"
        placeholder="*********"
        value={password}
        onChangeText={(text) => setPassword(text) }
        />
        </View>

        <View className="mb-8">
        <Text style={styles.textInput} className=" block text-gray-700 font-bold mb-2" htmlFor="username">
        أعد ادخال كلمة المرور <Text className="text-red-500 text-base" > * </Text>  
        </Text>
        <TextInput
        style={styles.inputStyle}
        className="appearance-none border rounded-xl w-full py-4 px-3 text-gray-700 leading-tight "
        id="confirm-password"
        textContentType="password"
        secureTextEntry
        autoCapitalize="none"
        placeholder="*********"
        value={passwordConfirm}
        onChangeText={(text) => setConfirmPassword(text) }
        />
        </View>

        </KeyboardAvoidingView>



        {!isLoading ? (

        <TouchableOpacity
        className="mt-8  rounded-full p-3"
        style={styles.button}
        onPress={() => updatePassword() }
        >

        <Text style={styles.buttonText}>  حفظ التغييرات  </Text>
        </TouchableOpacity>
        ) : (
        <ActivityIndicator animating={true} color={'#007FB7'} />
        )}





        </View>

      </View>


      { /* END NOTIFCATIONS COLUMN */ }

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
    
  },
  topAreaHeadins: {
    backgroundColor: COLORS.Blue,
    paddingHorizontal: 20,
  },
  title: {
    color: COLORS.LightBLue,
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
    backgroundColor: COLORS.LightBLue,
  },
  buttonText: {
    fontFamily: FONTFAMILY.font_medium,
    fontSize: 16,
    fontWeight: 'bold',
    
    color: COLORS.White,
    textAlign: 'center',
  },
  exploreButtonText:{
    fontFamily: FONTFAMILY.font_bold,
    fontSize: 15,
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
  cameraContainer: {
    backgroundColor: COLORS.LightBLue,

  },
  textInput: {
    color: COLORS.Black,
    fontFamily: FONTFAMILY.font_light,
    fontWeight: 200,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 10,
  },
  inputStyle: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#DADADA',
    backgroundColor: '#FAFAFA',
    textAlign: 'right',

  },
  errorText: {
    fontFamily: FONTFAMILY.font_regular,
      textAlign: 'right'
  },

} );

export default ChangePasswordScreen