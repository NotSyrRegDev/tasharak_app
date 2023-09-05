import { View, Text , SafeAreaView , StyleSheet , StatusBar , TouchableOpacity  , Modal , KeyboardAvoidingView , ScrollView , TextInput , ActivityIndicator , Platform , Keyboard , Image , TouchableWithoutFeedback } from 'react-native'
import React, { useContext , useState , useEffect } from 'react'
import { FONTFAMILY , COLORS } from '../theme/theme';
import TopProfileNavigator from '../components/TopProfileNavigator';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AppContext } from '../context/AppContext';
import Feather from '@expo/vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';


const AddSellerRating = ({ navigation , route }) => {

  const [isKeyboardOpen, setKeyboardOpen] = useState(false);
  const [ checkRemeber , setCheckRemeber ] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow);
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', handleKeyboardDidHide);

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleKeyboardDidShow = () => {
    setKeyboardOpen(true);
  };

  const handleKeyboardDidHide = () => {
    setKeyboardOpen(false);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('tashark_user');
       let jsonPrsed = JSON.parse(value);
       setFullName( jsonPrsed.first_name + " " +  jsonPrsed.last_name );
       setEmail(jsonPrsed.email);
       setUserId(jsonPrsed.id);
      
      } catch (error) {
     
      }
    };

    getData();
  }, []);


  const {   isLoading, error , success  , addSellerRating} = useContext(AppContext);

  const [userId, setUserId] = useState('');
  const [fullName , setFullName] = useState('');
  const [email , setEmail] = useState('');

  const [findProductAsDescribed , setFindProductAsDescribed] = useState(true);
  const [ratingeDesc , setRatingeDesc] = useState('');
  const [rating, setRating] = useState(0); 

  const handleRating = (value) => {
    setRating(value);
  };


    const handleAddRating = () => {
      addSellerRating(userId , fullName , email  , ratingeDesc , checkRemeber , route.params.seller_id );
    

      setTimeout(() => {
        navigation.navigate('HomeTabs');
       }, 3500);
    }


  return (
    <SafeAreaView>
      
      <ScrollView>


      <View style={[styles.container ,  isKeyboardOpen ? styles.keyboardOn : '' ]}  >

      <StatusBar translucent backgroundColor="black" />
      { /* TOP HEADER TEXT */ }
    <TopProfileNavigator navigation={navigation} text={"أكتب تقييمك"} />

      { /* END TOP HEADER TEXT */ }

      <View className="px-6" >

      <View className="mt-12" >

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

      
    <View  className="mb-8 px-2 py-4 mt-5" style={styles.orderSummaryDiv} >

    <View className="flex flex-row items-center mt-2" >
    <Feather name="user" size={22} color="#22BC9F" />
    <Text style={styles.font} className="text-lg text-left " >   تفاصيل المأجر  </Text>
    </View>

    <View className="flex  items-center justify-between flex-row mt-8" >

    <View>
    <Text style={styles.font} className="text-sm text-left " >   الاسم  </Text>
    <Text style={styles.font} className="text-gray-500 mt-3 text-sm text-left " >  اسم</Text>

    </View>

    <View>
    <Text style={styles.font} className="text-sm text-left " >  الايميل  </Text>
    <Text style={styles.font} className="text-gray-500 mt-3 text-sm text-left " >   ايميل المأجر  </Text>

    </View>


    </View>
    </View>

<View className="mb-8">
        <Text style={styles.textInput} className="block text-gray-700 font-bold mb-2" htmlFor="username">
        هل وجدت المنتج كما تم وصفه من قبل البائع؟     
        </Text>

      
        <View className="flex flex-row items-center justify-end mt-3" >

        <TouchableOpacity onPress={() => setFindProductAsDescribed(false) } style={styles.ioninIcon} className="mx-1" >
        {!findProductAsDescribed ? (
          <AntDesignIcons name="dislike1" size={18} color="#007FB7" />
        ) : (
          <AntDesignIcons name="dislike2" size={18} color="#007FB7" />
        ) }
         
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setFindProductAsDescribed(true) }  style={styles.ioninIcon} className="mx-1" >
          {findProductAsDescribed ? (
            <AntDesignIcons name="like1" size={18} color="#007FB7" />
        ) : (
          <AntDesignIcons name="like2" size={18} color="#007FB7" />
        ) }
         
          </TouchableOpacity>
        
        </View>
      
        </View>
      
<View className="mb-12">
        <Text style={styles.textInput} className="block text-gray-700 font-bold mb-2" htmlFor="username">
       ما هو تقييمك للمنتج ؟    
        </Text>

        <View className="flex flex-row items-start mt-1" >
        
        {[1, 2, 3, 4, 5].map((starValue) => (
        <TouchableOpacity
          key={starValue}
          style={{ marginHorizontal: 5 }}
          onPress={() => handleRating(starValue)}
        >
          <AntDesignIcons
            name={starValue <= rating ? 'star' : 'staro'}
            size={26}
            color="#007FB7"
            fontWeight={starValue <= rating ? 'bold' : 'normal'}
          />
        </TouchableOpacity>
      ))}
        

        </View>
     
      
        </View>


        <View className="mb-8">
        <Text style={styles.textInput} className="block text-gray-700 font-bold mb-2" htmlFor="username">
        أكتب تقييم البائع  <Text className="text-red-500 text-base" > * </Text>  
        </Text>
        <TextInput
      style={[styles.inputStyle , styles.textAreaInput]}
      className="appearance-none border rounded-xl w-full py-4 px-3 text-gray-700 leading-tight "
      id="email"
      placeholder="ما الذي اعجبك او لم يعجبك في المنتج؟"
      multiline={true}
      numberOfLines={8}
      value={ratingeDesc}
      onChangeText={(text) => setRatingeDesc(text) }
      />
        </View>

        <View className="mb-8" >

        <TouchableOpacity onPress={() => setCheckRemeber(!checkRemeber) } >
  <View className="flex items-center flex-row">

    <View style={styles.checkboxForm} >
    {checkRemeber && (
          <Ionicons name="checkmark" size={18} color="#22BCA0" className="font-bold" />
        )}
    </View>

  <Text className="text-gray-700 text-base" style={styles.font} > بدون نشر اسم </Text>
  </View>
  </TouchableOpacity>

        </View>

        </KeyboardAvoidingView>



        {!isLoading ? (

        <TouchableOpacity
        className="mt-8  rounded-full p-3"
        style={styles.button}
        onPress={() => handleAddRating() }
        >

        <Text style={styles.buttonText}>  ارسال   </Text>
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
    paddingBottom: 20,
    
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
  keyboardOn: {
    paddingBottom: 150,
  },
  textAreaInput: {
    textAlignVertical: 'top',
    height: 130, 
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
    backgroundColor: COLORS.White,
  },
  font: {
    fontFamily: FONTFAMILY.font_medium
  },
  activeStateText: {
    color: COLORS.Blue
  },
  ioninIcon: {
    borderWidth: 1,
    borderRadius: 400,
    padding: 12,
    borderColor: COLORS.LightBLue,
    backgroundColor: 'transparent',
  },
  checkboxForm:{
    width: 25,
    height: 25,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },

} );

export default AddSellerRating