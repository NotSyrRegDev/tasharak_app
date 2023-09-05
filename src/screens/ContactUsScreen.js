import { View, Text , SafeAreaView , StyleSheet , StatusBar , TouchableOpacity  , Modal , KeyboardAvoidingView , ScrollView , TextInput , ActivityIndicator , Platform , Keyboard , Image , TouchableWithoutFeedback } from 'react-native'
import React, { useContext , useState , useEffect } from 'react'
import { FONTFAMILY , COLORS } from '../theme/theme';
import TopProfileNavigator from '../components/TopProfileNavigator';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import { AppContext } from '../context/AppContext';

const ContactUsSCreen = ({ navigation }) => {

  const [modalVisible, setModalVisible] = useState(false);
  const [isKeyboardOpen, setKeyboardOpen] = useState(false);

  const handleOverlayPress = () => {
    setModalVisible(false);
  };

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


  const {   isLoading, error , success  , sendContactRequest} = useContext(AppContext);


  const [fullName , setFullName] = useState('');
  const [email , setEmail] = useState('');
  const [phoneNumber , setPhoneNumber] = useState('');
  const [helpState , setHelpState] = useState('');
  const [message , setMessage] = useState('');

    const addContactRequest = () => {
      sendContactRequest(fullName , email , phoneNumber , helpState , message);

      setTimeout(() => {
        navigation.navigate('Taps');
       }, 3500);
    }


  return (
    <SafeAreaView>
      
      <ScrollView>


      <View style={[styles.container ,  isKeyboardOpen ? styles.keyboardOn : '' ]}  >

      <StatusBar translucent backgroundColor="black" />
      { /* TOP HEADER TEXT */ }
    <TopProfileNavigator navigation={navigation} text={"تواصل معنا"} />

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


        <View className="mb-8">
        <Text style={styles.textInput} className="block text-gray-700 font-bold mb-2" htmlFor="username">
        الاسم الكامل <Text className="text-red-500 text-base" > * </Text>  
        </Text>
        <TextInput
        style={styles.inputStyle}
        className="appearance-none border rounded-xl w-full py-4 px-3 text-gray-700 leading-tight"
        id="username"
        placeholder="أدخل اسمك الكامل"
        value={fullName}
        onChangeText={(text) => setFullName(text)}
        />
        </View>

        <View className="mb-8">
        <Text style={styles.textInput} className="block text-gray-700 font-bold mb-2" htmlFor="username">
         البريد الالكتروني <Text className="text-red-500 text-base" > * </Text>  
        </Text>
        <TextInput
        style={styles.inputStyle}
        className="appearance-none border rounded-xl w-full py-4 px-3 text-gray-700 leading-tight "
        textContentType="emailAddress"
        keyboardType="email-address"
        autoCapitalize="none"
        id="username"
        placeholder="أدخل البريد الالكتروني"
        value={email}
        onChangeText={(text) => setEmail(text) }
        />
        </View>

        <View className="mb-8">
        <Text style={styles.textInput} className="block text-gray-700 font-bold mb-2" htmlFor="username">
        رقم الهاتف    
        </Text>
        <View  className="relative" >
        <TextInput
        style={styles.inputStyle}
        className="appearance-none border rounded-xl w-full py-4 px-3 text-gray-700 leading-tight "
        id="email"
        placeholder="5xxxxxxxx"
        keyboardType='numeric'
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text) }
        />
       <View className="absolute top-3 right-5 flex flex-row items-center" >
       <Text style={styles.font} > +966 </Text>
       <Image className="mx-2" source={require('../assets/icons/saudi.png')}  />
       </View>
        </View>
      
        </View>

      
      <View className="mb-8" >
      <Text style={styles.textInput} className="block text-gray-700 font-bold mb-2" htmlFor="username">
         كيف يمكننا مساعدتك؟  <Text className="text-red-500 text-base" > * </Text>  
        </Text>
        <TouchableOpacity
  onPress={() => setModalVisible(!modalVisible)  }
  style={styles.inputStyle}
  className="appearance-none border rounded-xl w-full py-3 px-3 text-gray-700 leading-tight "
  
      editable={false}

  >
  <Text style={styles.font} className="text-left" > {helpState} </Text>
  </TouchableOpacity>
      </View>

        <View className="mb-8">
        <Text style={styles.textInput} className="block text-gray-700 font-bold mb-2" htmlFor="username">
         الرسالة <Text className="text-red-500 text-base" > * </Text>  
        </Text>
        <TextInput
        style={[styles.inputStyle , styles.textAreaInput]}
        className="appearance-none border rounded-xl w-full py-4 px-3 text-gray-700 leading-tight "
        id="email"
        placeholder="أخبرنا المزيد"
        multiline={true}
        numberOfLines={8}
        value={message}
        onChangeText={(text) => setMessage(text) }
        />
        </View>

        </KeyboardAvoidingView>



        {!isLoading ? (

        <TouchableOpacity
        className="mt-8  rounded-full p-3"
        style={styles.button}
        onPress={() => addContactRequest() }
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

      <Modal transparent={true} visible={modalVisible} animationType="slide">

      <TouchableWithoutFeedback onPress={handleOverlayPress}>
      <View style={styles.modalContainer} >
                <View style={styles.modalContent} >
             
              <View className="flex flex-row items-center justify-between" >
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible) } >
              <AntDesignIcons name="close" size={26} color="#007FB7" />
              </TouchableOpacity>
              
              <Text className="text-lg text-right" style={styles.font} >  حدد الموضوع </Text>
              </View>

              <View className="mt-8 flex items-end" >

            <TouchableOpacity onPress={() => setHelpState('لدي سؤال عام') } >
            <Text style={[styles.font , helpState == "لدي سؤال عام" && styles.activeStateText ]} className="text-sm mt-2" > لدي سؤال عام </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setHelpState('أنا بحاجة إلى مزيد من المعلومات') } >
            <Text style={[styles.font , helpState == "أنا بحاجة إلى مزيد من المعلومات" && styles.activeStateText ]} className="text-sm mt-5" > أنا بحاجة إلى مزيد من المعلومات </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setHelpState('أحتاج إلى مساعدة في نشر الغرض الخاص بي') } >
            <Text style={[styles.font , helpState == "أحتاج إلى مساعدة في نشر الغرض الخاص بي" && styles.activeStateText ]} className="text-sm mt-5" > أحتاج إلى مساعدة في نشر الغرض
 الخاص بي  </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setHelpState('أواجه مشكلة فنية') } >
            <Text style={[styles.font , helpState == "أواجه مشكلة فنية" && styles.activeStateText ]} className="text-sm mt-5" > أواجه مشكلة فنية </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setHelpState('سبب آخر') } >
            <Text style={[styles.font , helpState == "other" && styles.activeStateText ]} className="text-sm mt-5" > سبب آخر </Text>
            </TouchableOpacity>

              </View>
               
                </View>
              </View>
                
        </TouchableWithoutFeedback>


           

              </Modal>

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
  }

} );

export default ContactUsSCreen